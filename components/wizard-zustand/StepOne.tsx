"use client";

import { useFormStore } from "@/stores/useWizardFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const StepOneFormData = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
});

type StepOneData = z.infer<typeof StepOneFormData>;

export default function StepOne() {
  const { data, setFormData, setStep, step } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepOneData>({
    resolver: zodResolver(StepOneFormData),
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
    },
  });

  const onSubmit = (values: StepOneData) => {
    setFormData(values);
    setStep(2);
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg space-y-4">
      <strong>Step {step} : Name</strong>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <input
            {...register("firstName")}
            placeholder="First Name"
            className="w-full p-2 border rounded"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("lastName")}
            placeholder="Last Name"
            className="w-full p-2 border rounded"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </form>
    </div>
  );
}
