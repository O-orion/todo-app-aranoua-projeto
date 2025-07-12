
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: string;
  completedAt?: string | null;
  updatedAt?: string | null;
  priority: Priority;
}

export enum Priority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
}
