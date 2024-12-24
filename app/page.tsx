"use client";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import TodoApp from "@/components/layout/TodoApp";

export default function Home() {
  return (
    <Provider store={store}>
      <main className="flex min-h-screen flex-col items-center justify-between m-1">
        <TodoApp />
      </main>
    </Provider>
  );
}
