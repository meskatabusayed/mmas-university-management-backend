import { z } from 'zod';

// Pre-requisite Course Validation Schema
const preRequisiteCourseSchema = z.object({
  course: z.string().nonempty({ message: 'Course ID is required' }),
  isDeleted: z.boolean().optional(),
});

// Main Course Create Validation Schema
const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().nonempty({ message: 'Title is required' }),
    prefix: z.string().nonempty({ message: 'Prefix is required' }),
    code: z.number().min(1, { message: 'Code must be a positive number' }),
    credits: z
      .number()
      .min(1, { message: 'Credits must be a positive number' }),
    preRequisiteCourses: z.array(preRequisiteCourseSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

// Main Course Update Validation Schema
const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().min(1).optional(),
    credits: z.number().min(1).optional(),
    preRequisiteCourses: z.array(preRequisiteCourseSchema).optional(),
    isDeleted: z.boolean().optional(),
  }),
});

const facultiesacultiesValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});

export const courseValidations = {
  createCourseValidationSchema,
  updateCourseValidationSchema,
  facultiesacultiesValidationSchema,
};
