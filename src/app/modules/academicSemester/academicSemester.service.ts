import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  const result = await AcademicSemesterModel.create(payload);

  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDb,
};
