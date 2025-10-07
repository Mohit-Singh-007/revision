"use client";

import { useFormStore } from "@/stores/useWizardFormStore";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFourPreview from "./StepFourPreview";

export default function WizardForm() {
  const { step } = useFormStore();
  return (
    <div className=" mt-10 ">
      {step === 1 && <StepOne />}
      {step === 2 && <StepTwo />}
      {step === 3 && <StepThree />}
      {step === 4 && <StepFourPreview />}
    </div>
  );
}
