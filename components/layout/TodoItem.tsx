"use client";

import { useState, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { toggleTodo } from "@/store/todoSlice";
import { Todo } from "@/types/todo";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TodoItemProps {
  todo: Todo;
  onUpdateTodo: (id: string, text: string) => void;
  onDeleteTodo: (id: string) => void;
}

export default function TodoItem({
  todo,
  onUpdateTodo,
  onDeleteTodo,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setEditText(todo.text);
  }, [todo.text]);

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleUpdate = () => {
    if (editText.trim() !== todo.text) {
      onUpdateTodo(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleUpdate();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditText(todo.text);
    }
  };

  return (
    <li className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2 p-2 bg-gray-100 rounded-md">
      <div className="flex items-center gap-2 flex-grow">
        <Checkbox checked={todo.completed} onCheckedChange={handleToggle} />
        {isEditing ? (
          <Input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={handleKeyDown}
            className="flex-grow"
            autoFocus
          />
        ) : (
          <span
            className={`flex-grow ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <Button
          variant="outline"
          size="sm"
          onMouseDown={(e) => e.preventDefault()}
          onClick={isEditing ? handleUpdate : () => setIsEditing(true)}
          className="w-full sm:w-auto"
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDeleteTodo(todo.id)}
          className="w-full sm:w-auto"
        >
          Delete
        </Button>
      </div>
    </li>
  );
}
