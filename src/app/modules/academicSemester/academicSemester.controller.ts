import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

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
  createAcademicSemester,
};
