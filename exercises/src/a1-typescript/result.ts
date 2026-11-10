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

export const getOrThrow = <T, E>(result: Result<T, E>) => {
  if (!result.ok) {
    throw result.error;
  }
  return result.value;
};
