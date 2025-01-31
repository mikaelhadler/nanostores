import { useStore } from "@nanostores/react";
import { todosStore } from "./stores/todoStore";
import { TodoForm } from "./components/TodoForm";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";

export function App() {
  const $todos = useStore(todosStore);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Gerenciador de Tarefas</h1>
      <TodoForm />
      <div className="mt-6">
        <DataTable
          columns={columns}
          data={$todos}
        />
      </div>
    </div>
  );
}

export default App;
