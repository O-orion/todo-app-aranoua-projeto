import React, { useState } from "react";

interface TaskFilterProps {
  onFilter: (query: string) => void;
  onOpenModal: () => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilter, onOpenModal }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onFilter(value);
  };

  return (
    <div className="flex items-center space-x-4 mb-6">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Pesquisar tarefas..."
        className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onOpenModal}
        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        title="Adicionar nova tarefa"
      >
        +
      </button>
    </div>
  );
};

export default TaskFilter;