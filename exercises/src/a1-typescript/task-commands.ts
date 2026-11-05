import { assertNever } from "./assert-never.js";
import { ValidationError } from "./errors.js";
import { changeStatus, Task, TaskStatus } from "./task-utils.js";

export type TaskCommand =
  | { type: "rename"; title: string }
  | { type: "assign"; assigneeId: string }
  | { type: "unassign" }
  | { type: "change_status"; to: TaskStatus };

export const applyCommand = (task: Task, command: TaskCommand): Task => {
  switch (command.type) {
    case "rename": {
      const newTitle = command.title.trim();
      if (!newTitle) {
        throw new ValidationError("Task title cannot be blank");
      }
      return { ...task, title: newTitle };
    }

    case "assign": {
      const newAssigneeId = command.assigneeId.trim();
      if (!newAssigneeId) {
        throw new ValidationError("Assignee ID cannot be blank");
      }
      return { ...task, assigneeId: newAssigneeId };
    }

    case "unassign": {
      const { assigneeId, ...rest } = task;
      return rest;
    }

    case "change_status": {
      return changeStatus(task, command.to);
    }

    default:
      return assertNever(command);
  }
};
