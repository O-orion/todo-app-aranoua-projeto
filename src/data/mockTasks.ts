import { Task } from "../types/Task";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Comprar mantimentos",
    description: "Comprar leite, pão e ovos no mercado",
    completed: false,
    createdAt: new Date("2025-07-10"),
    priority: "medium",
  },
  {
    id: "2",
    title: "Estudar React",
    description: "Revisar hooks e context API",
    completed: true,
    createdAt: new Date("2025-07-09"),
    finalizedAt: new Date("2025-07-10"),
    priority: "high",
  },
  {
    id: "3",
    title: "Reunião com equipe",
    description: "Discutir progresso do projeto",
    completed: false,
    createdAt: new Date("2025-07-11"),
    priority: "low",
  },
];