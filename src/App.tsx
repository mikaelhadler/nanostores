import { useStore } from "@nanostores/react";
import { todosStore } from "./stores/todoStore";
import { TodoForm } from "./components/TodoForm";
import { TodoItem } from "./components/TodoItem";
import "./App.css";

function App() {
  const todos = useStore(todosStore);

  return (
    <div className="container">
      <h1>Gerenciador de Tarefas</h1>

      <TodoForm />

      <div className="todos-container">
        <h2>Minhas Tarefas ({todos.length})</h2>

        {todos.length === 0 ? (
          <p className="empty-state">Nenhuma tarefa cadastrada</p>
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
