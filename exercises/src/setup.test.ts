import { describe, it, expect } from "vitest";

describe("test setup", () => {
  it("runs TypeScript tests", () => {
    const total: number = [1, 2, 3].reduce((sum, n) => sum + n, 0);
    expect(total).toBe(6);
  });
});
