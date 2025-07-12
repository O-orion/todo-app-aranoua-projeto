import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import TaskFilter from "./TaskFilter";
import Modal from "./Modal";
import { Task } from "../types/Task";
import { mockTasks } from "../data/mockTasks";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setTasks(mockTasks);
    setFilteredTasks(mockTasks);
  }, []);

  const handleAddTask = (title: string, description: string, priority: Task["priority"]) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      priority,
      completed: false,
      createdAt: new Date(),
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const handleToggleTask = (id: string, completed: boolean) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !completed, finalizedAt: !completed ? new Date() : undefined }
        : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const handleDeleteTask = (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
  };

  const handleFilter = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerQuery) ||
        task.description.toLowerCase().includes(lowerQuery)
    );
    setFilteredTasks(filtered);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Minhas Tarefas</h1>
      <TaskFilter onFilter={handleFilter} onOpenModal={() => setIsModalOpen(true)} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            Nenhuma tarefa encontrada.
          </p>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskForm onAdd={handleAddTask} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default TaskList;