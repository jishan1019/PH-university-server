import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../Faculty/faculty.interface';
import { AcademicDepartmentModel } from '../academicDepartment/academicDepartment.model';
import { FacultyModel } from '../Faculty/faculty.model';
import { AdminModel } from '../Admin/admin.model';
import { TAdmin } from '../Admin/admin.interface';
import { USER_ROLE } from './user.constant';
import { sendImgToCloudinary } from '../../utils/sendImgToCloudinary';

const createStudentIntoDb = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_pass as string);
  userData.role = 'student';
  userData.email = payload.email;

  //find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  if (!admissionSemester) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Admission semester not found');
  }

  // find department
  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  payload.academicFaculty = academicDepartment?.academicFaculty;

  const session = await mongoose.startSession();

  try {
    //start session
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;

      //send image to cloudinary
      const result = await sendImgToCloudinary(imageName, path);

      payload.profileImg = result?.secure_url as string;
    }

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
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(httpStatus.BAD_REQUEST, error);
  }
};

const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'faculty';
  //set faculty email
  userData.email = payload.email;

  // find academic department info
  const academicDepartment = await AcademicDepartmentModel.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  payload.academicFaculty = academicDepartment?.academicFaculty;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;

      //send image to cloudinary
      const result = await sendImgToCloudinary(imageName, path);
      payload.profileImg = result?.secure_url as string;
    }

    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await FacultyModel.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_pass as string);

  //set student role
  userData.role = 'admin';
  //set admin email
  userData.email = payload.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await UserModel.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`;
      const path = file?.path;

      //send image to cloudinary
      const result = await sendImgToCloudinary(imageName, path);

      payload.profileImg = result?.secure_url as string;
    }

    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await AdminModel.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const getMeFromDb = async (userId: string, role: string) => {
  let result = null;

  if (role === USER_ROLE.student) {
    result = await StudentModel.findOne({ id: userId }).populate('user');
  } else if (role === USER_ROLE.admin) {
    result = await AdminModel.findOne({ id: userId }).populate('user');
  } else if (role === USER_ROLE.faculty) {
    result = await FacultyModel.findOne({ id: userId }).populate('user');
  }

  return result;
};

const changeStatusFromDb = async (id: string, payload: { status: string }) => {
  const result = UserModel.findByIdAndUpdate(id, payload, { new: true });

  return result;
};

export const UserServices = {
  createStudentIntoDb,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMeFromDb,
  changeStatusFromDb,
};
