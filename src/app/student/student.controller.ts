import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await StudentServices.getAllStudentsFromDb();

    res.status(200).json({
      success: true,
      message: 'All Students fetched successfully',
      data: students,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentFromDb(id);

    res.status(200).json({
      success: true,
      message: 'Single Student Fetched',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    //validation using zod

    const parseStudentValidationData =
      studentValidationSchema.parse(studentData);

    const result = await StudentServices.createStudentIntoDb(
      parseStudentValidationData,
    );

    res.status(200).json({
      success: true,
      message: 'Student Created Successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await StudentServices.deleteStudentFromDb(id);
    res.status(201).json({
      success: true,
      message: 'Student Deleted Successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error,
    });
  }
};

export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
