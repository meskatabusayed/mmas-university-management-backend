import { NextFunction, Request, Response } from 'express';
import { studentService } from './student.service';
import sendResponse from '../../utils/sendResponse';
import status from 'http-status';



const getAllStudents = async (req: Request, res: Response , next : NextFunction) => {
  try {
    const result = await studentService.getAllStudentFromDB();
    //send message
    sendResponse( res , {
      statusCode : status.OK,
      success : true ,
      message : "Students are reterieve successfully",
      data : result,
   })
    
  } catch (err) {
    next(err);

    
  }
};

const getSingleStudent = async (req: Request, res: Response , next : NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.getSingleStudentFromDB(studentId);
    //send message
    sendResponse( res , {
      statusCode : status.OK,
      success : true ,
      message : `Student is retreved successfully ${studentId}`,
      data : result,
   })
    
  } catch (err) {
    next(err);
  }
};

const deleteStudent = async(req : Request , res : Response , next : NextFunction) => {
    try {
        const {studentId} = req.params;
        const result = await studentService.deleteStudentFromDB(studentId);
        //send message
     sendResponse( res , {
      statusCode : status.OK,
      success : true ,
      message : `Student deleted successfully ${studentId}`,
      data : result,
   })
        
        
    } catch (err) {
      next(err);
        
        
    }
}

export const StudentController = {
  
  getAllStudents,
  getSingleStudent,
  deleteStudent
};
