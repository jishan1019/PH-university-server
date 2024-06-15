import express from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  courseValidationSchema,
  coursesFacultyValidationSchema,
  updateCourseValidationSchema,
} from './course.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getSingleCourses);
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(courseValidationSchema),
  CourseController.createCourse,
);
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(updateCourseValidationSchema),
  CourseController.updateCourse,
);

router.put(
  '/assign-faculties/:courseId',
  validateRequest(coursesFacultyValidationSchema),
  CourseController.assignFacultiesCourse,
);

router.delete(
  '/remove-faculties/:courseId',
  auth(USER_ROLE.admin),
  validateRequest(coursesFacultyValidationSchema),
  CourseController.deleteFacultiesCourse,
);

router.delete('/:id', CourseController.deleteCourse);

export const CourseRoutes = router;
