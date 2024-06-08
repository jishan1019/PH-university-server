import express from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  courseValidationSchema,
  updateCourseValidationSchema,
} from './course.validation';
const router = express.Router();

router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getSingleCourses);
router.post(
  '/',
  validateRequest(courseValidationSchema),
  CourseController.createCourse,
);
router.patch(
  '/:id',
  validateRequest(updateCourseValidationSchema),
  CourseController.updateCourse,
);
router.delete('/:id', CourseController.deleteCourse);

export const CourseRoutes = router;
