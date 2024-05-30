import { Router } from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentValidationSchema } from './academicDepartment.validation';

const router = Router();

router.get('/', AcademicDepartmentController.getAllAcademicDepartment);

router.get(
  '/:departmentId',
  AcademicDepartmentController.getSingleAcademicDepartment,
);

router.post(
  '/',
  validateRequest(academicDepartmentValidationSchema),
  AcademicDepartmentController.createAcademicDepartment,
);

router.patch(
  '/:departmentId',
  AcademicDepartmentController.updateAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
