import express from 'express';
import { studentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationUpdateSchema } from './student.validation';

const router = express.Router();

router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getSingleStudent);
router.patch(
  '/:id',
  validateRequest(studentValidationUpdateSchema),
  studentController.updateStudent,
);
router.delete('/:id', studentController.deleteStudent);

export const StudentRoutes = router;
