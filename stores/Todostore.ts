import { create } from "zustand";

type iTodo = {
  id: number;
  title: string;
  isCompleted: boolean;
};

interface iTodoStore {
  todos: iTodo[];
  addTodos: (todo: iTodo) => void;
  removeTodos: (id: number) => void;
  toggleTodos: (id: number) => void;
}

export const useTodoStore = create<iTodoStore>((set) => ({
  todos: [],

  addTodos: (t) =>
    set((state) => ({
      todos: [...state.todos, t],
    })),

  removeTodos: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),

  toggleTodos: (id) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
      ),
    })),
}));
