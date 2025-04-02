import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SemesterRegistrationServices } from './semesterRegistration.service';


// Create a new semester registration
const createSemesterRegistration = catchAsync(async (req, res) => {
  console.log("Request Body:", req.body); // Debugging Line

  const result = await SemesterRegistrationServices.createSemesterRegistrationIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: 'Semester registration created successfully',
    data: result,
  });
});


// Get all semester registrations
const getAllSemesterRegistrations = catchAsync(async (req, res) => {
  const result = await SemesterRegistrationServices.getAllSemesterRegistrationsFromDB(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester registrations retrieved successfully',
    data: result,
  });
});

// Get a single semester registration by ID
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
  const {  id } = req.params;
  const result = await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester registration retrieved successfully',
    data: result,
  });
});

// Update a semester registration by ID
const updateSemesterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
    id,
    req.body
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester registration updated successfully',
    data: result,
  });
});

export const semesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistrations,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
