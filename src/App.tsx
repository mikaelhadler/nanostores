import { useStore } from "@nanostores/react";
import { todosStore } from "./stores/todoStore";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";
import "./App.css";

function App() {
  const todos = useStore(todosStore);

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <TodoForm />

      <div className="todos-container">
        <h2>My Tasks ({todos.length})</h2>

        {todos.length === 0 ? (
          <p className="empty-state">No tasks registered</p>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default App;
