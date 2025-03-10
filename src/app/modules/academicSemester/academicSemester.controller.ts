import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {

    const result = await academicSemesterServices.createAcademicSemesterIntoDB(req.body);
    
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Semester created successfully',
    data: result,
  });


});

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicSemesterServices.getllAcademicSemester();
  //send message
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Semesters are reterieve successfully',
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await academicSemesterServices.getSingleAcademicSemesterFromDB(semesterId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic semester is retrieved succesfully',
    data: result,
  });
});


const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await academicSemesterServices.updateAcademicSemesterIntoDB(
    semesterId,
    req.body,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic semester is Update succesfully',
    data: result,
  });
});


export const academicSemesterControllers = {
  createAcademicSemester,
  getSingleAcademicSemester,
  getAllAcademicSemester,
  updateAcademicSemester
};
