"use client";

import { useTodoStore } from "@/stores/Todostore";
import { useState } from "react";

export default function AddTodos() {
  const addTodos = useTodoStore((state) => state.addTodos);

  const [title, setTitle] = useState("");

  function handleAddTodos() {
    if (!title.trim()) return;

    addTodos({
      id: Date.now(),
      title: title,
      isCompleted: false,
    });
  }
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        className="w-50 border-2 px-4 py-2 rounded-2xl"
        placeholder="Add your todo..."
        value={title}
      />
      <br />
      <button
        onClick={handleAddTodos}
        className="border-2 px-3 py-1 rounded-2xl mt-5 w-50 bg-blue-200/35"
      >
        ➕ Add
      </button>
    </div>
  );
}
