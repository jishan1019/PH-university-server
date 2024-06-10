import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistrationModel } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';

const getAllSemesterRegistrationFromDb = async (
  query: Record<string, unknown>,
) => {
  const Query = new QueryBuilder(
    SemesterRegistrationModel.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await Query.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDb = async (id: string) => {
  const result = await SemesterRegistrationModel.findById({ id }).populate(
    'academicSemester',
  );

  return result;
};

const createSemesterRegistrationIntoDb = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  //check if the semester has exist
  const isAcademicSemesterExist =
    await AcademicSemesterModel.findById(academicSemester);
  if (!isAcademicSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Academic Semester not found on this id',
    );
  }

  //check if the semester has already restarted
  const isSemesterAlreadyRegistered = SemesterRegistrationModel.findOne({
    academicSemester,
  });
  if (!isSemesterAlreadyRegistered) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This semester has already been registered',
    );
  }

  const result = await SemesterRegistrationModel.create(payload);
  return result;
};

export const SemesterRegistrationService = {
  getAllSemesterRegistrationFromDb,
  getSingleSemesterRegistrationFromDb,
  createSemesterRegistrationIntoDb,
};
