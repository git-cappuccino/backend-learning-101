# PROGRESS.md

## Current learning state

- Current phase: Phase A — Language and runtime foundations
- Current module: A1 — TypeScript for backend development
- Current topic: TS-03 — Narrowing and discriminated unions
- Overall status: In progress
- Last verified checkpoint: TS-02 checkpoint 2 and Exercise 3 (2026-10-29). Last verified topic: TS-02 (2026-10-29).
- Next action: TS-03 checkpoint 1 (narrowing and type guards, starting by replacing the `as TaskStatus` cast in `parseStatus`). Carry forward: write test expectations from the spec, not the implementation.

## Topic tracking

| Topic ID | Topic | Status | Evidence | Weak areas | Next action |
|---|---|---|---|---|---|
| TS-01 | Strict TypeScript and type inference | Verified | Four understanding checks answered correctly: type erasure vs runtime data; strictNullChecks on lookups and optional properties; widening and `as const`; `any` from `JSON.parse`; tsc vs Vitest. Exercise 1 (exercises/src/a1-typescript/task-utils.ts) meets all constraints, with commits 5b6d70f → 556f224 reviewed by reading the code. `npm run check` reported by the learner on 2026-10-22: typecheck clean, 13/13 tests passed. | Wording precision: an inferred `any` is not an implicit `any`. Error design: first put a throw inside a lookup and proposed try/catch at every call site (corrected). | Revisit error handling with custom error classes in TS-02/TS-03 |
| TEST-01 | Unit testing basics (Vitest) | Practiced | Session 1: 12 tests across 5 functions, including unhappy paths; `toBe`, `toEqual`, `toBeNull` and `toThrow` used correctly (`toThrow` with a wrapped call). Session 2: `toThrow(Class)` combined with a message check; one scenario per test; `toBe` identity check on `cause`; added an untested-behaviour test (trimming) on own initiative; explained which bug each `toErrorResponse` test catches. Session 3: `expect.assertions(2)` guarding try/catch tests; loops over `TASK_STATUSES` so new statuses are tested automatically; non-mutation tested with `toEqual(copy)` plus `not.toBe(original)`; integration tests calling the real `parseStatus`/`changeStatus` through `toErrorResponse`. | Added trimming behaviour without a test (Session 1; tested in Session 2); one stale test name (fixed in 556f224). Assertions on test setup or input data rather than the code under test (fixed over two rounds, a834239; recurred in the first Exercise 3 stretch attempt, 327715f, fixed in 7147336). Transition tests encoded the implementation rather than the spec (`done → todo` instead of `done → in_progress`); check: confirmed the expected values came from `ALLOWED_TRANSITIONS`; the spec-first test that would have failed was explained by the reviewer, not given by the learner. | Apply in every exercise; write expectations from the spec before the code; revisit in Module F1 |
| TS-02 | Interfaces, type aliases and unions | Verified | Checkpoint 1 (interface vs type alias vs class; only classes exist at runtime; custom error hierarchy; central `toErrorResponse` failing closed) assessed through four understanding checks and a reflection question (details in LEARNING_LOG.md, Session 2). Exercise 2 (`errors.ts`, `errors.test.ts`, `ValidationError` in `createTask`, `getTaskOrThrow`, stretch `ConflictError`) meets all acceptance criteria; commits e9f55d1 → cbe57d6 → a834239 reviewed by reading the code; reviewer type-checked the source files with TS 6.0.3 and ran a runtime probe. `npm run check` reported passed by the learner for e9f55d1; not re-reported for the two follow-up commits. Checkpoint 2 (literal unions, assignability and widening, single source of truth with `(typeof X)[number]`, runtime membership checks, `Record<Union, V>` exhaustiveness) assessed through two understanding checks and a runnable probe (details in LEARNING_LOG.md, Session 3). Exercise 3 (`TASK_STATUSES`, `parseStatus`, `ALLOWED_TRANSITIONS`, `changeStatus`, `blocked` status added via the compiler error, both stretch tests) meets the constraints; commits 327715f → 59b51d1 → f830ee5 → 7147336 → 6018ea3 reviewed by reading the code; reviewer type-checked the source files with TS 6.0.3. `npm run check` reported by the learner for 6018ea3 on 2026-10-29: typecheck clean, 47/47 tests passed. | Traced the wrong runtime path twice in checkpoint 2 (predicted a 500 for a 400; then misread the scenario) before running the probe. Missed the second compile error (`.includes()`) after adding `as const`. Ran the Part 3 typecheck after already editing the table. `done → todo` kept instead of the specified `done → in_progress` (learner's choice, see log). | Done; casts revisited in TS-03 |
| NODE-01 | Node.js architecture and browser differences | Not started | Not assessed | Not assessed | Start after TS-08 (A1 complete) |

Continue adding topics using the IDs in backend-curriculum.md.

## Project milestones

| Milestone | Status | Evidence |
|---|---|---|
| Initial TypeScript exercises with unit tests | In progress | Exercise 1: task-utils (commit 556f224). Exercise 2: typed errors (commit a834239). Exercise 3: status validation and transitions (commit 6018ea3) |
| Minimal Node.js HTTP server | Not started | None |
| Express API (Modules A3 and B1) | Not started | None |
| First NestJS API | Not started | None |
| PostgreSQL integration | Not started | None |
| Authentication and authorization | Not started | None |
| Automated tests and CI/CD | Not started | None |
| AWS deployment (Module F3) | Not started | None |
| AI feature in the capstone (Module G4) | Not started | None |

Do not infer completion from this initial setup. Update the tracker using evidence from actual learning and implementation.