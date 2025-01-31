import { useState } from "react";
import { addTodo } from "../stores/todoStore";

export function TodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"baixa" | "média" | "alta">("média");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      addTodo({
        title,
        description,
        priority: priority as "low" | "medium" | "high",
      });
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
          placeholder="Task title"
          required
        />
      </div>

      <div className="form-group">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
        />
      </div>

      <div className="form-group">
        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "baixa" | "média" | "alta")
          }
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>

      <button type="submit">Add Task</button>
    </form>
  );
}
