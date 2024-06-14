import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import argon2 from 'argon2';

const loginUserFromDb = async (payload: TLoginUser) => {
  const isUserExist = await UserModel.findOne({ id: payload?.id });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const isDeleted = isUserExist?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'This User is deleted');
  }

  const userStatus = isUserExist?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.NOT_FOUND, 'This User is Blocked');
  }

  const isPasswordMatch = await argon2.verify(
    isUserExist?.password,
    payload?.password,
  );

  if (!isPasswordMatch) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Password is wrong. Please try again',
    );
  }
};

export const AuthServices = {
  loginUserFromDb,
};
