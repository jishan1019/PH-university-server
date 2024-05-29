import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemesterModel } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  const userUser: Partial<TUser> = {};

  //find academic semester info
  const admissionSemester = await AcademicSemesterModel.findById(
    payload.admissionSemester,
  );

  userUser.password = password || (config.default_pass as string);
  userUser.role = 'student';
  userUser.id = await generateStudentId(admissionSemester as TAcademicSemester);

  const newUser = await UserModel.create(userUser);

  if (Object.keys(newUser).length) {
    payload.id = newUser.id; //embed id
    payload.user = newUser._id; //reference id

    const newStudent = await StudentModel.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDb,
};
