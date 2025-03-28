import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicFacultyServices } from "./academicFaculty.service";


const createAcademicFaculty = catchAsync(async(req , res) => {
    const result = await academicFacultyServices.createAcademicFacultyIntoDB(req.body);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Academic Faculty created successfully',
        data: result,
      });
});


const getAllAcademicFaculty = catchAsync(async(req , res) => {
    const result = await academicFacultyServices.getAllAcademicFacultiesFromDB();
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Academic Faculties are reterieve successfully',
        data: result,
      });
});

const getSingleAcademicFaculty = catchAsync(async(req , res) => {
    const {facultyId} = req.params;
    const result = await academicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Academic Faculty is retrieved succesfully',
        data: result,
      });
});

const updateAcademicFaculty = catchAsync(async(req , res) => {
    const {facultyId} = req.body;
    const result = await academicFacultyServices.updateAcademicFacultyIntoDB(facultyId , req.body);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'Academic Faculty is Update succesfully',
        data: result,
      });
});


export const academicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
}