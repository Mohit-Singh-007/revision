"use client";

import { useTodoStore } from "@/stores/Todostore";

export default function TodoList() {
  const { todos, removeTodos, toggleTodos } = useTodoStore((state) => state);

  if (todos.length === 0)
    return (
      <p className=" flex flex-col items-center justify-center mt-5 ">
        No todos yet...
      </p>
    );
  return (
    <ul className="flex flex-col items-center justify-center mt-5">
      {todos.map((todo) => (
        <li key={todo.id} className="flex gap-4 items-center mt-5">
          <span
            onClick={() => toggleTodos(todo.id)}
            className={`${
              todo.isCompleted ? "line-through" : ""
            } cursor-pointer `}
          >
            {todo.title}
          </span>

          <button
            onClick={() => removeTodos(todo.id)}
            className="bg-red-200 text-white px-2 py-1 rounded-lg"
          >
            ❌
          </button>
        </li>
      ))}
    </ul>
  );
}
