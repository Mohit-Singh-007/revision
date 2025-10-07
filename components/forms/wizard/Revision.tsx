"use client";
import { useState } from "react";
import z from "zod";

const Step1Schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  // age: z.number().min(0, "Age must be a positive number"),
  age: z.preprocess(
    (val) => {
      // Convert string to number
      if (typeof val === "string" && val.trim() !== "") {
        return Number(val);
      }
      return val; // keep as is if already number
    },
    z.number().min(0, "Age must be a positive number") // actual validation
  ),
});

const Step2Schema = z
  .object({
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

const FullStepsSchema = Step1Schema.extend(Step2Schema.shape);

type SignupSchema = z.infer<typeof FullStepsSchema>;

export default function Revision() {
  const [formData, setFormData] = useState<SignupSchema>({
    firstName: "",
    lastName: "",
    age: 0,
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SignupSchema, string>>
  >({});

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle input changes
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    // current step ka schema
    const currSchema = step === 1 ? Step1Schema : Step2Schema;

    // current step ka data
    const currStepData =
      step === 1
        ? {
            firstName: formData.firstName,
            lastName: formData.lastName,
            age: formData.age,
          }
        : {
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
          };

    // validate current step data
    const res = currSchema.safeParse(currStepData);

    if (!res.success) {
    } else {
      setErrors({});
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    setStep((s) => s - 1);
  };

  const handleSubmit = () => {};

  return (
    <div>
      <div className="max-w-md mx-auto p-4 border rounded-lg space-y-4">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Step 1: Personal Info</h2>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}

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
              <strong>First Name:</strong> {formData.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {formData.lastName}
            </p>
            <p>
              <strong>Age:</strong> {formData.age}
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
    </div>
  );
}
