import { useStore } from "@nanostores/react";
import { todosStore } from "./stores/todoStore";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";
import "./App.css";

function App() {
  const todos = useStore(todosStore);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Task Manager</h1>

      <TodoForm />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">My Tasks ({todos.length})</h2>

        {todos.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No tasks registered
          </p>
        ) : (
          <div className="space-y-4">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                {...todo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
