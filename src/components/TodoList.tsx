import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import TaskFilter from "./TaskFilter";
import Modal from "./Modal";
import { Task } from "../types/Task";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../services/apiService.service";

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTasks() {
      try {
        const tasksFromApi = await fetchTodos();
        setTasks(tasksFromApi);
        setFilteredTasks(tasksFromApi);
        setError(null);
      } catch (err) {
        setError("Erro ao carregar tarefas. Tente novamente.");
        console.error("Erro ao buscar tarefas:", err);
      }
    }
    loadTasks();
  }, []);

  const handleAddTask = async (title: string, description: string, priority: Task["priority"]) => {
    try {
      const newTask = await createTodo(title, description, priority);
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      setIsModalOpen(false);
      setError(null);
    } catch (err) {
      setError("Erro ao criar tarefa. Verifique os dados e tente novamente.");
      console.error("Erro ao criar tarefa:", err);
    }
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    try {
      const updatedTask = await updateTodo(id, {
        completed: !completed,
        completedAt: !completed ? new Date().toISOString() : null, // Envia como string | null
      });
      const updatedTasks = tasks.map((task) => (task.id === id ? updatedTask : task));
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      setError(null);
    } catch (err) {
      setError("Erro ao atualizar tarefa. Tente novamente.");
      console.error("Erro ao atualizar tarefa:", err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTodo(id);
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks(updatedTasks);
      setFilteredTasks(updatedTasks);
      setError(null);
    } catch (err) {
      setError("Erro ao excluir tarefa. Tente novamente.");
      console.error("Erro ao excluir tarefa:", err);
    }
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
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
}

export default TaskList;