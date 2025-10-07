"use client";
import { useState } from "react";
import z from "zod";

const SignupFormSchema = z
  .object({
    userName: z
      .string()
      .min(1, "Username is required")
      .max(20, "Username is too long"),

    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // highlight the confirmPassword field
  });

type SignUpSchema = z.infer<typeof SignupFormSchema>;

export default function SignupForm() {
  const [formData, setFormData] = useState<SignUpSchema>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SignUpSchema, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle input changes
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const res = SignupFormSchema.safeParse(formData);

    if (!res.success) {
      const fieldErrors: Partial<Record<keyof SignUpSchema, string>> = {};

      res.error.issues.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0] as keyof SignUpSchema] = err.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      // Proceed with form submission (e.g., send data to server)
      console.log("Form submitted successfully:", formData);
      setFormData({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <form
      className="max-w-md mx-auto p-4 border rounded-lg space-y-4 mt-10"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block mb-1">userName</label>
        <input
          type="text"
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.userName && (
          <p className="text-red-500 text-sm">{errors.userName}</p>
        )}
      </div>
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

      <div>
        <label className="block mb-1">Password</label>
        <input
          type="text"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">confirmPassword</label>
        <input
          type="text"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Sign Up
      </button>
    </form>
  );
}
