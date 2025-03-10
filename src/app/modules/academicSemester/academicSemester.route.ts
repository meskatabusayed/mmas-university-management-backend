import { Router } from 'express';

import { academicSemesterValidationSchemas } from './academicSemester.validation';
import { academicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    academicSemesterValidationSchemas.createAcademicSemesterValidationSchema
  ),
  academicSemesterControllers.createAcademicSemester
);

router.get("/" , academicSemesterControllers.getAllAcademicSemester);

router.get("/:semesterId" , academicSemesterControllers.getSingleAcademicSemester);

router.patch(
  '/:semesterId',
  validateRequest(
    academicSemesterValidationSchemas. updateAcademicSemesterValidationSchema
  ),
  academicSemesterControllers.updateAcademicSemester,
);


export const academicSemesterRoutes = router;



























