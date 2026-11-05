import { describe, expect, it } from "vitest";
import { applyCommand, TaskCommand } from "./task-commands.js";
import { Task } from "./task-utils.js";
import { ConflictError, ValidationError } from "./errors.js";

describe("applyCommand", () => {
  describe("while renaming the task", () => {
    const dummyTask: Task = {
      id: "TS-03",
      status: "todo",
      title: "Discriminated Unions",
    };
    it("rejects the empty title", () => {
      const renameTask: TaskCommand = { type: "rename", title: "" };
      const applyCommandFn = () => applyCommand(dummyTask, renameTask);
      expect(applyCommandFn).toThrow(ValidationError);
      expect(applyCommandFn).toThrow("Task title cannot be blank");
    });
    it("rejects the title if it has only whitespaces and no characters", () => {
      const renameTask: TaskCommand = {
        type: "rename",
        title: " ",
      };
      const applyCommandFn = () => applyCommand(dummyTask, renameTask);
      expect(applyCommandFn).toThrow(ValidationError);
      expect(applyCommandFn).toThrow("Task title cannot be blank");
    });
    it("handles the blank spaces around the title", () => {
      const renameTask: TaskCommand = {
        type: "rename",
        title: "  Discriminated Unions and Type Exhausting   ",
      };
      const renamedTask = applyCommand(dummyTask, renameTask);
      expect(renamedTask.title).toBe(
        "Discriminated Unions and Type Exhausting",
      );
    });
    it("applies the new title to the task", () => {
      const renameTask: TaskCommand = {
        type: "rename",
        title: "Type Exhausting using switch and never",
      };
      const renamedTask = applyCommand(dummyTask, renameTask);
      expect(renamedTask.title).toBe("Type Exhausting using switch and never");
    });
    it("returns a new task and prevents modifying the original task", () => {
      const renameTask: TaskCommand = {
        type: "rename",
        title: "Discriminated Unions advanced",
      };
      const dummyTaskCopy = { ...dummyTask };
      const renamedTask = applyCommand(dummyTask, renameTask);
      expect(renamedTask).not.toBe(dummyTask); // new task is different from the original task
      expect(dummyTask).toEqual(dummyTaskCopy); // no mutation in original task
    });
  });
  describe("while assigning the Id", () => {
    const dummyTask: Task = {
      id: "TS-03",
      status: "todo",
      title: "Discriminated Unions",
    };
    it("rejects the empty assignee id", () => {
      const assignTask: TaskCommand = { type: "assign", assigneeId: "" };
      const applyCommandFn = () => applyCommand(dummyTask, assignTask);
      expect(applyCommandFn).toThrow(ValidationError);
      expect(applyCommandFn).toThrow("Assignee ID cannot be blank");
    });
    it("rejects the assignee id if it is only whitesaces and no characters", () => {
      const assignTask: TaskCommand = { type: "assign", assigneeId: "  " };
      const applyCommandFn = () => applyCommand(dummyTask, assignTask);
      expect(applyCommandFn).toThrow(ValidationError);
      expect(applyCommandFn).toThrow("Assignee ID cannot be blank");
    });
    it("handles the blank spaces around the assignee id", () => {
      const assignTask: TaskCommand = { type: "assign", assigneeId: " Josh  " };
      const assignedTask = applyCommand(dummyTask, assignTask);
      expect(assignedTask.assigneeId).toBe("Josh");
    });
    it("assigns the assignee id to the task if it doesn't exist", () => {
      const assignTask: TaskCommand = { type: "assign", assigneeId: "Josh" };
      const assignedTask = applyCommand(dummyTask, assignTask);
      expect(assignedTask.assigneeId).toBe("Josh");
    });
    it("it changes the assignee id of a task if present already", () => {
      const existingTask: Task = {
        ...dummyTask,
        assigneeId: "Josh",
      };
      const assignTask: TaskCommand = { type: "assign", assigneeId: "Drake" };
      const assignedTask = applyCommand(existingTask, assignTask);
      expect(assignedTask.assigneeId).toBe("Drake");
    });
    it("returns a new task and prevents modifying the original task", () => {
      const dummyTaskCopy: Task = { ...dummyTask };
      const assignTask: TaskCommand = { type: "assign", assigneeId: "Alice" };
      const assignedTask = applyCommand(dummyTask, assignTask);
      expect(assignedTask).not.toBe(dummyTask);
      expect(dummyTask).toEqual(dummyTaskCopy);
    });
  });
  describe("while unassigning the task", () => {
    const assignedDummyTask: Task = {
      id: "TS-03",
      status: "todo",
      title: "Discriminated Unions",
      assigneeId: "Drake",
    };
    it("removes the assignee id from the task if present", () => {
      const unassignTask: TaskCommand = { type: "unassign" };
      const unassignedTask = applyCommand(assignedDummyTask, unassignTask);
      expect(unassignedTask).not.toHaveProperty("assigneeId");
    });
    it("returns a new task and prevents modifying the original task", () => {
      const assignedDummyTaskCopy: Task = { ...assignedDummyTask };
      const unassignTask: TaskCommand = { type: "unassign" };
      const unassignedTask = applyCommand(assignedDummyTask, unassignTask);
      expect(unassignedTask).not.toBe(assignedDummyTask);
      expect(assignedDummyTask).toEqual(assignedDummyTaskCopy);
    });
  });
  describe("while changing status of task", () => {
    const dummyTodoTask: Task = {
      id: "TS-03",
      status: "todo",
      title: "Discriminated Unions",
    };
    it("rejects if the new status is conflicted", () => {
      const changeStatus: TaskCommand = { type: "change_status", to: "done" };
      const applyCommandFn = () => applyCommand(dummyTodoTask, changeStatus);
      expect(applyCommandFn).toThrow(ConflictError);
      expect(applyCommandFn).toThrow("Cannot change status from todo to done");
    });
    it("updates the new status if the transition is allowed", () => {
      const changeStatus: TaskCommand = {
        type: "change_status",
        to: "in_progress",
      };
      const updatedTask = applyCommand(dummyTodoTask, changeStatus);
      expect(updatedTask.status).toBe("in_progress");
    });
    it("returns a new task and prevents modifying the original task", () => {
      const dummyTodoTaskCopy: Task = { ...dummyTodoTask };
      const changeStatus: TaskCommand = {
        type: "change_status",
        to: "blocked",
      };
      const updatedTask = applyCommand(dummyTodoTask, changeStatus);
      expect(updatedTask).not.toBe(dummyTodoTask);
      expect(dummyTodoTask).toEqual(dummyTodoTaskCopy);
    });
  });
  it("rejects if the command is invalid", () => {
    const dummyTodoTask: Task = {
      id: "TS-03",
      status: "todo",
      title: "Discriminated Unions",
    };
    // @ts-expect-error: invalid command
    const invalidCommand: TaskCommand = { type: "remove_task" };
    const applyCommandFn = () => applyCommand(dummyTodoTask, invalidCommand);
    expect(applyCommandFn).toThrow(Error);
    // expect(applyCommandFn).toThrow(`Unhandled variant: {"type":"remove_task"}`)
    expect(applyCommandFn).toThrow(
      `Unhandled variant: ${JSON.stringify(invalidCommand)}`,
    );
  });
});
