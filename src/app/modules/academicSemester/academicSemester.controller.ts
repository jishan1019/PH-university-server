import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic semester fetch successfully',
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const semesterId = req.params;

  const result =
    await AcademicSemesterServices.getAllAcademicSemesterFromDb(semesterId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester fetch successfully',
    data: result,
  });
});

const createAcademicSemester = catchAsync(async (req, res) => {
  const academicSemesterData = req.body;
  const result =
    await AcademicSemesterServices.createAcademicSemesterIntoDb(
      academicSemesterData,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester created successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  getAllAcademicSemester,
  getSingleAcademicSemester,
  createAcademicSemester,
};
