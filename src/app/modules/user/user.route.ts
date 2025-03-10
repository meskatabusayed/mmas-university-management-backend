import express from 'express';

import { userControllers } from './user.controller';

import { studentValidationSchemas } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();



router.post('/create-student', validateRequest(studentValidationSchemas.createStudentValidationSchema), userControllers.createStudent);

export const usersRoutes = router;
