import { RequestHandler } from 'express';
import { Model } from 'mongoose';

export interface TUser {
  id: string;
  password: string;
  email: string;
  passwordChangeAt?: Date;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty' | 'superAdmin';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export interface TUserModel extends Model<TUser> {
  isUserExistsByCustomId(id: string): Promise<TUser>;
  isPasswordMatch(dbUserPass: string, payloadPass: string): Promise<boolean>;
  isJwtIssueBeforePassChange(
    passChangeTimestamp: Date,
    jwtIssueTimestamp: number,
  ): boolean;
}
