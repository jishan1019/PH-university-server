import config from '../../config';
import { TStudent } from '../student/student.interface';
import { StudentModel } from '../student/student.model';
import { TUser } from './user.interface';
import { UserModel } from './user.model';

const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  const userUser: Partial<TUser> = {};

  userUser.password = password || (config.default_pass as string);
  userUser.role = 'student';
  userUser.id = '20130225555';

  const newUser = await UserModel.create(userUser);

  if (Object.keys(newUser).length) {
    studentData.id = newUser.id; //embed id
    studentData.user = newUser._id; //reference id

    const newStudent = await StudentModel.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDb,
};
