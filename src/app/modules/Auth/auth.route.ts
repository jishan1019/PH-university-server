import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { loginValidationSchema } from './auth.validation';
import { AuthController } from './auth.controller';

const router = Router();

router.post(
  '/login',
  validateRequest(loginValidationSchema),
  AuthController.loginUser,
);

export const AuthRoutes = router;
