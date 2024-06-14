import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

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
    userId: user,
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

export const AuthServices = {
  loginUserFromDb,
};
