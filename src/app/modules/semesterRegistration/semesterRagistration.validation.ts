import { z } from "zod";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";

export const semesterRegistrationZodSchema = z.object({
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
});
