import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .min(6, 'Password must be at least 6 characters long')
    .optional(),
});

export const userValidation = {
  userValidationSchema,
};
