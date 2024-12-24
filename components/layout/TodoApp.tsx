"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { addTodo, updateTodo, deleteTodo, setFilter } from "@/store/todoSlice";
import TodoList from "@/components/layout/TodoList";
import AddTodoForm from "./AddTodoForm";
import DeleteConfirmModal from "./DeleteConfirmModal";
import FilterButtons from "@/components/layout/FilterButtons";
import { FilterType } from "@/types/filter";

export default function TodoApp() {
  const todos = useAppSelector((state) => state.todos.todos);
  const currentFilter = useAppSelector((state) => state.todos.filter);

  const dispatch = useAppDispatch();

  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);

  const handleAddTodo = (text: string) => {
    dispatch(addTodo(text));
  };

  const handleFilterChange = (filter: FilterType) => {
    dispatch(setFilter(filter));
  };

  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === "complete") {
      return todo.completed;
    } else if (currentFilter === "incomplete") {
      return !todo.completed;
    }
    return true;
  });

  const handleUpdateTodo = (id: string, text: string) => {
    dispatch(updateTodo({ id, text }));
  };

  const handleDeleteTodo = (id: string) => {
    setTodoToDelete(id);
  };

  const confirmDelete = () => {
    if (todoToDelete) {
      dispatch(deleteTodo(todoToDelete));
      setTodoToDelete(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Todo App</h1>
      <div className="space-y-6">
        <AddTodoForm onAddTodo={handleAddTodo} />
        <FilterButtons
          currentFilter={currentFilter}
          onFilterChange={handleFilterChange}
        />
        <TodoList
          todos={filteredTodos}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
        />
      </div>
      <DeleteConfirmModal
        isOpen={!!todoToDelete}
        onClose={() => setTodoToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
