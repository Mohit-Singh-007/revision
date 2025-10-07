import { create } from "zustand";

type Address = {
  street: string;
  city: string;
  state: string;
  country: string;
};

interface iFormData {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
  address: Address;
}

interface iStoreActions {
  step: number;
  data: iFormData;
  setStep: (step: number) => void;
  setFormData: (data: Partial<iFormData>) => void;
  setAddress: (data: Partial<Address>) => void;
  reset: () => void;
}

export const useFormStore = create<iStoreActions>((set) => ({
  step: 1,
  data: {
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    address: { street: "", city: "", state: "", country: "" },
  },

  setStep: (s) => set(() => ({ step: s })),

  setFormData: (formData) =>
    set((s) => ({
      data: { ...s.data, ...formData },
    })),

  setAddress: (address) =>
    set((a) => ({
      data: { ...a.data, address: { ...a.data.address, ...address } },
    })),

  reset: () =>
    set(() => ({
      step: 1,
      data: {
        firstName: "",
        lastName: "",
        email: "",
        jobTitle: "",
        address: { street: "", city: "", state: "", country: "" },
      },
    })),
}));
