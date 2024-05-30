import { Router } from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidationSchema } from './academicFaculty.validation';

const router = Router();

router.get('/', AcademicFacultyController.getAllAcademicFaculty);

router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty);

router.post(
  '/',
  validateRequest(academicFacultyValidationSchema),
  AcademicFacultyController.createAcademicFaculty,
);

router.patch('/:facultyId', AcademicFacultyController.updateAcademicFaculty);

export const AcademicFacultyRoutes = router;
