import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidationSchemas } from './student.validation';

const router = express.Router();

router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getSingleStudent);
router.patch('/:id', 
validateRequest(studentValidationSchemas.updateStudentValidationSchema),
StudentController.updateStudent);
router.delete('/:id', StudentController.deleteStudent);

export const studentRoutes = router;
