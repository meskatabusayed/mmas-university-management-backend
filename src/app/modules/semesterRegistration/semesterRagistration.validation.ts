import { z } from "zod";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";

const createSemesterRegistrationZodSchema = z.object({
  body : z.object({
    academicSemester: z.string().nonempty("Academic semester ID is required."),
    status: z.enum(SemesterRegistrationStatus).default("UPCOMING"),
    startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid start date.",
    }),
    endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid end date.",
    }),
    minCreadit: z.number().min(1, "Minimum credit should be at least 1.").default(3),
    maxCreadit: z.number().min(1, "Maximum credit should be at least 1.").default(15),
  })
})

const updateSemesterRegistrationZodSchema = z.object({
  body : z.object({
    academicSemester: z.string().nonempty("Academic semester ID is required.").optional(),
    status: z.enum(SemesterRegistrationStatus).default("UPCOMING"),
    startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid start date.",
    }).optional(),
    endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid end date.",
    }).optional(),
    minCreadit: z.number().min(1, "Minimum credit should be at least 1.").default(3).optional(),
    maxCreadit: z.number().min(1, "Maximum credit should be at least 1.").default(15).optional(),
  })
})

export const semesterRegistrationValidations = {
  createSemesterRegistrationZodSchema,
  updateSemesterRegistrationZodSchema,

}
