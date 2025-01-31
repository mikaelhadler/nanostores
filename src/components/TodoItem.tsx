import { useState } from "react";
import { updateTodo, deleteTodo, toggleTodo } from "../stores/todoStore";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
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
      updateTodo(id, editData);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <Card className="p-4 space-y-4">
        <Input
          value={editData.title}
          onChange={(e) =>
            setEditData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <Textarea
          value={editData.description}
          onChange={(e) =>
            setEditData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <Select
          value={editData.priority}
          onValueChange={(value) =>
            setEditData((prev) => ({
              ...prev,
              priority: value as typeof priority,
            }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button onClick={handleUpdate}>Save</Button>
          <Button
            variant="outline"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("p-4", `priority-${priority}`)}>
      <div className="flex items-start gap-4">
        <Checkbox
          checked={completed}
          onCheckedChange={() => toggleTodo(id)}
        />
        <div className="flex-1">
          <h3
            className={cn("text-lg font-medium", completed && "line-through")}
          >
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          <span
            className={cn(
              "inline-block px-2 py-1 text-xs rounded-full mt-2",
              priority === "low" && "bg-green-100 text-green-800",
              priority === "medium" && "bg-yellow-100 text-yellow-800",
              priority === "high" && "bg-red-100 text-red-800"
            )}
          >
            {priority}
          </span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => deleteTodo(id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}
