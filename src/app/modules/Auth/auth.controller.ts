import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUserFromDb(req.body);

  const { refreshToken, accessToken, needsPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login Successfully',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await AuthServices.generateNewRefreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Refresh token generate Successfully',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const { id } = req.body;

  const result = await AuthServices.forgetUserPassword(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reset link is generate Successfully',
    data: result,
  });
});

const changePassUser = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;

  const result = await AuthServices.changePassUserFromDb(
    req.user,
    passwordData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User password change Successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  changePassUser,
  forgetPassword,
  refreshToken,
};
