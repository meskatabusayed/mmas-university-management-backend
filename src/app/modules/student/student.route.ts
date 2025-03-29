import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationSchemas } from './student.validation';

const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getSingleStudent);
router.patch('/:studentId', 
validateRequest(studentValidationSchemas.updateStudentValidationSchema),
StudentController.updateStudent);
router.delete('/:studentId', StudentController.deleteStudent);

export const studentRoutes = router;
