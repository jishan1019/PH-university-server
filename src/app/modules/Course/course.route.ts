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
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(courseValidationSchema),
  CourseController.createCourse,
);
router.patch(
  '/:id',
  auth(
    USER_ROLE.admin,
    USER_ROLE.superAdmin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  validateRequest(updateCourseValidationSchema),
  CourseController.updateCourse,
);

router.put(
  '/assign-faculties/:courseId',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(coursesFacultyValidationSchema),
  CourseController.assignFacultiesCourse,
);

router.delete(
  '/remove-faculties/:courseId',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  validateRequest(coursesFacultyValidationSchema),
  CourseController.deleteFacultiesCourse,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.superAdmin),
  CourseController.deleteCourse,
);

export const CourseRoutes = router;
