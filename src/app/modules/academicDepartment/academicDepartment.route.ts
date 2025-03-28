import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { academicDepartValidation } from "./academicDepartment.validation";
import { academicDepartmentControllers } from "./academicDepartment.controller";



const router = Router();
router.post(
    '/create-academic-Department',
    validateRequest(
        academicDepartValidation.createAcademicDepartmentValidationSchema
    ),
    academicDepartmentControllers.createAcademicDepartment
  );

router.get(
    "/" ,
    academicDepartmentControllers.getAllAcademicDepartment
);

router.get("/:departmentId" , academicDepartmentControllers.getSingleAcademicDepartment);

router.patch(
    '/:departmentId',
    validateRequest(
        academicDepartValidation.updateAcademicDepartmentValidationSchema
    ),
    academicDepartmentControllers.updateAcademicDepartment,
  );


export const academicDepartmentRoutes = router;