import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchableFields } from './course.const';
import { TCourse } from './course.interface';
import { CourseModel } from './course.model';

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

  //step 1: basic info update
  const updateBasicCourseInfo = await CourseModel.findByIdAndUpdate(
    id,
    courseRemainingData,
    { new: true, runValidators: true },
  );

  //check if there any preRequisiteCourses for update
  if (preRequisiteCourses && preRequisiteCourses?.length > 0) {
    //check deleted preRequisiteCourses
    const deletedPreRequisite = preRequisiteCourses
      .filter((el) => el.course && el.isDeleted)
      .map((el) => el.course);

    const deletedPreRequisiteCourses = await CourseModel.findByIdAndUpdate(id, {
      $pull: {
        preRequisiteCourses: { course: { $in: deletedPreRequisite } },
      },
    });

    //check new preRequisiteCourses add req
    const newPreRequisite = preRequisiteCourses.filter(
      (el) => el.course && !el.isDeleted,
    );

    const addPreRequisiteCourses = await CourseModel.findByIdAndUpdate(id, {
      $addToSet: {
        preRequisiteCourses: { $each: newPreRequisite },
      },
    });
  }

  const result = await CourseModel.findById(id);

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
  deleteCourseFromDb,
};
