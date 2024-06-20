import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import argon2 from 'argon2';
import { createToken } from './auth.utils';
import { sendEmail } from '../../utils/sendEmail';

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

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_access_expire_time as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expire_time as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

const generateNewRefreshToken = async (token: string) => {
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { userId, iat } = decoded;

  const user = await UserModel.isUserExistsByCustomId(userId);

  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'This User is deleted');
  }

  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.NOT_FOUND, 'This User is Blocked');
  }

  const isPassChangeBeforeJwtIssue = UserModel.isJwtIssueBeforePassChange(
    user?.passwordChangeAt as Date,
    iat as number,
  );

  if (user?.passwordChangeAt && isPassChangeBeforeJwtIssue) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const jwtPayload = {
    userId: user?.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.jwt_access_expire_time as string,
  );

  return {
    accessToken,
  };
};

const forgetUserPassword = async (userId: string) => {
  const user = await UserModel.isUserExistsByCustomId(userId);

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

  const jwtPayload = {
    userId: user?.id,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_secret as string,
    config.forget_pass_expire_time as string,
  );

  const resetLink = `${config.frontend_base_url}?id=${user.id}&token=${accessToken}`;

  sendEmail(user.email, resetLink);

  return 'Email sent successfully';
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
    {
      password: hashNewPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
    { new: true, runValidators: true },
  );

  return null;
};

const resetUserPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
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

  const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;

  if (decoded?.userId !== payload.id) {
    throw new AppError(httpStatus.FORBIDDEN, 'This User is forbidden.');
  }

  const hashNewPassword = await argon2.hash(payload?.newPassword);

  const result = await UserModel.findOneAndUpdate(
    {
      id: decoded?.userId,
      role: decoded?.role,
    },
    {
      password: hashNewPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
    { new: true, runValidators: true },
  );

  return null;
};

export const AuthServices = {
  loginUserFromDb,
  generateNewRefreshToken,
  forgetUserPassword,
  changePassUserFromDb,
  resetUserPassword,
};
