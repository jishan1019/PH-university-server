import express from 'express';
import { CourseController } from './course.controller';
const router = express.Router();

router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getSingleCourses);
router.post('/', CourseController.createCourse);
router.delete('/:id', CourseController.deleteCourse);

export const CourseRoutes = router;
