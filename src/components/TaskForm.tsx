import React, { useState } from "react";
import { Task } from "../types/Task";

interface TaskFormProps {
  onAdd: (title: string, description: string, priority: Task["priority"]) => void;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Task["priority"]>("low");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onAdd(title, description, priority);
    setTitle("");
    setDescription("");
    setPriority("low");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Nova Tarefa</h2>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título da tarefa"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrição da tarefa"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task["priority"])}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Baixa</option>
          <option value="medium">Média</option>
          <option value="high">Alta</option>
        </select>
      </div>
      <div className="flex space-x-2">
        <button
          type="submit"
          className="flex-1 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Adicionar
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 p-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300ряда

System: transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default TaskForm;