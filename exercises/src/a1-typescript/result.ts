export type Result<T, E> =
  | {
      ok: true;
      value: T;
    }
  | {
      ok: false;
      error: E;
    };

export const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
export const err = <E>(error: E): Result<never, E> => ({ ok: false, error });

export const getOrThrow = <T, E>(result: Result<T, E>): T => {
  if (!result.ok) {
    throw result.error;
  }
  return result.value;
};

export const mapResult = <T, U, E>(
  result: Result<T, E>,
  fn: (value: T) => U,
): Result<U, E> => {
  if (result.ok) {
    return ok(fn(result.value));
  }
  return result;
};
