import express from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  courseValidationSchema,
  coursesFacultyValidationSchema,
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

router.put(
  '/assign-faculties/:courseId',
  validateRequest(coursesFacultyValidationSchema),
  CourseController.assignFacultiesCourse,
);

router.delete('/:id', CourseController.deleteCourse);

export const CourseRoutes = router;
