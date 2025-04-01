import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { courseValidations } from './course.validation';
import { courseController } from './course.controller';

const router = express.Router();

// Create a new course
router.post(
  '/create-course',
  validateRequest(courseValidations.createCourseValidationSchema),
  courseController.createCourse
);

// Get all courses
router.get('/', courseController.getAllCourses);

// Get a single course by ID
router.get('/:id', courseController.getSingleCourse);

router.put('/:courseId/assign-faculties', validateRequest(courseValidations.facultiesacultiesValidationSchema), courseController.assignFaculties);

router.delete('/:courseId/remove-faculties', validateRequest(courseValidations.facultiesacultiesValidationSchema), courseController. removeFacultiesFromCourse);

// Update a course by ID
router.patch(
  '/:id',
  validateRequest(courseValidations.updateCourseValidationSchema),
  courseController.updateCourse
);

// Delete a course by ID
router.delete(
  '/:id', courseController.deleteCourse
);

export const courseRoutes = router;
