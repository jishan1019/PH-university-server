import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.service';

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultyFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic faculty fetch successfully',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;

  const result =
    await AcademicFacultyServices.getSingleAcademicFacultyFromDb(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty Fetch successfully',
    data: result,
  });
});

const createAcademicFaculty = catchAsync(async (req, res) => {
  const data = req.body;

  const result =
    await AcademicFacultyServices.createAcademicFacultyIntoDb(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty Created Successfully',
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const updateFacultyIdData = req.body;

  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDb(
    facultyId,
    updateFacultyIdData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty update successfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  createAcademicFaculty,
  updateAcademicFaculty,
};
