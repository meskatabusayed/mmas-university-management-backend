import { SemesterRegistration } from './semesterRegistration.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { AcademicSemester } from '../academicSemester/academicSemester.model';

// Create a new semester registration
const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
): Promise<TSemesterRegistration> => {
  try {
    const academicSemester = payload?.academicSemester;
    const isAcademicSemesterExist =
      await AcademicSemester.findById(academicSemester);
    if (!isAcademicSemesterExist) {
      throw new AppError(status.NOT_FOUND, 'This Academic Semester Not Found!');
    }

    const isSemesterRegistrationAlreadyExist =
      await AcademicSemester.findOne(academicSemester);
    if (isSemesterRegistrationAlreadyExist) {
      throw new AppError(
        status.CONFLICT,
        'This semester is Already Registred!'
      );
    }
    const semesterRegistration = new SemesterRegistration(payload);
    return await semesterRegistration.save();
  } catch (error: any) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Error creating semester registration: ' + error.message
    );
  }
};

// Get all semester registrations
const getAllSemesterRegistrationsFromDB = async (): Promise<
  TSemesterRegistration[]
> => {
  try {
    return await SemesterRegistration.find()
      .populate('academicSemester')
      .exec();
  } catch (error: any) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Error fetching all semester registrations: ' + error.message
    );
  }
};

// Get a single semester registration by ID
const getSingleSemesterRegistrationFromDB = async (
  id: string
): Promise<TSemesterRegistration | null> => {
  try {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }
    return await SemesterRegistration.findById(id)
      .populate('academicSemester')
      .exec();
  } catch (error: any) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Error fetching semester registration: ' + error.message
    );
  }
};

// Update a semester registration by ID
const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
): Promise<TSemesterRegistration | null> => {
  try {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }
    const updatedSemesterRegistration =
      await SemesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
      }).exec();
    return updatedSemesterRegistration;
  } catch (error: any) {
    throw new AppError(
      status.INTERNAL_SERVER_ERROR,
      'Error updating semester registration: ' + error.message
    );
  }
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationsFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
