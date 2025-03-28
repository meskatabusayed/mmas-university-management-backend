import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicFacultyValidation } from "./academicFaculty.validation";
import { academicFacultyControllers } from "./academicFaculty.controller";

const router = Router();
router.post(
    '/create-academic-faculty',
    validateRequest(
        academicFacultyValidation.createAcademicFacultyValidationSchema
    ),
    academicFacultyControllers.createAcademicFaculty
  );

router.get(
    "/" ,
    academicFacultyControllers.getAllAcademicFaculty
);

router.get("/:facultyId" , academicFacultyControllers.getSingleAcademicFaculty);

router.patch(
    '/:facultyId',
    validateRequest(
        academicFacultyValidation.updateAcademicFacultyValidationSchema
    ),
    academicFacultyControllers.updateAcademicFaculty,
  );


export const academicFacultyRoutes = router;