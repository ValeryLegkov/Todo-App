import { Todo } from "@/types/todo";
import TodoItem from "@/components/layout/TodoItem";

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (id: string, text: string) => void;
  onDeleteTodo: (id: string) => void;
}

export default function TodoList({
  todos,
  onUpdateTodo,
  onDeleteTodo,
}: TodoListProps) {
  return (
    <ul className="space-y-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdateTodo={onUpdateTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
}
