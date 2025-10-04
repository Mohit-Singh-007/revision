"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const Schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ReactHookSignUpFormData = z.infer<typeof Schema>;

export default function SignupFormRHF() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ReactHookSignUpFormData>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = (data: ReactHookSignUpFormData) => {
    console.log(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 border rounded-lg space-y-4 mt-10"
    >
      <div>
        <label className="block mb-1">Email</label>
        <input
          {...register("email")}
          className="w-full p-2 border rounded"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full p-2 border rounded"
          placeholder="Enter password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Confirm Password</label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="w-full p-2 border rounded"
          placeholder="Confirm password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
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
