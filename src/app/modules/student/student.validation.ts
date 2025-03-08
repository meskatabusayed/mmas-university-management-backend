import { z } from "zod";

export const studentValidationSchema = z.object({
    id: z
      .number()
      .int()
      .positive({ message: 'ID must be a positive integer' }),
    password: z
      .string()
      .max(20 , 'maximum 20 characters' ),
    name: z
      .string()
      .trim()
      .max(20, 'Name cannot exceed 20 characters')
      .refine((value) => value.charAt(0) === value.charAt(0).toUpperCase(), {
        message: 'Name must start with an uppercase letter',
      }),
    age: z.number().min(1, 'Age is required'),
    email: z.string().email('Invalid email format'),
    phone: z.string().optional(),
    address: z.object({
      street: z.string().min(1, 'Street is required'),
      city: z.string().min(1, 'City is required'),
      state: z.string().min(1, 'State is required'),
      zipCode: z.string().min(1, 'Zip Code is required'),
    }),
    dateOfBirth: z.string().min(1, 'Date of Birth is required'),
    gender: z.enum(['Male', 'Female', 'Other'], {
      errorMap: () => ({ message: 'Gender must be Male, Female, or Other' }),
    }),
    courses: z.array(z.string()).min(1, 'At least one course is required'),
    gpa: z.number().min(0, 'GPA is required'),
    isActive: z.enum(['Active', 'Block'], {
      errorMap: () => ({ message: 'Status must be Active or Block' }),
    }),
    enrollmentDate: z.string().min(1, 'Enrollment date is required'),
    isDeleted: z.boolean(),
  });