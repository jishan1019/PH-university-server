import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

const getAllAcademicSemesterFromDb = async () => {
  const result = await AcademicSemesterModel.find();
  return result;
};

const getSingleAcademicSemesterFromDb = async (id: string) => {
  const result = await AcademicSemesterModel.findOne({ _id: id });
  return result;
};

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  //semester name ---> semester code

  if (academicSemesterNameCodeMapper[payload.name] !== payload.name) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester Code');
  }

  const result = await AcademicSemesterModel.create(payload);
  return result;
};

const updateAcademicSemesterIntoDb = async (
  id: string,
  payload: TAcademicSemester,
) => {
  if (!id) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Please provide academic-semester id',
    );
  }

  //semester name ---> semester code
  if (academicSemesterNameCodeMapper[payload.name] !== payload.name) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid Semester Code');
  }

  const result = await AcademicSemesterModel.updateOne(
    { _id: id },
    { $set: payload },
    { new: true },
  );
  return result;
};

export const AcademicSemesterServices = {
  getAllAcademicSemesterFromDb,
  getSingleAcademicSemesterFromDb,
  createAcademicSemesterIntoDb,
  updateAcademicSemesterIntoDb,
};
