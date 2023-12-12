export enum TaskStatus {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  OPEN = 'OPEN',
}

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  description: string;
  categoryId: string;
}
