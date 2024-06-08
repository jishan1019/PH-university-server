import express from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import { courseValidationSchema } from './course.validation';
const router = express.Router();

router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getSingleCourses);
router.post(
  '/',
  validateRequest(courseValidationSchema),
  CourseController.createCourse,
);
router.delete('/:id', CourseController.deleteCourse);

export const CourseRoutes = router;
