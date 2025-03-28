import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Department name is required' }),
    academicFaculty: z
      .string()
      .min(1, { message: 'Academic Faculty ID is required' }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .min(1, { message: 'Department name is required' })
        .optional(),
      academicFaculty: z
        .string()
        .min(1, { message: 'Academic Faculty ID is required' }).optional(),
    })
    
});

export const academicDepartValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
