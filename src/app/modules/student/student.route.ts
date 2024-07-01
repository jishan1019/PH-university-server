import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationUpdateSchema } from './student.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  studentController.getAllStudents,
);
router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin, USER_ROLE.faculty),
  studentController.getSingleStudent,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(studentValidationUpdateSchema),
  studentController.updateStudent,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  studentController.deleteStudent,
);

export const StudentRoutes = router;
