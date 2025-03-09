import { NextFunction, Request, RequestHandler, Response } from "express";
import { userServices } from "./user.services";
import sendResponse from "../../utils/sendResponse";
import status from "http-status";

const createStudent : RequestHandler = async (req, res, next) => {
    try {
      
  
      const { password , student: studentData } = req.body;

    //   const validateParseData = studentValidationSchema.parse(studentData);
  
      //will call service func to send this data
      const result = await userServices.createStudentIntoDB(password , studentData);
  
      //send message
     sendResponse( res , {
        statusCode : status.OK,
        success : true ,
        message : "student created successfully",
        data : result,
     })
    } catch (err ) {
      next(err);
    }
  };

  export const userControllers = {
    createStudent,
  }