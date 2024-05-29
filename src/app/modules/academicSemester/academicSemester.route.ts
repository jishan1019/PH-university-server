import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicValidationSchema } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(academicValidationSchema),
  AcademicSemesterController.createAcademicSemester,
);

export const AcademicSemesterRoutes = router;
