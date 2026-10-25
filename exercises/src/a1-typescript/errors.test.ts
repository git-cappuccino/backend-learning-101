import { describe, expect, it } from "vitest";
import {
  AppError,
  ConflictError,
  NotFoundError,
  toErrorResponse,
  ValidationError,
} from "./errors.js";

describe("ValidationError", () => {
  it("is instanceof ValidationError, AppError and Error", () => {
    const error = new ValidationError("invalid input");
    expect(error).instanceof(Error);
    expect(error).instanceOf(AppError);
    expect(error).instanceof(ValidationError);
  });
  it("has the correct name, statusCode and code", () => {
    const error = new ValidationError("invalid input");
    expect(error.name).toBe("ValidationError");
    expect(error.statusCode).toBe(400);
    expect(error.code).toBe("VALIDATION_FAILED");
  });
  it("persists the cause when passed", () => {
    const original = new Error("parse failed");
    const error = new ValidationError("Invalid date", { cause: original });
    expect(error.cause).toBe(original);
  });
});

describe("NotFoundError", () => {
  it("is instanceof NotFoundError, AppError and Error", () => {
    const notFoundError = new NotFoundError("Task", "42");
    expect(notFoundError).instanceof(NotFoundError);
    expect(notFoundError).instanceof(AppError);
    expect(notFoundError).instanceOf(Error);
  });
  it("has the correct name, statusCode and code", () => {
    const notFoundError = new NotFoundError("Task", "42");
    expect(notFoundError.name).toBe("NotFoundError");
    expect(notFoundError.statusCode).toBe(404);
    expect(notFoundError.code).toBe("RESOURCE_NOT_FOUND");
  });
});

describe("toErrorResponse", () => {
  it("handles a ValidationError → 400 and the full body.", () => {
    const validationError = new ValidationError("Invalid input");
    const errorResponse = toErrorResponse(validationError);
    expect(errorResponse.status).toBe(400);
    expect(errorResponse.body).toEqual({
      error: {
        code: "VALIDATION_FAILED",
        message: "Invalid input",
      },
    });
  });
  it("handles a NotFoundError → 404 and the full body", () => {
    const notFoundError = new NotFoundError("Task", "42");
    const errorResponse = toErrorResponse(notFoundError);
    expect(errorResponse.status).toBe(404);
    expect(errorResponse.body).toEqual({
      error: {
        code: "RESOURCE_NOT_FOUND",
        message: "Task 42 not found",
      },
    });
  });
  it("handles a ConflictError → 409 and the full body", () => {
    const conflictError = new ConflictError("Contract mismatch");
    const conflictErrorResponse = toErrorResponse(conflictError);
    expect(conflictErrorResponse.status).toBe(409);
    expect(conflictErrorResponse.body).toEqual({
      error: {
        code: "CONFLICT",
        message: "Contract mismatch",
      },
    });
  });
  it("with a plain Error → 500, the generic body", () => {
    const defaultError = new Error("db password is hunter2");
    const errorResponse = toErrorResponse(defaultError);
    expect(errorResponse.status).toBe(500);
    expect(errorResponse.body).toEqual({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went Wrong!",
      },
    });
  });
  it("returns a generic 500 when a string is thrown", () => {
    const stringErrorResponse = toErrorResponse("Transaction failed");
    expect(stringErrorResponse.status).toBe(500);
    expect(stringErrorResponse.body).toEqual({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went Wrong!",
      },
    });
  });
  it("returns a generic 500 when a null is thrown", () => {
    const nullErrorResponse = toErrorResponse(null);
    expect(nullErrorResponse.status).toBe(500);
    expect(nullErrorResponse.body).toEqual({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went Wrong!",
      },
    });
  });
  it("handles a look-alike plain object → 500", () => {
    const duckTypedError = {
      name: "NotFoundError",
      code: "RESOURCE_NOT_FOUND",
      statusCode: 404,
      message: "Task 42 not found",
    };
    const duckErrorResponse = toErrorResponse(duckTypedError);
    expect(duckErrorResponse.status).toBe(500);
    expect(duckErrorResponse.body).toEqual({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went Wrong!",
      },
    });
  });
});
