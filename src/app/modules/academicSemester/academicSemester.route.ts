import { Router } from 'express';

import { academicSemesterValidationSchemas } from './academicSemester.validation';
import { academicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = Router();

router.post(
  '/',
  validateRequest(
    academicSemesterValidationSchemas.createAcademicSemesterValidationSchema
  ),
  academicSemesterControllers.createAcademicSemester
);

export const AcademicSemesterRoutes = router;



























