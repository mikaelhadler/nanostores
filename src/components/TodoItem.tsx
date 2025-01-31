import { useState } from "react";
import { updateTodo, deleteTodo, toggleTodo } from "../stores/todoStore";

interface TodoItemProps {
  id: string;
  title: string;
  description: string;
  priority: "baixa" | "média" | "alta";
  completed: boolean;
}

export function TodoItem({
  id,
  title,
  description,
  priority,
  completed,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title,
    description,
    priority,
  });

  const handleUpdate = () => {
    if (editData.title.trim()) {
      // Validação básica
      updateTodo(id, {
        title: editData.title,
        description: editData.description,
        priority: editData.priority,
      });
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          type="text"
          value={editData.title}
          onChange={(e) =>
            setEditData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <textarea
          value={editData.description}
          onChange={(e) =>
            setEditData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <select
          value={editData.priority}
          onChange={(e) =>
            setEditData((prev) => ({
              ...prev,
              priority: e.target.value as "baixa" | "média" | "alta",
            }))
          }
        >
          <option value="baixa">Baixa</option>
          <option value="média">Média</option>
          <option value="alta">Alta</option>
        </select>
        <div className="actions">
          <button onClick={handleUpdate}>Salvar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item priority-${priority}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => toggleTodo(id)}
      />
      <div className="todo-content">
        <h3 style={{ textDecoration: completed ? "line-through" : "none" }}>
          {title}
        </h3>
        <p>{description}</p>
        <span className="priority-badge">{priority}</span>
      </div>
      <div className="actions">
        <button onClick={() => setIsEditing(true)}>Editar</button>
        <button
          className="delete"
          onClick={() => deleteTodo(id)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
