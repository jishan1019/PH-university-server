import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyModel } from './academicFaculty.model';

const getAllAcademicFacultyFromDb = async () => {
  const result = await AcademicFacultyModel.find();
  return result;
};

const getSingleAcademicFacultyFromDb = async (id: string) => {
  const result = await AcademicFacultyModel.findOne({ _id: id });
  return result;
};

const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
  const result = await AcademicFacultyModel.create(payload);
  return result;
};

const updateAcademicFacultyIntoDb = async (
  id: string,
  payload: TAcademicFaculty,
) => {
  if (!id) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Please provide academic faculty id',
    );
  }

  const result = await AcademicFacultyModel.updateOne(
    { _id: id },
    { $set: payload },
    { new: true },
  );

  return result;
};

export const AcademicFacultyServices = {
  getAllAcademicFacultyFromDb,
  getSingleAcademicFacultyFromDb,
  createAcademicFacultyIntoDb,
  updateAcademicFacultyIntoDb,
};
