import { z } from "zod";
import { BRANCHES } from "@/lib/constants";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional().default(false),
});

export const signupSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
    branch: z.enum(BRANCHES, {
      errorMap: () => ({ message: "Select a valid branch" }),
    }),
    semester: z.coerce
      .number()
      .int()
      .min(1, "Semester must be between 1 and 8")
      .max(8, "Semester must be between 1 and 8"),
    enrollmentNumber: z.string().min(2, "Enrollment number is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const profileSchema = z.object({
  fullName: z.string().min(2, "Full name is required").optional(),
  branch: z.string().optional(),
  semester: z.coerce.number().int().min(1).max(8).optional(),
  university: z.string().optional(),
  targetCGPA: z.coerce.number().min(0).max(10).optional(),
  onboardingComplete: z.boolean().optional(),
});
