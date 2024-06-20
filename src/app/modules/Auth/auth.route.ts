import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import {
  changePassValidationSchema,
  forgetPasswordValidationSchema,
  loginValidationSchema,
  refreshTokenValidationSchema,
} from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();

router.post(
  '/login',
  validateRequest(loginValidationSchema),
  AuthController.loginUser,
);

router.post(
  '/refresh-token',
  validateRequest(refreshTokenValidationSchema),
  AuthController.refreshToken,
);

router.post(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.student),
  validateRequest(changePassValidationSchema),
  AuthController.changePassUser,
);

router.post(
  '/forget-password',
  validateRequest(forgetPasswordValidationSchema),
  AuthController.forgetPassword,
);

export const AuthRoutes = router;
