import axios from "axios";
import { Task } from "../types/Task";

const API_URL = "http://localhost:9090/api";

export const fetchTodos = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data.map((task: Task) => ({
    ...task,
    createdAt: new Date(task.createdAt ?? ''),
    completedAt: task.completedAt ? new Date(task.completedAt) : null,
    updatedAt: task.updatedAt ? new Date(task.updatedAt) : null,
  }));
};

export const createTodo = async (title: string, description: string, priority: Task["priority"]): Promise<Task> => {
  const response = await axios.post(`${API_URL}/tasks`, {
    title,
    description,
    priority,
    completed: false,
    createdAt: new Date().toISOString(),
    completedAt: null,
  });
  return {
    ...response.data,
    createdAt: new Date(response.data.createdAt),
    completedAt: response.data.completedAt ? new Date(response.data.completedAt) : null,
    updatedAt: response.data.updatedAt ? new Date(response.data.updatedAt) : null,
  };
};

export const updateTodo = async (id: string, updates: Partial<Task>): Promise<Task> => {
  const response = await axios.put(`${API_URL}/tasks/${id}`, {
    ...updates,
    completedAt: updates.completed ? new Date().toISOString() : null,
  });
  return {
    ...response.data,
    createdAt: new Date(response.data.createdAt),
    completedAt: response.data.completedAt ? new Date(response.data.completedAt) : null,
    updatedAt: response.data.updatedAt ? new Date(response.data.updatedAt) : null,
  };
};

export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};