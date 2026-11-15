import { describe, expect, it } from "vitest";
import { getByIdOrThrow } from "./collection-utils.js";
import type { Task } from "./task-utils.js";
import { NotFoundError } from "./errors.js";
import type { TaskComment } from "./task-comments.js";

describe("getByIdOrThrow", () => {
  const tasks: Task[] = [
    { id: "TS-01", status: "done", title: "Session 1" },
    { id: "TS-02", status: "in_progress", title: "Session 2" },
    { id: "TS-03", status: "todo", title: "Session 3" },
  ];
  const taskComments: TaskComment[] = [
    { id: "C-01", body: "This task is yet to be done", taskId: "TS-03" },
    { id: "C-02", body: "This task is in progress", taskId: "TS-02" },
    { id: "C-03", body: "This task has been closed", taskId: "TS-01" },
  ];
  it("finds the first item from list that matches by id", () => {
    const task: Task = getByIdOrThrow(tasks, "TS-03", "Task");
    expect(task).toEqual({
      id: "TS-03",
      status: "todo",
      title: "Session 3",
    });

    const taskComment: TaskComment = getByIdOrThrow(
      taskComments,
      "C-03",
      "Comment",
    );
    expect(taskComment).toEqual({
      id: "C-03",
      body: "This task has been closed",
      taskId: "TS-01",
    });
  });
  it("rejects with NotFoundError when unable to find the item with given id", () => {
    const getByIdOrThrowFn = () => getByIdOrThrow(tasks, "TS-06", "Task");
    expect(getByIdOrThrowFn).toThrow(NotFoundError);
    expect(getByIdOrThrowFn).toThrow(`Task TS-06 not found`);
  });
  it("rejects with NotFoundError when the list is empty", () => {
    const getByIdOrThrowFn = () => getByIdOrThrow([], "TS-01", "Task");
    expect(getByIdOrThrowFn).toThrow(NotFoundError);
    expect(getByIdOrThrowFn).toThrow(`Task TS-01 not found`);
  });
  it("rejects with NotFoundError when the list items are missing the id", () => {
    const tags = [{ label: "urgent" }];
    // @ts-expect-error: intentionally passed list with items having missing ids
    const getByIdOrThrowFn = () => getByIdOrThrow(tags, "LBL-03", "Tag");
    expect(getByIdOrThrowFn).toThrow(NotFoundError);
    expect(getByIdOrThrowFn).toThrow(`Tag LBL-03 not found`);
  });
  it("throws a NotFoundError with status 404 when item is not found in list", () => {
    expect.assertions(2);
    try {
      getByIdOrThrow(tasks, "TS-06", "Task");
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error).toMatchObject({
        statusCode: 404,
        code: "RESOURCE_NOT_FOUND",
      });
    }
  });
});
