"use client";
import { useThemeStore } from "@/stores/ThemeStore";
import ThemeToggle from "../components/theme/ThemeToggle";

export default function Home() {
  const darkMode = useThemeStore((state) => state.darkMode);

  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      } min-h-screen p-10`}
    >
      <ThemeToggle />
    </div>
  );
}
