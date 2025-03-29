import { z } from 'zod';

const createGuardianSchemaValidationSchema = z.object({
  name: z.string().min(1, 'Guardian name is required'),
  contactNo: z.string().min(1, 'Guardian contact number is required'),
  relation: z.string().min(1, 'Guardian relation is required'),
});

const updateGuardianSchemaValidationSchema = z.object({
  name: z.string().min(1, 'Guardian name is required').optional(),
  contactNo: z.string().min(1, 'Guardian contact number is required').optional(),
  relation: z.string().min(1, 'Guardian relation is required').optional(),
});

const createLocalGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  contactNo: z.string().min(1, 'Contact number is required'),
  relation: z.string().min(1, 'Relation is required'),
});

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  contactNo: z.string().min(1, 'Contact number is required').optional(),
  relation: z.string().min(1, 'Relation is required').optional(),
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
      guardian: createGuardianSchemaValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      profileImage: z.string().optional(),
      admissionSemester: z.string().min(1, 'Admission semester is required'),
      academicDepartment: z.string().min(1, 'Academic department is required'),
    }),
  }),
});
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: z.string().min(1, 'Name is required').optional(),
      gender: z.enum(['Male', 'Female', 'Other']).optional(),
      dateOfBirth: z.string().min(1, 'Date of Birth is required').optional(),
      email: z.string().email('Invalid email format').optional(),
      contactNo: z.string().min(1, 'Contact number is required').optional(),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required').optional(),
      presentAddress: z.string().min(1, 'Present address is required').optional(),
      permanentAddress: z.string().min(1, 'Permanent address is required').optional(),
      guardian: updateGuardianSchemaValidationSchema,
      localGuardian: updateLocalGuardianValidationSchema,
      profileImage: z.string().optional(),
      admissionSemester: z.string().min(1, 'Admission semester is required').optional(),
      academicDepartment: z.string().min(1, 'Academic department is required').optional(),
    }),
  }),
});




export const studentValidationSchemas = {
  createStudentValidationSchema,
  updateStudentValidationSchema
};
