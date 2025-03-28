import { z } from "zod";

 const createAcademicFacultyValidationSchema = z.object({
  body : z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  })
 })

 const updateAcademicFacultyValidationSchema = z.object({
  body : z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  })
 })


export const academicFacultyValidation = {
    createAcademicFacultyValidationSchema,
    updateAcademicFacultyValidationSchema,
};
