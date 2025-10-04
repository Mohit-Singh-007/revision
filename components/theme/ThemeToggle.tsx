"use client";
import { useThemeStore } from "@/stores/ThemeStore";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useThemeStore();

  return (
    <button onClick={toggleTheme} className="border-2 px-2 py-0 rounded-3xl">
      {darkMode ? "Click ☀️" : "Click 🌑"}
    </button>
  );
}
