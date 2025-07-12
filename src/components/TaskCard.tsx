import React from "react";
import { Task } from "../types/Task";

interface TaskCardProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

function TaskCard ({ task, onToggle, onDelete }:  TaskCardProps)  {
  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "bg-red-100 border-red-500";
      case "medium":
        return "bg-yellow-100 border-yellow-500";
      case "low":
        return "bg-green-100 border-green-500";
      default:
        return "bg-gray-100 border-gray-500";
    }
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-md border-l-4 ${getPriorityColor(
        task.priority
      )} hover:shadow-lg transition`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3
            className={`text-lg font-semibold ${
              task.completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {task.title}
          </h3>
          <p className="text-sm text-gray-600">{task.description}</p>
            {task.createdAt && (
            <p className="text-xs text-gray-500 mt-1">
                Criada em: {new Date(task.createdAt).toLocaleDateString()}
            </p>
            )}

          {task.completedAt && (
            <p className="text-xs text-gray-500">
                Finalizada em: {new Date(task.completedAt).toLocaleDateString()}
            </p>
          )}
          <p className="text-xs font-medium mt-1 capitalize">
            Prioridade: {task.priority}
          </p>
        </div>
            {
                task.id &&(
                    <div className="flex items-center space-x-2">

                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggle(task.id, task.completed)}
                        className="h-5 w-5 text-blue-500 rounded focus:ring-blue-500"
                    />
                    <button
                        onClick={() => onDelete(task.id)}
                        className="text-red-500 hover:text-red-700 transition"
                    >
                        ✕
                    </button>
                    </div>
                )
            }
      </div>
    </div>
  );
};

export default TaskCard;