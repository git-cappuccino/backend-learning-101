import { ConflictError, NotFoundError, ValidationError } from "./errors.js";

export const TASK_STATUSES = ["todo", "in_progress", "done", "blocked"] as const;
export type TaskStatus = (typeof TASK_STATUSES)[number];
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

export const ALLOWED_TRANSITIONS: Record<TaskStatus, readonly TaskStatus[]> = {
  todo: ["in_progress", "blocked"],
  blocked: ["in_progress"],
  in_progress: ["todo", "done"],
  done: ["todo"], // reopen
};

export const changeStatus = (task: Task, next: TaskStatus): Task => {
  const existingStatus = task.status;
  const canTransition = ALLOWED_TRANSITIONS[existingStatus].includes(next);
  if (!canTransition) {
    throw new ConflictError(
      `Cannot change status from ${existingStatus} to ${next}`,
    );
  }
  const newTask = { ...task };
  newTask.status = next;
  return newTask;
};

export const parseStatus = (input: string): TaskStatus => {
  if (!(TASK_STATUSES as readonly string[]).includes(input)) {
    throw new ValidationError(
      `Invalid status "${input}". Allowed: ${TASK_STATUSES.join(", ")}`,
    );
  }
  // TODO(TS-03): replace with a type guard
  return input as TaskStatus;
};

export const createTask = (id: string, title: string): Task => {
  const taskId = id.trim();
  const taskTitle = title.trim();
  if (!taskId) {
    throw new ValidationError("Task ID cannot be blank");
  }
  if (!taskTitle) {
    throw new ValidationError("Task title cannot be blank");
  }
  return {
    id: taskId,
    title: taskTitle,
    status: TASK_DEFAULTS.status,
  };
};

export const getTaskOrThrow = (tasks: Task[], id: string): Task => {
  const taskToFetch = tasks.find((task) => task.id === id);
  if (!taskToFetch) {
    throw new NotFoundError("Task", id);
  }
  return taskToFetch;
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
