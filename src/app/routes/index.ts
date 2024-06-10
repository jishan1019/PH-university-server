import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { CourseRoutes } from '../modules/Course/course.route';
import { SemesterRegistrationRoutes } from '../modules/semesterRegistration/semesterRegistration.route';
import { OfferedCourseRoutes } from '../modules/OfferCourse/offerCourse.route';
import { FacultyRoutes } from '../modules/Faculty/faculty.route';
import { AdminRoutes } from '../modules/Admin/admin.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/faculty',
    route: FacultyRoutes,
  },
  {
    path: '/semester-registration',
    route: SemesterRegistrationRoutes,
  },
  {
    path: '/offered-course',
    route: OfferedCourseRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
