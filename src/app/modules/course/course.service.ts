import status from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { courseSearchableFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';

import { startSession } from 'mongoose';
import { Course, CourseFaculty } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course'
  );
  return result;
};



const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
    const session = await startSession();
    try {
        session.startTransaction();

        const { preRequisiteCourses, ...courseRemainingData } = payload;
        const modifiedUpdatedData: Record<string, unknown> = { ...courseRemainingData };

        // Check if course exists
        const existingCourse = await Course.findById(id);
        if (!existingCourse) {
            throw new AppError(status.NOT_FOUND, "Course not found!");
        }

        // Handle prerequisite courses (Delete and Add)
        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            // Delete the pre-requisite courses that are marked as deleted
            const deletePreRequisites = preRequisiteCourses
                .filter((el) => el.course && el.isDeleted)
                .map((el) => el.course);

            if (deletePreRequisites.length > 0) {
                await Course.findByIdAndUpdate(
                    id,
                    {
                        $pull: { preRequisiteCourses: { course: { $in: deletePreRequisites } } },
                    },
                    { new: true, runValidators: true, session }
                );
            }

            // Add new or updated pre-requisite courses
            const newPrerequisites = preRequisiteCourses
                .filter((el) => el.course && !el.isDeleted)
                .map((el) => ({ course: el.course, isDeleted: false }));

            if (newPrerequisites.length > 0) {
                await Course.findByIdAndUpdate(
                    id,
                    {
                        $addToSet: { preRequisiteCourses: { $each: newPrerequisites } },
                    },
                    { new: true, runValidators: true, session }
                );
            }
        }

        // Update other course data if present
        if (Object.keys(modifiedUpdatedData).length > 0) {
            await Course.findByIdAndUpdate(id, modifiedUpdatedData, {
                new: true,
                runValidators: true,
                session,
            });
        }

        await session.commitTransaction();
        session.endSession();

        // Fetch the updated course
        const result = await Course.findById(id).populate("preRequisiteCourses.course");
        if (!result) {
            throw new AppError(status.NOT_FOUND, "Course not found after update!");
        }

        return result;
    } catch (error: any) {
        await session.abortTransaction();
        session.endSession();
        throw new AppError(error.status, error.message);
    }
};


const assignFacultiesWithCourseIntoDB = async (id: string, payload: Partial<TCourseFaculty>) => {
    
    const faculties = Array.isArray(payload.faculties) ? payload.faculties : [];

    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            course : id ,
            $addToSet: { faculties: { $each: faculties } }
        },
        {
            upsert: true,
            new: true,
        }
    );

    return result;
};
const removeFacultiesFromCourseFromDB = async (id: string, payload: Partial<TCourseFaculty>) => {
    
    const faculties = Array.isArray(payload.faculties) ? payload.faculties : [];

    const result = await CourseFaculty.findByIdAndUpdate(
        id,
        {
            $pull : {faculties : {$in : faculties}}
        },
        {
          
            new: true,
        }
    );

    return result;
};





const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const courseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  assignFacultiesWithCourseIntoDB,
  updateCourseIntoDB,
  deleteCourseFromDB,
  removeFacultiesFromCourseFromDB
};
