export type ErrorCode =
  | "CONFLICT"
  | "VALIDATION_FAILED"
  | "RESOURCE_NOT_FOUND"
  | "INTERNAL_SERVER_ERROR";

export interface ErrorResponseBody {
  error: { code: ErrorCode; message: string };
}

export interface ErrorResponse {
  status: number;
  body: ErrorResponseBody;
}

export class AppError extends Error {
  readonly statusCode: number;
  readonly code: ErrorCode;

  constructor(
    statusCode: number,
    code: ErrorCode,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, options?: ErrorOptions) {
    super(400, "VALIDATION_FAILED", message, options);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id: string, options?: ErrorOptions) {
    super(404, "RESOURCE_NOT_FOUND", `${resource} ${id} not found`, options);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends AppError {
  constructor(message: string, options?: ErrorOptions) {
    super(409, "CONFLICT", message, options);
    this.name = "ConflictError";
  }
}

export const toErrorResponse = (err: unknown): ErrorResponse => {
  if (err instanceof AppError) {
    return {
      status: err.statusCode,
      body: {
        error: {
          code: err.code,
          message: err.message,
        },
      },
    };
  }
  // fail closed
  return {
    status: 500,
    body: {
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went Wrong!",
      },
    },
  };
};
