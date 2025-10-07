"use client";

import { useFormStore } from "@/stores/useWizardFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const StepTwoFormData = z.object({
  email: z.email("Invalid email address"),
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
});

type StepTwoData = z.infer<typeof StepTwoFormData>;

export default function StepTwo() {
  const { step, setStep, setFormData, data } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepTwoData>({
    resolver: zodResolver(StepTwoFormData),
    defaultValues: {
      email: data.email,
      jobTitle: data.jobTitle,
    },
  });

  const onSubmit = (values: StepTwoData) => {
    setFormData(values);
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg space-y-4">
      <strong>Step {step} : Details</strong>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <input
            {...register("email")}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("jobTitle")}
            placeholder="Job Title"
            className="w-full p-2 border rounded"
          />
          {errors.jobTitle && (
            <p className="text-red-500 text-sm">{errors.jobTitle.message}</p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
