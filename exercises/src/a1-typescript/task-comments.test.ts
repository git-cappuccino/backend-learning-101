import { describe, expect, it } from "vitest";
import { createComment, safeParseCommentBody } from "./task-comments.js";
import { ValidationError } from "./errors.js";
import { Task } from "./task-utils.js";

describe("safeParseCommentBody", () => {
  it("returns the ValidationError result if comment is blank", () => {
    const result = safeParseCommentBody("");
    expect(result).toEqual({
      ok: false,
      error: new ValidationError("Comment body cannot be blank"),
    });
  });
  it("returns the ValidationError result if the comment is having only whitespaces", () => {
    const result = safeParseCommentBody("  ");
    expect(result).toEqual({
      ok: false,
      error: new ValidationError("Comment body cannot be blank"),
    });
  });
  it("removes the whitespaces around the comment and returns success result", () => {
    const result = safeParseCommentBody("  This task is complete. ");
    expect(result).toEqual({
      ok: true,
      value: "This task is complete.",
    });
  });
  it("returns the ValidationError result if the comment is more than 500 characters", () => {
    const comment = "a".repeat(501);
    const result = safeParseCommentBody(comment);
    expect(result).toEqual({
      ok: false,
      error: new ValidationError("Comment body cannot exceed 500 characters"),
    });
  });
  it("returns the success result when the comment length is exactly 500 characters", () => {
    const comment = "a".repeat(500);
    const result = safeParseCommentBody(comment);
    expect(result).toEqual({
      ok: true,
      value: comment,
    });
  });
  it("returns the success result if the comment length is 500 with whitespaces removed from edges", () => {
    const validComment = "a".repeat(500);
    const commentWithSpaces = ` ${validComment} `;
    const result = safeParseCommentBody(commentWithSpaces);
    expect(result).toEqual({
      ok: true,
      value: validComment,
    });
  });
});

describe("createComment", () => {
  it("returns the TaskComment when task id, comment id and comment are valid", () => {
    const task: Task = {
      id: "TS 04",
      title: "Type Generics",
      status: "todo",
    };
    const taskComment = createComment(
      task,
      "c-01",
      "This task has to be started soon",
    );
    expect(taskComment).toEqual({
      taskId: task.id,
      id: "c-01",
      body: "This task has to be started soon",
    });
  });
});
