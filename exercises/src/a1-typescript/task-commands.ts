import { assertNever } from "./assert-never.js";
import { ValidationError } from "./errors.js";
import { changeStatus, Task, TaskStatus } from "./task-utils.js";

export type TaskCommand =
  | { type: "rename"; title: string }
  | { type: "assign"; assigneeId: string }
  | { type: "unassign" }
  | { type: "change_status"; to: TaskStatus }
  | { type: "estimate"; hours: number };

/**
 * Applies a single command to a task and returns the updated task.
 *
 * The input task is never mutated; every successful command returns a new object.
 *
 * - `rename`: trims `title` and sets it as the task title.
 * - `assign`: trims `assigneeId` and sets it, replacing any existing assignee.
 * - `unassign`: returns the task without an `assigneeId` key (the key is absent, not `undefined`).
 * - `change_status`: delegates to {@link changeStatus}, so its allowed-transition rules apply.
 * - `estimate`: sets `estimateHours`; `hours` must be a finite number greater than 0.
 *
 * @param task - The current task. Not modified.
 * @param command - The command to apply.
 * @returns A new task with the command applied.
 * @throws {ValidationError} (400) If the title or assignee ID is blank after trimming,
 *   or if `hours` is not a finite number greater than 0.
 * @throws {ConflictError} (409) If `change_status` requests a transition that is not allowed.
 * @throws {Error} If a command with an unrecognised `type` reaches it at runtime.
 */
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

    case "estimate": {
      const estimateHours = command.hours;
      const isValid = Number.isFinite(estimateHours) && estimateHours > 0;
      if (!isValid) {
        throw new ValidationError("Estimate must be a positive number");
      }
      return {
        ...task,
        estimateHours,
      };
    }

    default:
      return assertNever(command);
  }
};
