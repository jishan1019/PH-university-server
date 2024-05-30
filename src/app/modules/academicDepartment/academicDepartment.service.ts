import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.model';

const getAllAcademicDepartmentFromDb = async () => {
  const result = await AcademicDepartmentModel.find();
  return result;
};

const getSingleAcademicDepartmentFromDb = async (id: string) => {
  const result = await AcademicDepartmentModel.findOne({ _id: id });
  return result;
};

const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
  const isExistDepartment = await AcademicDepartmentModel.findOne({
    name: payload.name,
  });

  if (isExistDepartment) {
    throw new Error('Academic Department already exists');
  }

  const result = await AcademicDepartmentModel.create(payload);
  return result;
};

const updateAcademicDepartmentIntoDb = async (
  id: string,
  payload: TAcademicDepartment,
) => {
  if (!id) {
    throw new Error('Please provide academic department id');
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
