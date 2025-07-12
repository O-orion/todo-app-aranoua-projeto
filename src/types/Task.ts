export interface Task {
  id: string;
  title: string;
  completed: boolean;
  description: string;
  createdAt: Date;
  finalizedAt?: Date;
  priority: 'low' | 'medium' | 'high';
}