import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const students = await StudentServices.getAllStudentsFromDb();

    res.status(200).json({
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

    res.status(200).json({
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
    res.status(201).json({
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
