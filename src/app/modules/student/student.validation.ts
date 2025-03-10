import { z } from 'zod';

const guardianSchemaValidationSchema = z.object({
  name: z.string().min(1, 'Guardian name is required'),
  contactNo: z.string().min(1, 'Guardian contact number is required'),
  relation: z.string().min(1, 'Guardian relation is required'),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  contactNo: z.string().min(1, 'Contact number is required'),
  relation: z.string().min(1, 'Relation is required'),
});

const createStudentValidationSchema = z.object({
  body: z.object({
   
    student: z.object({
      name: z.string().min(1, 'Name is required'),
      gender: z.enum(['Male', 'Female', 'Other']),
      dateOfBirth: z.string().min(1, 'Date of Birth is required'),
      email: z.string().email('Invalid email format'),
      contactNo: z.string().min(1, 'Contact number is required'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required'),
      presentAddress: z.string().min(1, 'Present address is required'),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      guardian: guardianSchemaValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImage: z.string().optional(),
      admissionSemester: z.string().min(1, 'Admission semester is required'),
      academicDepartment: z.string().min(1, 'Academic department is required'),
      
    }),
  }),
});

export const studentValidationSchemas = {
  createStudentValidationSchema,
};
