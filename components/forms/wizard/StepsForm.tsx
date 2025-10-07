"use client";

import React, { useState } from "react";
import z from "zod";

// ----- Step-specific schemas -----
const Step1Schema = z.object({
  userName: z
    .string()
    .min(1, "Username is required")
    .max(20, "Username is too long"),
});

const Step2Schema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Full schema for final submission
const FullSchema = Step1Schema.extend(Step2Schema.shape);

type SignUp = z.infer<typeof FullSchema>;

export default function StepsForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState<SignUp>({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SignUp, string>>>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    const currentSchema = step === 1 ? Step1Schema : Step2Schema;

    const currentStepData =
      step === 1
        ? { userName: formData.userName }
        : {
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          };

    const res = currentSchema.safeParse(currentStepData);

    if (!res.success) {
      const fieldErrors: Partial<Record<keyof SignUp, string>> = {};
      res.error.issues.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0] as keyof SignUp] = err.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    setIsLoading(true);
    const res = FullSchema.safeParse(formData);

    if (!res.success) {
      const fieldErrors: Partial<Record<keyof SignUp, string>> = {};
      res.error.issues.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0] as keyof SignUp] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsLoading(false);
      return;
    }

    setErrors({});
    // ✅ Submit your data here (API call)
    console.log("Form submitted:", formData);

    // Optional: clear form
    setFormData({ userName: "", email: "", password: "", confirmPassword: "" });
    setStep(1);
    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg space-y-4">
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Step 1: Personal Info</h2>
          <input
            type="text"
            name="userName"
            placeholder="Full Name"
            value={formData.userName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.userName && (
            <p className="text-red-500 text-sm">{errors.userName}</p>
          )}
          <button
            onClick={nextStep}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Step 2: Account Info</h2>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}

          <div className="flex gap-2">
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Back
            </button>
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Step 3: Review & Submit</h2>
          <p>
            <strong>Full Name:</strong> {formData.userName}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>

          <div className="flex gap-2">
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
