import axios from "axios";
import { Task } from "../types/Task";

const API_URL = "http://localhost:3001/todos";

export const fetchTodos = async (): Promise<Task[]> => {
  const response = await axios.get(API_URL);

  return response.data.map((task: Task) => ({
    ...task,
    createdAt: new Date(task.createdAt),
    finalizedAt: task.finalizedAt ? new Date(task.finalizedAt) : undefined,
  }));
};

export const createTodo = async (title: string, description: string, priority: Task["priority"]): Promise<Task> => {
  const response = await axios.post(API_URL, {
    title,
    description,
    priority,
    completed: false,
    createdAt: new Date(),
  });
  return {
    ...response.data,
    createdAt: new Date(response.data.createdAt),
    finalizedAt: response.data.finalizedAt ? new Date(response.data.finalizedAt) : undefined,
  };
};

export const updateTodo = async (id: string, updates: Partial<Task>): Promise<Task> => {
  const response = await axios.put(`${API_URL}/${id}`, updates);
  return {
    ...response.data,
    createdAt: new Date(response.data.createdAt),
    finalizedAt: response.data.finalizedAt ? new Date(response.data.finalizedAt) : undefined,
  };
};

export const deleteTodo = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};