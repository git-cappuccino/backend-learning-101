import { describe, expect, it } from "vitest";
import {
  COMMENT_MAX_LENGTH,
  createComment,
  safeParseCommentBody,
} from "./task-comments.js";
import { ValidationError } from "./errors.js";
import { type Task } from "./task-utils.js";

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
    const comment = "a".repeat(COMMENT_MAX_LENGTH + 1);
    const result = safeParseCommentBody(comment);
    expect(result).toEqual({
      ok: false,
      error: new ValidationError("Comment body cannot exceed 500 characters"),
    });
  });
  it("returns the success result when the comment length is exactly 500 characters", () => {
    const comment = "a".repeat(COMMENT_MAX_LENGTH);
    const result = safeParseCommentBody(comment);
    expect(result).toEqual({
      ok: true,
      value: comment,
    });
  });
  it("returns the success result if the comment length is 500 with whitespaces removed from edges", () => {
    const validComment = "a".repeat(COMMENT_MAX_LENGTH);
    const commentWithSpaces = ` ${validComment} `;
    const result = safeParseCommentBody(commentWithSpaces);
    expect(result).toEqual({
      ok: true,
      value: validComment,
    });
  });
});

describe("createComment", () => {
  const task: Task = {
    id: "TS 04",
    title: "Type Generics",
    status: "todo",
  };
  it("returns the TaskComment when task id, comment id and comment are valid", () => {
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
  it("throws ValidationError when the comment id is empty string", () => {
    expect.assertions(2);
    try {
      createComment(task, "", "This task has to be started soon");
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error).toMatchObject({
        name: "ValidationError",
        statusCode: 400,
        code: "VALIDATION_FAILED",
        message: "Comment ID cannot be blank",
      });
    }
  });
  it("throws ValidationError when the comment id is only whitespace characters", () => {
    expect.assertions(2);
    try {
      createComment(task, "  ", "This task has to be started soon");
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error).toMatchObject({
        name: "ValidationError",
        statusCode: 400,
        code: "VALIDATION_FAILED",
        message: "Comment ID cannot be blank",
      });
    }
  });
  it("trims whitespace around the comment id before storing the comment", () => {
    const comment = createComment(
      task,
      " c-01 ",
      "This task has to be started soon",
    );
    expect(comment).toEqual({
      taskId: task.id,
      id: "c-01",
      body: "This task has to be started soon",
    });
  });
  it("throws ValidationError when the comment body is blank", () => {
    expect.assertions(2);
    try {
      createComment(task, "c-01", "");
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error).toMatchObject({
        name: "ValidationError",
        statusCode: 400,
        code: "VALIDATION_FAILED",
        message: "Comment body cannot be blank",
      });
    }
  });
  it("throws ValidationError when the comment body is only whitespace characters", () => {
    expect.assertions(2);
    try {
      createComment(task, "c-01", "   ");
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error).toMatchObject({
        name: "ValidationError",
        statusCode: 400,
        code: "VALIDATION_FAILED",
        message: "Comment body cannot be blank",
      });
    }
  });
  it("throws ValidationError when the comment id and comment body both are empty strings", () => {
    expect.assertions(2);
    try {
      createComment(task, "", "");
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error).toMatchObject({
        name: "ValidationError",
        statusCode: 400,
        code: "VALIDATION_FAILED",
        message: "Comment ID cannot be blank",
      });
    }
  });
  it("throws ValidationError when the comment body is more than 500 characters", () => {
    expect.assertions(2);
    try {
      const commentBody = "A".repeat(COMMENT_MAX_LENGTH + 1);
      createComment(task, "c-01", commentBody);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect(error).toMatchObject({
        name: "ValidationError",
        statusCode: 400,
        code: "VALIDATION_FAILED",
        message: `Comment body cannot exceed ${COMMENT_MAX_LENGTH} characters`,
      });
    }
  });
  it("trims whitespace around the body before storing the comment", () => {
    const validCommentBody = "This task has to be started soon";
    const comment = createComment(task, "c-01", ` ${validCommentBody} `);
    expect(comment).toEqual({
      id: "c-01",
      body: validCommentBody,
      taskId: task.id,
    });
  });
  it("creates the comment if the comment length is exactly 500 characters", () => {
    const commentBody = "A".repeat(COMMENT_MAX_LENGTH);
    const comment = createComment(task, "c-01", commentBody);
    expect(comment).toEqual({
      id: "c-01",
      body: commentBody,
      taskId: task.id,
    });
  });
});
