import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();

router.get('/', studentController.getAllStudents);
router.get('/:id', studentController.getSingleStudent);
router.post('/create-student', studentController.createStudent);
router.delete('/:id', studentController.deleteStudent);

export const StudentRoutes = router;
