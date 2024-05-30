import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  //find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  userData.password = password || (config.default_pass as string);
  userData.role = 'student';

  const session = await mongoose.startSession();

  try {
    //start session
    session.startTransaction();

    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );

    //session (transaction - 1)
    const newUser = await UserModel.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create a new user');
    }

    payload.id = newUser[0].id; //embed id
    payload.user = newUser[0]._id; //reference id

    //session (transaction - 2)
    const newStudent = await StudentModel.create([payload], { session });

    if (!newUser.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create a new student',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};

export const UserServices = {
  createStudentIntoDb,
};
