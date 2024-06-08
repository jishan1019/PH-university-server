import mongoose, { Types } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.const';
import { TCourse, TCourseFaculties } from './course.interface';
import { CourseFacultyModel, CourseModel } from './course.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const getAllCourseFromDb = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    CourseModel.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDb = async (id: string) => {
  const result = await CourseModel.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};

const createCourseIntoDb = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
  return result;
};

const updateCourseIntoDb = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemainingData } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //step 1: basic info update
    const updateBasicCourseInfo = await CourseModel.findByIdAndUpdate(
      id,
      courseRemainingData,
      { new: true, runValidators: true, session },
    );

    if (!updateBasicCourseInfo) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to update basic course info',
      );
    }

    //check if there any preRequisiteCourses for update
    if (preRequisiteCourses && preRequisiteCourses?.length > 0) {
      //check deleted preRequisiteCourses
      const deletedPreRequisite = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourses: { course: { $in: deletedPreRequisite } },
          },
        },
        { new: true, runValidators: true, session },
      );

      if (!deletedPreRequisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to delete Pre Requisite Courses ',
        );
      }

      //check new preRequisiteCourses add req
      const newPreRequisite = preRequisiteCourses.filter(
        (el) => el.course && !el.isDeleted,
      );

      const addPreRequisiteCourses = await CourseModel.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            preRequisiteCourses: { $each: newPreRequisite },
          },
        },
        { new: true, runValidators: true, session },
      );

      if (!addPreRequisiteCourses) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to add Pre Requisite Courses ',
        );
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await CourseModel.findById(id);
    return result;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course ');
  }
};

const assignFacultiesCourseIntoDb = async (
  id: string,
  payload: Partial<TCourseFaculties>,
) => {
  const result = await CourseFacultyModel.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );
  return result;
};

const deleteCourseFromDb = async (id: string) => {
  const result = await CourseModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const CourseServices = {
  getAllCourseFromDb,
  getSingleCourseFromDb,
  createCourseIntoDb,
  updateCourseIntoDb,
  assignFacultiesCourseIntoDb,
  deleteCourseFromDb,
};
