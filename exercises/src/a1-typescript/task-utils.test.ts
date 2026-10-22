import { describe, expect, it } from "vitest";
import {
  createTask,
  getAssigneeLabel,
  getFirstTaskTitle,
  getTaskTitle,
  type Task,
  totalEstimateHours,
} from "./task-utils.js";

describe("createTask", () => {
  it("returns a task when id and title are present", () => {
    // arrange
    const taskId = "T-01";
    const taskTitle = "Learn TS fundamentals";
    // act
    const task = createTask(taskId, taskTitle);
    // assert
    expect(task).toEqual({
      id: taskId,
      title: taskTitle,
      status: "todo",
    });
  });
  it("throws for empty task ID", () => {
    expect(() => createTask("", "valid title")).toThrow(
      "Task ID/Title cannot be blank",
    );
  });
  it("throws for an empty task title", () => {
    expect(() => createTask("valid id", "")).toThrow(
      "Task ID/Title cannot be blank",
    );
  });
});

describe("getTaskTitle", () => {
  const tasks: Task[] = [
    {
      id: "TS-01",
      status: "in_progress",
      title: "Learn chapter 01 in TS",
    },
    {
      id: "TS-02",
      status: "todo",
      title: "Chapter 02 for interfaces",
    },
    {
      id: "NS-01",
      status: "todo",
      title: "Node JS by Claude",
    },
  ];
  it("finds the title of task from the list", () => {
    // arrange
    const taskId = "TS-02";
    // act
    const task = getTaskTitle(tasks, taskId);
    // assert
    expect(task).toBe("Chapter 02 for interfaces");
  });
  it("returns null for the non matching task ID", () => {
    const taskId = "PG-03";
    const task = getTaskTitle(tasks, taskId);
    expect(task).toBeNull();
  });
  it("throws for empty task ID", () => {
    expect(() => getTaskTitle(tasks, "")).toThrow(
      "task ID should be a valid string",
    );
  });
});

describe("getAssigneeLabel", () => {
  it("returns default Assignee ID when task doesn't have one", () => {
    const task: Task = {
      id: "TS-01",
      status: "in_progress",
      title: "Learn chapter 01 in TS",
    };
    const assignee = getAssigneeLabel(task);
    expect(assignee).toBe("Unassigned");
  });
  it("returns the actual assignee from the task which has one present", () => {
    const task: Task = {
      id: "TS-02",
      status: "todo",
      title: "Chapter 02 for interfaces",
      assigneeId: "Jane",
    };
    const assignee = getAssigneeLabel(task);
    expect(assignee).toBe(`Assigned to Jane`);
  });
});

describe("totalEstimateHours", () => {
  it("aggregates the estimated hours of tasks", () => {
    const tasks: Task[] = [
      {
        id: "TS-01",
        status: "in_progress",
        title: "Learn chapter 01 in TS",
        estimateHours: 10,
      },
      {
        id: "TS-02",
        status: "todo",
        title: "Chapter 02 for interfaces",
      },
      {
        id: "NS-01",
        status: "todo",
        title: "Node JS by Claude",
        estimateHours: 20,
      },
    ];

    const totalHours = totalEstimateHours(tasks);
    expect(totalHours).toBe(30);
  });
  it("returns the total hours as 0 for empty task list", () => {
    const tasks: Task[] = [];
    const totalHours = totalEstimateHours(tasks);
    expect(totalHours).toBe(0);
  });
});

describe("getFirstTaskTitle", () => {
  it("returns null if the task list is empty", () => {
    const tasks: Task[] = [];
    const firstTitle = getFirstTaskTitle(tasks);
    expect(firstTitle).toBeNull();
  });
  it("returns the title of the first task from the list", () => {
    const tasks: Task[] = [
      {
        id: "TS-01",
        status: "in_progress",
        title: "Learn chapter 01 in TS",
      },
      {
        id: "TS-02",
        status: "todo",
        title: "Chapter 02 for interfaces",
      },
      {
        id: "NS-01",
        status: "todo",
        title: "Node JS by Claude",
      },
    ];
    const firstTaskTitle = getFirstTaskTitle(tasks);
    expect(firstTaskTitle).toBe("Learn chapter 01 in TS");
  });
});
