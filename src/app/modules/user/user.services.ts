import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.module';
import { TUser } from './user.interface';
import { User } from './user.model';
import { genereatedStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import status from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_pass as string);
  userData.role = 'Student';

  // Find academic semester info
  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);
  if (!admissionSemester) {
    throw new AppError(status.BAD_REQUEST, 'Admission semester not found');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Generate student ID
    userData.id = await genereatedStudentId(admissionSemester);

    // Create a user - transaction 1
    const newUser = await User.create([{ ...userData }], { session });
    if (!newUser.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create User');
    }

    // Set ID and reference
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    // Create a student - transaction 2
    const newStudent = await Student.create([{ ...payload }], { session });
    if (!newStudent.length) {
      throw new AppError(status.BAD_REQUEST, 'Failed to create Student');
    }

    await session.commitTransaction();
    return newStudent;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(status.INTERNAL_SERVER_ERROR, (error as Error).message);
  } finally {
    session.endSession();
  }
};


export const userServices = {
  createStudentIntoDB,
};
