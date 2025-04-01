import { NextFunction, Request, RequestHandler, Response } from 'express';
import { studentService } from './student.service';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';
import catchAsync from '../../utils/catchAsync';

const getAllStudents = catchAsync(async (req, res) => {
  console.log(req.query);
  const result = await studentService.getAllStudentFromDB(req.query);
  //send message
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Students are reterieve successfully',
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentService.getSingleStudentFromDB(id);
  //send message
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Student is retreved successfully ${id}`,
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const {student} = req.body
  const result = await studentService.updateStudentIntoDB(id , student);
  //send message
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Student Update successfully ${id}`,
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await studentService.deleteStudentFromDB(id);
  //send message
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: `Student deleted successfully ${id}`,
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent 
};
