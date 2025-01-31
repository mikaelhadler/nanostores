import { useState } from "react";
import { updateTodo, deleteTodo, toggleTodo } from "../stores/todoStore";
import { Button } from "./ui/button";
import { TableCell, TableRow } from "./ui/table";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
}

export function TodoItem({ id, title, completed }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleUpdate = () => {
    updateTodo(id, editedTitle);
    setIsEditing(false);
  };

  return (
    <TableRow>
      <TableCell>
        <Checkbox
          checked={completed}
          onCheckedChange={() => toggleTodo(id)}
        />
      </TableCell>
      <TableCell>
        {isEditing ? (
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
            autoFocus
          />
        ) : (
          <span
            className={cn("cursor-pointer", {
              "line-through": completed,
            })}
            onClick={() => setIsEditing(true)}
          >
            {title}
          </span>
        )}
      </TableCell>
      <TableCell className="text-right">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => deleteTodo(id)}
        >
          Excluir
        </Button>
      </TableCell>
    </TableRow>
  );
}
