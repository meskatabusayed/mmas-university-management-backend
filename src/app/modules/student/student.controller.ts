import { NextFunction, Request, RequestHandler, Response } from 'express';
import { studentService } from './student.service';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await studentService.getAllStudentFromDB();
  //send message
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Students are reterieve successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentService.getSingleStudentFromDB(studentId);
  //send message
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Student is retreved successfully ${studentId}`,
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await studentService.deleteStudentFromDB(studentId);
  //send message
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Student deleted successfully ${studentId}`,
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
