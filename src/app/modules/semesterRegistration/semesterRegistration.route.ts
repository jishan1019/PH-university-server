import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

router.post('/create-student', SemesterRegistrationController.createStudent);

export const SemesterRegistrationRoutes = router;
