import z from "zod";

const roles = ["user", "admin", "superadmin"] as const;

export const UserSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(20, "First name is too long"),

    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(20, "Last name is too long"),

    userName: z
      .string()
      .min(1, "Username is required")
      .max(20, "Username is too long"),

    email: z.email("Invalid email address"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password is too long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      ),

    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),

    address: z.string().optional(),
    phoneNumber: z.string().optional(),

    role: z.enum(roles).default("user"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
