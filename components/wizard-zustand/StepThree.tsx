import { useFormStore } from "@/stores/useWizardFormStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const StepThreeFormData = z.object({
  street: z.string().min(2, "Street must be at least 2 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
});

type StepThreeData = z.infer<typeof StepThreeFormData>;

export default function StepThree() {
  const { step, setStep, reset, setAddress, data } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StepThreeData>({
    resolver: zodResolver(StepThreeFormData),
    defaultValues: {
      street: data.address.street,
      city: data.address.city,
      state: data.address.state,
      country: data.address.country,
    },
  });

  const onSubmit = (values: StepThreeData) => {
    setAddress(values);
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg space-y-4">
      <strong>Step {step} : Address</strong>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <input
            {...register("street")}
            placeholder="Street"
            className="w-full p-2 border rounded"
          />
          {errors.street && (
            <p className="text-red-500 text-sm">{errors.street.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("city")}
            placeholder="City"
            className="w-full p-2 border rounded"
          />
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("state")}
            placeholder="State"
            className="w-full p-2 border rounded"
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state.message}</p>
          )}
        </div>

        <div>
          <input
            {...register("country")}
            placeholder="Country"
            className="w-full p-2 border rounded"
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country.message}</p>
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
