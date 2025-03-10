import { z } from 'zod';
import { months } from './academicSemester.constant';

// Zod Validation Schema
export const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'Name is required',
    }),
    year: z.number().min(4, 'Year is required and must be valid'),
    code: z.enum(['01', '02', '03'], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum([...months] as [string, ...string[]], {
      required_error: 'Start month is required',
    }),
    endMonth: z.enum([...months] as [string, ...string[]], {
      required_error: 'End month is required',
    }),
  }),
});


const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'Name is required',
    }).optional(),
    year: z.number().min(4, 'Year is required and must be valid').optional(),
    code: z.enum(['01', '02', '03'], {
      required_error: 'Code is required',
    }).optional(),
    startMonth: z.enum([...months] as [string, ...string[]], {
      required_error: 'Start month is required',
    }).optional(),
    endMonth: z.enum([...months] as [string, ...string[]], {
      required_error: 'End month is required',
    }).optional(),
  }),
});

export const academicSemesterValidationSchemas = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema
};
