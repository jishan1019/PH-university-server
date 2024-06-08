import { TCourse } from './course.interface';
import { CourseModel } from './course.model';

const getAllCourseFromDb = async () => {
  const result = await CourseModel.find();
  return result;
};

const getSingleCourseFromDb = async (id: string) => {
  const result = await CourseModel.findById(id);
  return result;
};

const createCourseIntoDb = async (payload: TCourse) => {
  const result = await CourseModel.create(payload);
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
  deleteCourseFromDb,
};
