import mongoose, { startSession } from 'mongoose';
import { Student } from './student.module';
import AppError from '../../errors/AppError';
import status from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentFromDB = async (query: Record<string, unknown>) => {
  const queryObj = {...query}; //copy
  const studentSearchableFields = ['email', 'name', 'presentAddress'];
  
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });

  //filtering
  const excludeFields = ["searchTerm" , "sort" , "limit" , "page"];
  excludeFields.forEach((el) => delete queryObj[el]);
  console.log({query , queryObj})

  const filterQuery =  searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

let sort = "-createdAt"

if(query.sort){
  sort = query.sort as string;
}

const sortQuesry =  filterQuery.sort(sort);
let page = 1;
let limit = 1;
let skip = 0;
if(query.limit){
  limit = Number(query.limit);
}

if(query.page){
  page = Number(query.page);
  skip = (page-1)*limit;

}

const paginateQuery = sortQuesry.skip(skip);


const limitQuery = await paginateQuery.limit(limit);


  return limitQuery;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
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
  console.log(modifieUpdateData);
  const result = await Student.findOneAndUpdate({ id }, modifieUpdateData, {
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
    const deleteStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deleteStudent) {
      throw new AppError(status.BAD_REQUEST, 'Failed to delete student');
    }

    // Delete the user (soft delete)
    const deleteUser = await User.findOneAndUpdate(
      { id },
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
