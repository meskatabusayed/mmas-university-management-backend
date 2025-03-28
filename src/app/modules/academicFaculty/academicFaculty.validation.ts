import { z } from "zod";

 const createAcademicFacultyValidationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
});

 const updateAcademicFacultyValidationSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
});


export const academicFacultyValidationSchema = {
    createAcademicFacultyValidationSchema,
    updateAcademicFacultyValidationSchema,
};
