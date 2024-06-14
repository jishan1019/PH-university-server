import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';

const loginUserFromDb = async (payload: TLoginUser) => {
  const user = await UserModel.isUserExistsByCustomId(payload?.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'This User is deleted');
  }

  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.NOT_FOUND, 'This User is Blocked');
  }

  const isPasswordMatch = UserModel.isPasswordMatch(
    user?.password,
    payload?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Password is wrong. Please try again',
    );
  }

  const jwtPayload = {
    userId: user?.id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const changePassUserFromDb = async (
  userData: JwtPayload,
  payload: {
    oldPassword: string;
    newPassword: string;
  },
) => {
  const user = await UserModel.isUserExistsByCustomId(userData?.userId);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'This User is deleted');
  }

  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.NOT_FOUND, 'This User is Blocked');
  }

  const isPasswordMatch = await UserModel.isPasswordMatch(
    user?.password,
    payload?.oldPassword,
  );

  if (!isPasswordMatch) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Password is wrong. Please try again',
    );
  }

  const hashNewPassword = await argon2.hash(payload?.newPassword);

  const result = await UserModel.findOneAndUpdate(
    {
      id: userData?.userId,
      role: userData?.role,
    },
    { password: hashNewPassword, needsPasswordChange: false },
    { new: true, runValidators: true },
  );

  return null;
};

export const AuthServices = {
  loginUserFromDb,
  changePassUserFromDb,
};
