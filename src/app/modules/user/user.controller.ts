import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    const result = await UserServices.createStudentIntoDb(
      password,
      studentData,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Created Successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createStudent,
};
