import mongoose, { startSession } from 'mongoose';
import { Student } from './student.module';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
 
      const studentQuery = new QueryBuilder(
        Student.find()
          .populate('admissionSemester')
          .populate({
            path: 'academicDepartment',
            populate: {
              path: 'academicFaculty',
            },
          }),
        query 
      )
        .search(studentSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
      

  const result = await studentQuery.modelQuery;
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { guardian, localGuardian, ...remainingStudentsData } = payload;
  const modifieUpdateData: Record<string, unknown> = {
    ...remainingStudentsData,
  };

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifieUpdateData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifieUpdateData[`localGuardian.${key}`] = value;
    }
  }
  
  const result = await Student.findByIdAndUpdate( id , modifieUpdateData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Delete the student (soft delete)
    const deleteStudent = await Student.findByIdAndUpdate(
       id ,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deleteStudent) {
      throw new AppError(status.BAD_REQUEST, 'Failed to delete student');
    }

    // get user _id from deleteStudent
    const userId = deleteStudent.user;

    // Delete the user (soft delete)
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    );

    if (!deleteUser) {
      throw new AppError(status.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    return { message: 'Student and User deleted successfully' };
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(status.INTERNAL_SERVER_ERROR, (error as Error).message);
  } finally {
    session.endSession();
  }
};

export const studentService = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
