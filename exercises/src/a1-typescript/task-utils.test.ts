import { describe, expect, it } from "vitest";
import {
  changeStatus,
  createTask,
  getAssigneeLabel,
  getFirstTaskTitle,
  getTaskOrThrow,
  getTaskTitle,
  parseStatus,
  type Task,
  TASK_STATUSES,
  totalEstimateHours,
} from "./task-utils.js";
import { ConflictError, NotFoundError, ValidationError } from "./errors.js";

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
  it("throws for empty task ID when both id and title are empty", () => {
    expect(() => createTask("", "")).toThrow(ValidationError);
    expect(() => createTask("", "")).toThrow("Task ID cannot be blank");
  });
  it("throws for empty task ID", () => {
    expect(() => createTask("", "Valid title")).toThrow(ValidationError);
    expect(() => createTask("", "Valid title")).toThrow(
      "Task ID cannot be blank",
    );
  });
  it("trims the inputs before processing", () => {
    const taskFnWhiteSpaceId = () => createTask(" ", "Valid title");
    expect(taskFnWhiteSpaceId).toThrow(ValidationError);
    expect(taskFnWhiteSpaceId).toThrow("Task ID cannot be blank");

    const taskFnWhiteSpaceTitle = () => createTask("TS-01", "  ");
    expect(taskFnWhiteSpaceTitle).toThrow(ValidationError);
    expect(taskFnWhiteSpaceTitle).toThrow("Task title cannot be blank");

    const taskTS01 = createTask(" TS-01 ", " Learn TS fundamentals   ");
    expect(taskTS01).toEqual({
      id: "TS-01",
      title: "Learn TS fundamentals",
      status: "todo",
    });
  });
  it("throws for an empty task title", () => {
    expect(() => createTask("valid id", "")).toThrow(ValidationError);
    expect(() => createTask("valid id", "")).toThrow(
      "Task title cannot be blank",
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
  it("returns null for an empty task ID", () => {
    expect(getTaskTitle(tasks, "")).toBeNull();
  });
});

describe("getTaskOrThrow", () => {
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
  it("throws when the id doesn't match any task", () => {
    const taskFn = () => getTaskOrThrow(tasks, "PG-01");
    expect(taskFn).toThrow(NotFoundError);
    expect(taskFn).toThrow("Task PG-01 not found");
  });
  it("returns the task when the id matches", () => {
    const task02 = getTaskOrThrow(tasks, "TS-02");
    expect(task02).toEqual({
      id: "TS-02",
      status: "todo",
      title: "Chapter 02 for interfaces",
    });
  });
});

describe("getAssigneeLabel", () => {
  it("returns Unassigned when task doesn't have one", () => {
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

describe("parseStatus", () => {
  it("throws for empty strings", () => {
    const parseStatusFn = () => parseStatus("");
    expect(parseStatusFn).toThrow(
      `Invalid status "". Allowed: todo, in_progress, done`,
    );
  });
  it("throws for whitespaces", () => {
    const parseStatusFn = () => parseStatus("  ");
    expect(parseStatusFn).toThrow(
      `Invalid status "  ". Allowed: todo, in_progress, done`,
    );
  });
  it("throws for case insensitive input", () => {
    const parseStatusFn = () => parseStatus("Todo");
    expect(parseStatusFn).toThrow(
      `Invalid status "Todo". Allowed: todo, in_progress, done`,
    );
  });
  it("error message contains every valid status for invalid inputs", () => {
    // unknown input case is covered here
    const parseStatusFn = () => parseStatus("Invalid");
    expect(parseStatusFn).toThrow(ValidationError);
    expect(parseStatusFn).toThrow("todo");
    expect(parseStatusFn).toThrow("in_progress");
    expect(parseStatusFn).toThrow("done");
  });
  it("parses every valid status without throwing", () => {
    expect(parseStatus("todo")).toBe("todo");
    expect(parseStatus("in_progress")).toBe("in_progress");
    expect(parseStatus("done")).toBe("done");
  });
});

describe("changeStatus", () => {
  const todoTask: Task = {
    id: "TS-03",
    status: "todo",
    title: "Type guards in TS",
  };
  const inProgressTask: Task = {
    id: "TS-02",
    status: "in_progress",
    title: "Unions in depth",
  };
  const completedTask: Task = {
    id: "TS-01",
    status: "done",
    title: "interfaces and inheritance",
  };

  it("rejects changing the status of task to the same value", () => {
    let changeStatusFn = () => changeStatus(todoTask, "todo");
    expect(changeStatusFn).toThrow(ConflictError);
    expect(changeStatusFn).toThrow(`Cannot change status from todo to todo`);

    changeStatusFn = () => changeStatus(inProgressTask, "in_progress");
    expect(changeStatusFn).toThrow(ConflictError);
    expect(changeStatusFn).toThrow(
      `Cannot change status from in_progress to in_progress`,
    );
  });
  it("allows changing the status of task from todo to in_progress keeping original task unchanged", () => {
    const updatedTask = changeStatus(todoTask, "in_progress");
    expect(updatedTask.status).toBe("in_progress");
    expect(todoTask.status).toBe("todo");
  });
  it("allows changing the status of task from in_progress to todo keeping original task unchanged", () => {
    const updatedTask = changeStatus(inProgressTask, "todo");
    expect(updatedTask.status).toBe("todo");
    expect(inProgressTask.status).toBe("in_progress");
  });
  it("allows changing the status of task from in_progress to done keeping original task unchanged", () => {
    const updatedTask = changeStatus(inProgressTask, "done");
    expect(updatedTask.status).toBe("done");
    expect(inProgressTask.status).toBe("in_progress");
  });
  it("allows changing the status of task from done to todo keeping original task unchanged", () => {
    const updatedTask = changeStatus(completedTask, "todo");
    expect(updatedTask.status).toBe("todo");
    expect(completedTask.status).toBe("done");
  });
});
