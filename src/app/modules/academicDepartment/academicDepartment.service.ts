import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.model';

const getAllAcademicDepartmentFromDb = async () => {
  const result =
    await AcademicDepartmentModel.find().populate('academicFaculty');
  return result;
};

const getSingleAcademicDepartmentFromDb = async (id: string) => {
  const result = await AcademicDepartmentModel.findOne({ _id: id }).populate(
    'academicFaculty',
  );
  return result;
};

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};

const updateAcademicDepartmentIntoDb = async (
  id: string,
  payload: TAcademicDepartment,
) => {
  if (!id) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Please provide academic department id',
    );
  }

  const result = await AcademicDepartmentModel.updateOne(
    { _id: id },
    { $set: payload },
    { new: true },
  );

  return result;
};

export const AcademicDepartmentServices = {
  getAllAcademicDepartmentFromDb,
  getSingleAcademicDepartmentFromDb,
  createAcademicDepartmentIntoDb,
  updateAcademicDepartmentIntoDb,
};
