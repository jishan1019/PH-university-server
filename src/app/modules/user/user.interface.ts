import { Model, Document } from 'mongoose';

export interface TUser {
  id: string;
  password: string;
  passwordChangeAt?: Date;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface TUserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatch(dbUserPass: string, payloadPass: string): Promise<boolean>;
}
