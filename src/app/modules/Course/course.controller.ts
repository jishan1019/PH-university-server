import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const getAllCourses = catchAsync(async (req, res) => {
  const course = await CourseServices.getAllCourseFromDb(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Course fetched successfully',
    data: course,
  });
});

const getSingleCourses = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CourseServices.getSingleCourseFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Course Fetch successfully',
    data: result,
  });
});

const createCourse = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await CourseServices.createCourseIntoDb(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Created Successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await CourseServices.deleteCourseFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course Delete successfully',
    data: result,
  });
});

export const CourseController = {
  getAllCourses,
  getSingleCourses,
  createCourse,
  deleteCourse,
};
