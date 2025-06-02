export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  assignedTo?: string; // User ID
  assignedToUsername?: string; // Username for display purposes
  createdBy: string; // Admin ID who created the task
  createdAt: Date;
  updatedAt: Date;
}
