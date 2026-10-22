export type TaskStatus = "todo" | "in_progress" | "done";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  assigneeId?: string;
  estimateHours?: number;
}

export const TASK_DEFAULTS = {
  status: "todo",
} as const;

const UNASSIGNED = "Unassigned";

export const createTask = (id: string, title: string): Task => {
  const taskId = id.trim();
  const taskTitle = title.trim();
  if (!taskId || !taskTitle) {
    throw new Error("Task ID/Title cannot be blank");
  }
  return {
    id: taskId,
    title: taskTitle,
    status: TASK_DEFAULTS.status,
  };
};

export const getTaskTitle = (tasks: Task[], id: string): string | null => {
  const taskToFetch = tasks.find((task) => task.id === id);
  if (!taskToFetch) {
    return null;
  }
  return taskToFetch.title;
};

export const getAssigneeLabel = (task: Task): string => {
  if (!task.assigneeId) {
    return UNASSIGNED;
  }
  return `Assigned to ${task.assigneeId}`;
};

export const totalEstimateHours = (tasks: Task[]): number => {
  return tasks.reduce(
    (totalHours, currentTask) => totalHours + (currentTask.estimateHours ?? 0),
    0,
  );
};

export const getFirstTaskTitle = (tasks: Task[]): string | null => {
  const firstTask = tasks[0];
  if (firstTask) {
    return firstTask.title;
  }
  return null;
};
