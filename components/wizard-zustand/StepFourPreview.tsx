"use client";

import { useFormStore } from "@/stores/useWizardFormStore";

export default function StepFourPreview() {
  const { data, setStep, reset } = useFormStore();

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-semibold mb-4">Review Your Information</h2>

      <div className="space-y-2">
        <h3 className="font-medium">Personal Info</h3>
        <p>
          <strong>First Name:</strong> {data.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {data.lastName}
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Job Info</h3>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Job Title:</strong> {data.jobTitle}
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Address</h3>
        <p>
          <strong>Street:</strong> {data.address.street}
        </p>
        <p>
          <strong>City:</strong> {data.address.city}
        </p>
        <p>
          <strong>State:</strong> {data.address.state}
        </p>
        <p>
          <strong>Country:</strong> {data.address.country}
        </p>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          type="button"
          onClick={() => setStep(3)}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => alert(JSON.stringify(data, null, 2))}
          className="px-4 py-2 bg-green-600 text-white rounded-lg"
        >
          Submit
        </button>

        <button
          type="button"
          onClick={() => {
            reset();
          }}
          className="px-4 py-2 bg-pink-400 text-white rounded-lg"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
