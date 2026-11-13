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

export const getOrElse = <T, E>(result: Result<T, E>, fallback: T): T => {
  if (!result.ok) {
    return fallback;
  }
  return result.value;
};

export const mapError = <T, E, F>(
  result: Result<T, E>,
  fn: (error: E) => F,
): Result<T, F> => {
  if (!result.ok) {
    return err(fn(result.error));
  }
  return result;
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

export const parseAll = <T, E>(
  inputs: readonly string[],
  parse: (input: string) => Result<T, E>,
): Result<T[], E> => {
  const arr: T[] = [];
  for (const input of inputs) {
    const result = parse(input);
    if (!result.ok) {
      return err(result.error);
    }
    arr.push(result.value);
  }
  return ok(arr);
};
