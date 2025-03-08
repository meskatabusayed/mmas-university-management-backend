import { z } from "zod";

 const userValidationSchema = z.object({
  id: z.string().min(1, "ID is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  needsPasswordChange: z.boolean().default(true).optional(),
  role: z.enum(["admin", "Student", "faculty"], {
    errorMap: () => ({ message: "Role must be either admin, Student, or faculty" }),
  }),
  status: z.enum(["in-progress", "blocked"], {
    errorMap: () => ({ message: "Status must be either in-progress or blocked" }),
  }),
  isDeleted: z.boolean().default(false),
});

export const userValidation = {
    userValidationSchema,

}
