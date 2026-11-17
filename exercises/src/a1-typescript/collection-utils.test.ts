import { describe, expect, it } from "vitest";
import { countBy, filterBy, getByIdOrThrow } from "./collection-utils.js";
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

describe("filterBy", () => {
  const tasks: Task[] = [
    {
      id: "TS 01",
      status: "done",
      title: "Type Erasure in TS",
    },
    {
      id: "TS 02",
      status: "in_progress",
      title: "Interface in TS",
      assigneeId: "emp-03",
    },
    {
      id: "TS 03",
      status: "todo",
      title: "unknown type in TS",
    },
    {
      id: "TS 04",
      status: "todo",
      title: "satisfies in TS",
    },
    {
      id: "TS 05",
      status: "todo",
      title: "Readonly in TS",
      assigneeId: undefined,
    },
  ];
  const commentsList: TaskComment[] = [
    {
      id: "C-01",
      body: "This is a valid bug in production",
      taskId: "NODE-01",
    },
    { id: "C-02", body: "The task has been reassigned", taskId: "PS-03" },
    {
      id: "C-03",
      body: "The attached files have been deleted",
      taskId: "PS-03",
    },
    { id: "C-04", body: "Issue marked as closed", taskId: "TS-02" },
  ];
  it("filters the items from a list having a particular value of the given key", () => {
    const pendingTasks = filterBy(tasks, "status", "todo");
    expect(pendingTasks).toHaveLength(3);
    expect(pendingTasks[0]).toEqual({
      id: "TS 03",
      status: "todo",
      title: "unknown type in TS",
    });
    expect(pendingTasks[1]).toEqual({
      id: "TS 04",
      status: "todo",
      title: "satisfies in TS",
    });
    expect(pendingTasks[2]).toEqual({
      id: "TS 05",
      status: "todo",
      title: "Readonly in TS",
      assigneeId: undefined,
    });

    const emp3Tasks = filterBy(tasks, "assigneeId", "emp-03");
    expect(emp3Tasks).toHaveLength(1);
    expect(emp3Tasks[0]).toEqual({
      id: "TS 02",
      status: "in_progress",
      title: "Interface in TS",
      assigneeId: "emp-03",
    });
  });
  it("filters the items from the list with optional or missing keys", () => {
    const unAssignedTasks = filterBy(tasks, "assigneeId", undefined);
    expect(unAssignedTasks).toHaveLength(4);
    expect(unAssignedTasks[0]).toEqual({
      id: "TS 01",
      status: "done",
      title: "Type Erasure in TS",
    });

    expect(unAssignedTasks[1]).toEqual({
      id: "TS 03",
      status: "todo",
      title: "unknown type in TS",
    });

    expect(unAssignedTasks[2]).toEqual({
      id: "TS 04",
      status: "todo",
      title: "satisfies in TS",
    });
    expect(unAssignedTasks[3]).toEqual({
      id: "TS 05",
      status: "todo",
      title: "Readonly in TS",
      assigneeId: undefined,
    });
  });
  it("returns empty list when the expected value doesn't exist in any list item", () => {
    const filteredTasks = filterBy(tasks, "title", "Node Basics");
    expect(filteredTasks).toEqual([]);
  });
  it("returns empty list when the input list is empty", () => {
    const noTaskList: Task[] = [];
    const filteredList = filterBy(noTaskList, "status", "done");
    expect(filteredList).toEqual([]);
  });

  it("filters the comments of a given task", () => {
    const filteredComments = filterBy(commentsList, "taskId", "PS-03");
    expect(filteredComments).toHaveLength(2);
    expect(filteredComments[0]).toEqual({
      id: "C-02",
      body: "The task has been reassigned",
      taskId: "PS-03",
    });
    expect(filteredComments[1]).toEqual({
      id: "C-03",
      body: "The attached files have been deleted",
      taskId: "PS-03",
    });
  });
  it("does not mutate input list and instead returns a new list", () => {
    const tasksCopy = [...tasks];
    const filteredTasks = filterBy(tasks, "status", "todo");
    expect(filteredTasks).not.toBe(tasks);
    expect(tasks).toEqual(tasksCopy);
  });
  it("returns the empty list for an unknown/non-existing key in items", () => {
    // @ts-expect-error: intentionally passed an unknown key
    const filteredTasks = filterBy(tasks, "priority", "low");
    expect(filteredTasks).toEqual([]);
  });
  it("returns the empty list when the expected value is invalid", () => {
    // @ts-expect-error: intentionally passed invalid value for the key
    const filteredItems = filterBy(tasks, "status", "archived");
    expect(filteredItems).toEqual([]);
  });
});

describe("countBy", () => {
  const tasks: Task[] = [
    {
      id: "TS 01",
      status: "done",
      title: "Type Erasure in TS",
    },
    {
      id: "TS 02",
      status: "in_progress",
      title: "Interface in TS",
      assigneeId: "emp-03",
    },
    {
      id: "TS 03",
      status: "todo",
      title: "unknown type in TS",
    },
    {
      id: "TS 04",
      status: "todo",
      title: "satisfies in TS",
    },
    {
      id: "TS 05",
      status: "todo",
      title: "Readonly in TS",
      assigneeId: undefined,
    },
  ];
  it("counts tasks grouped by status", () => {
    const result = countBy(tasks, "status");
    expect([...result]).toEqual([
      ["done", 1],
      ["in_progress", 1],
      ["todo", 3],
    ]);
  });
  it("returns an empty Map when given an empty list of items", () => {
    const result = countBy([], "status");
    expect([...result]).toEqual([]);
  });
  it("doesn't mutate the input list of items", () => {
    const taskCopy = [...tasks];
    countBy(tasks, "status");
    expect(tasks).toEqual(taskCopy);
  });
  it("counts optional keys and groups missing or undefined values together", () => {
    const result = countBy(tasks, "assigneeId");
    expect([...result]).toEqual([
      [undefined, 4],
      ["emp-03", 1],
    ]);
  });
  it("returns a single entry when all items share the same key value", () => {
    const pendingTasks: Task[] = [
      {
        id: "TS 01",
        status: "todo",
        title: "unknown type in TS",
      },
      {
        id: "TS 02",
        status: "todo",
        title: "satisfies in TS",
      },
    ];
    const result = countBy(pendingTasks, "status");
    expect([...result]).toEqual([["todo", 2]]);
  });
});
