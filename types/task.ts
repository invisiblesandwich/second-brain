export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string | null;
  status:string;

  createdAt: string;
  updatedAt: string;
}