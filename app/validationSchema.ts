import { z } from "zod";

export const loginSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("This is not a valid email."),
});

export const dogSearchSchema = z.object({
  breeds: z.array(z.string()).optional(),
  agemin: z.number({invalid_type_error: "Age Min must be a number"}).optional(),
  agemax: z.number({invalid_type_error: "Age Max must be a number"}).optional(),
}).refine((data) => {
  if (data.agemin !== undefined && data.agemax !== undefined) {
    if (data.agemin > data.agemax) {
      return {
        agemin: "Age Min must be less than or equal to Age Max",
        agemax: "Age Max must be greater than or equal to Age Min",
      };
    }
  }
  return true;
});