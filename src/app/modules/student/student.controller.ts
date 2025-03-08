import { Request, Response } from 'express';
import { studentService } from './student.service';

import { studentValidationSchema } from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    

    const { student: studentData } = req.body;
    const validateParseData = studentValidationSchema.parse(studentData);

    //will call service func to send this data
    const result = await studentService.createStudentIntoDB(validateParseData);

    //send message
    res.status(200).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error : any ) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something Went Wrong',
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentService.getAllStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'Students are reterieve successfully',
      data: result,
    });
  } catch (error : any) {
    res.status(500).json({
        success: false,
        message: error.message || 'Something Went Wrong',
        error: error,
      });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentService.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: `Student is retreved successfully ${studentId}`,
      data: result,
    });
  } catch (error : any) {
    res.status(500).json({
      success: false,
      message: error.message ||'Something Went Wrong',
      error: error,
    });
  }
};

const deleteStudent = async(req : Request , res : Response) => {
    try {
        const {studentId} = req.params;
        const result = await studentService.deleteStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: `Student deleted successfully ${studentId}`,
            data: result,
          });
        
    } catch (error : any) {
        res.status(500).json({
            success : false,
            message : error.message || "Something went wrong",
            error : error,
        })
        
    }
}

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent
};
