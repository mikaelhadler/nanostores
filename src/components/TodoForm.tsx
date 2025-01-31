import { useState } from "react";
import { addTodo } from "../stores/todoStore";

export function TodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"baixa" | "média" | "alta">("média");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo({ title, description, priority });
      setTitle("");
      setDescription("");
      setPriority("média");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="todo-form"
    >
      <div className="form-group">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título da tarefa"
          required
        />
      </div>

      <div className="form-group">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição"
        />
      </div>

      <div className="form-group">
        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "baixa" | "média" | "alta")
          }
        >
          <option value="baixa">Baixa Prioridade</option>
          <option value="média">Média Prioridade</option>
          <option value="alta">Alta Prioridade</option>
        </select>
      </div>

      <button type="submit">Adicionar Tarefa</button>
    </form>
  );
}
