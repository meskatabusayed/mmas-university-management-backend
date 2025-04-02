import express from 'express';
import { semesterRegistrationControllers } from './semesterRegistration.controller';

const router = express.Router();

// Route to create a new semester registration
router.post('/create-semester-registration', semesterRegistrationControllers.createSemesterRegistration);

 // Route to get all semester registrations
router.get('/', semesterRegistrationControllers.getAllSemesterRegistrations);

// Route to get a single semester registration by ID
router.get('/:id', semesterRegistrationControllers.getSingleSemesterRegistration);

// Route to update a semester registration by ID
router.put('/semester-registration/:registrationId', semesterRegistrationControllers.updateSemesterRegistration); 

export const semesterRegistrationRoutes = router;
