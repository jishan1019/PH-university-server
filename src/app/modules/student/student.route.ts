import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationUpdateSchema } from './student.validation';

const router = express.Router();

router.get('/', studentController.getAllStudents);
router.get('/:studentId', studentController.getSingleStudent);
router.patch(
  '/:studentId',
  validateRequest(studentValidationUpdateSchema),
  studentController.updateStudent,
);
router.delete('/:studentId', studentController.deleteStudent);

export const StudentRoutes = router;
