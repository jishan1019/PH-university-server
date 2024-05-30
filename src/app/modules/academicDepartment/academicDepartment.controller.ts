import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AcademicDepartmentServices } from './academicDepartment.service';

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Academic Department fetch successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { DepartmentId } = req.params;

  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDb(
      DepartmentId,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Fetch successfully',
    data: result,
  });
});

const createAcademicDepartment = catchAsync(async (req, res) => {
  const data = req.body;

  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDb(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Created Successfully',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { DepartmentId } = req.params;
  const updateDepartmentIdData = req.body;

  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDb(
      DepartmentId,
      updateDepartmentIdData,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department update successfully',
    data: result,
  });
});

export const AcademicDepartmentController = {
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  createAcademicDepartment,
  updateAcademicDepartment,
};
