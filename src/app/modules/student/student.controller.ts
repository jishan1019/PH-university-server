import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const students = await StudentServices.getAllStudentsFromDb();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Students fetched successfully',
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDb(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Single Student Fetched',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteStudentFromDb(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Deleted Successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const studentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
