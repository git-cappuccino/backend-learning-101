import { describe, expect, it, vi } from "vitest";
import {
  ALLOWED_TRANSITIONS,
  safeParseStatus,
  TaskStatus,
} from "./task-utils.js";
import { ValidationError } from "./errors.js";
import { err, getOrThrow, mapResult, ok, Result } from "./result.js";
import { TaskCommand } from "./task-commands.js";

describe("ok", () => {
  it("returns the input value wrapped in an object with ok as true", () => {
    const input: TaskStatus = "todo";
    const wrappedObject = ok(input);
    expect(wrappedObject).toEqual({
      ok: true,
      value: "todo",
    });
  });
  it("returns the same input instance in wrapped object", () => {
    expect.assertions(1);
    const taskCommand: TaskCommand = {
      type: "rename",
      title: "TS 04 in Module A0",
    };
    const wrappedObject = ok(taskCommand);
    if (wrappedObject.ok) {
      expect(wrappedObject.value).toBe(taskCommand);
    }
  });
});

describe("err", () => {
  it("returns the error wrapped in an object with ok as false", () => {
    const error = new ValidationError("Task title cannot be blank");
    const wrappedObject = err(error);
    expect(wrappedObject).toEqual({
      ok: false,
      error,
    });
  });
  it("preserves the same error instance as output", () => {
    expect.assertions(1);
    const error = new ValidationError("Task title cannot be blank");
    const wrappedObject = err(error);
    if (!wrappedObject.ok) {
      expect(wrappedObject.error).toBe(error);
    }
  });
});

describe("getOrThrow", () => {
  it("returns the value on success result", () => {
    const result: Result<TaskStatus, never> = {
      ok: true,
      value: "in_progress",
    };
    const value = getOrThrow(result);
    expect(value).toBe("in_progress");
  });
  it("throws with error on failed result", () => {
    const result: Result<never, ValidationError> = {
      ok: false,
      error: new ValidationError("Title cannot be blank"),
    };
    const getOrThrowFn = () => getOrThrow(result);
    expect(getOrThrowFn).toThrow(ValidationError);
    expect(getOrThrowFn).toThrow("Title cannot be blank");
  });
  it("throws with same error instance on failed result", () => {
    expect.assertions(1);
    const result: Result<never, ValidationError> = {
      ok: false,
      error: new ValidationError("Title cannot be blank"),
    };

    try {
      getOrThrow(result);
    } catch (error) {
      expect(error).toBe(result.error);
    }
  });
});

describe("mapResult", () => {
  it("maps the function's output to the success result", () => {
    const parseResult = safeParseStatus("todo");
    const mappedResult = mapResult(
      parseResult,
      (status) => ALLOWED_TRANSITIONS[status],
    );
    expect(mappedResult).toEqual({
      ok: true,
      value: ["in_progress", "blocked"],
    });
  });
  it("doesn't modify the input result object and return the new object on success", () => {
    const parseResult = safeParseStatus("blocked");
    const parseResultCopy = { ...parseResult };
    const mappedResult = mapResult(
      parseResult,
      (status) => ALLOWED_TRANSITIONS[status],
    );
    expect(mappedResult).not.toBe(parseResult);
    expect(parseResult).toEqual(parseResultCopy);
  });
  it("returns the same error result on failure", () => {
    const parseResult = safeParseStatus("archived");
    const mappedResult = mapResult(
      parseResult,
      (status) => ALLOWED_TRANSITIONS[status],
    );
    expect(mappedResult).toEqual({
      ok: false,
      error: new ValidationError(
        `Invalid status "archived". Allowed: todo, in_progress, done, blocked`,
      ),
    });
  });
  it("returns the same object on failure without modifying it", () => {
    const parseResult = safeParseStatus("archived");
    const parseResultCopy = { ...parseResult };
    const mappedResult = mapResult(
      parseResult,
      (status) => ALLOWED_TRANSITIONS[status],
    );
    expect(mappedResult).toBe(parseResult);
    expect(parseResult).toEqual(parseResultCopy);
  });
  it("doesn't invoke the passed function on failure", () => {
    const mockFn = vi.fn();
    const parseResult = safeParseStatus("archived");
    mapResult(parseResult, mockFn);
    expect(mockFn).not.toHaveBeenCalled();
  });
});
