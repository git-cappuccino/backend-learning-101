import { ValidationError } from "./errors.js";
import { err, getOrThrow, ok, Result } from "./result.js";
import { type Task } from "./task-utils.js";

interface TaskComment {
  id: string;
  taskId: Task["id"];
  body: string;
}

const COMMENT_MAX_LENGTH = 500;

export const safeParseCommentBody = (
  input: string,
): Result<string, ValidationError> => {
  const normalisedComment = input.trim();
  if (!normalisedComment) {
    return err(new ValidationError("Comment body cannot be blank"));
  }
  if (normalisedComment.length > COMMENT_MAX_LENGTH) {
    return err(
      new ValidationError("Comment body cannot exceed 500 characters"),
    );
  }
  return ok(normalisedComment);
};

export const safeParseCommentId = (
  input: string,
): Result<string, ValidationError> => {
  const normalisedCommentId = input.trim();
  if (!normalisedCommentId) {
    return err(new ValidationError("Comment ID cannot be blank"));
  }
  return ok(normalisedCommentId);
};

export const createComment = (
  task: Task,
  id: string,
  body: string,
): TaskComment => {
  const commentId = getOrThrow(safeParseCommentId(id));
  const commentBody = getOrThrow(safeParseCommentBody(body));
  return {
    id: commentId,
    body: commentBody,
    taskId: task.id,
  };
};
