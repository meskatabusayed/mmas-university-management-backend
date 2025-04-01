
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { courseServices } from './course.service';

const createCourse = catchAsync(async (req , res) => {
  const result = await courseServices.createCourseIntoDB(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Course created successfully!',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseServices.getAllCourseFromDB(req.query);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Courses retrieved successfully!',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.getSingleCourseFromDB(id);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course retrieved successfully!',
    data: result,
  });
});

const assignFaculties = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await courseServices.assignFacultiesWithCourseIntoDB(courseId, { faculties });

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Faculties Assign successfully!',
    data: result,
  });
});
const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await courseServices.removeFacultiesFromCourseFromDB(courseId, { faculties });

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Faculties remove successfully!',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.updateCourseIntoDB(id , req.body);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course updated successfully!',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.deleteCourseFromDB(id);
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course deleted successfully!',
    data: result,
  });
});

export const courseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  assignFaculties,
  updateCourse,
  deleteCourse,
  removeFacultiesFromCourse ,
};
