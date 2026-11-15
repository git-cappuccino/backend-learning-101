import { NotFoundError } from "./errors.js";

export const getByIdOrThrow = <T extends { id: string }>(
  items: readonly T[],
  id: string,
  resource: string,
): T => {
  const item = items.find((item) => item.id === id);
  if (!item) {
    throw new NotFoundError(resource, id);
  }
  return item;
};
