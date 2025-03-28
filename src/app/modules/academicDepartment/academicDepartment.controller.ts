import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicDepartmentServices } from "./academicDepartment.service";



const createAcademicDepartment = catchAsync(async(req , res) => {
    const result = await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Academic Department created successfully',
        data: result,
      });
});


const getAllAcademicDepartment = catchAsync(async(req , res) => {
    const result = await academicDepartmentServices.getAllAcademicDepartmentsFromDB();
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Academic Departments are reterieve successfully',
        data: result,
      });
});

const getSingleAcademicDepartment = catchAsync(async(req , res) => {
    const {departmentId} = req.params;
    const result = await academicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Academic Department is retrieved succesfully',
        data: result,
      });
});

const updateAcademicDepartment = catchAsync(async(req , res) => {
    const {departmentId} = req.params;
    const result = await academicDepartmentServices.updateAcademicDepartmentIntoDB(departmentId , req.body);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Academic Department is Update succesfully',
        data: result,
      });
});


export const academicDepartmentControllers = {
   createAcademicDepartment,
   getAllAcademicDepartment,
   getSingleAcademicDepartment,
   updateAcademicDepartment
}