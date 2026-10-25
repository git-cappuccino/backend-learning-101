# PROGRESS.md

## Current learning state

- Current phase: Phase A — Language and runtime foundations
- Current module: A1 — TypeScript for backend development
- Current topic: TS-02 — Interfaces, type aliases and unions
- Overall status: In progress
- Last verified checkpoint: TS-02 checkpoint 1 and Exercise 2 (2026-10-25). Last verified topic: TS-01 (2026-10-22).
- Next action: TS-02 checkpoint 2 (union types in depth, starting from `ErrorCode` and `TaskStatus`), then Exercise 3.

## Topic tracking

| Topic ID | Topic | Status | Evidence | Weak areas | Next action |
|---|---|---|---|---|---|
| TS-01 | Strict TypeScript and type inference | Verified | Four understanding checks answered correctly: type erasure vs runtime data; strictNullChecks on lookups and optional properties; widening and `as const`; `any` from `JSON.parse`; tsc vs Vitest. Exercise 1 (exercises/src/a1-typescript/task-utils.ts) meets all constraints, with commits 5b6d70f → 556f224 reviewed by reading the code. `npm run check` reported by the learner on 2026-10-22: typecheck clean, 13/13 tests passed. | Wording precision: an inferred `any` is not an implicit `any`. Error design: first put a throw inside a lookup and proposed try/catch at every call site (corrected). | Revisit error handling with custom error classes in TS-02/TS-03 |
| TEST-01 | Unit testing basics (Vitest) | Practiced | Session 1: 12 tests across 5 functions, including unhappy paths; `toBe`, `toEqual`, `toBeNull` and `toThrow` used correctly (`toThrow` with a wrapped call). Session 2: `toThrow(Class)` combined with a message check; one scenario per test; `toBe` identity check on `cause`; added an untested-behaviour test (trimming) on own initiative; explained which bug each `toErrorResponse` test catches. | Added trimming behaviour without a test (Session 1; tested in Session 2); one stale test name (fixed in 556f224). Assertions on test setup or input data rather than the code under test (fixed over two rounds, a834239). | Apply in every exercise; revisit in Module F1 |
| TS-02 | Interfaces, type aliases and unions | In progress | Checkpoint 1 (interface vs type alias vs class; only classes exist at runtime; custom error hierarchy; central `toErrorResponse` failing closed) assessed through four understanding checks and a reflection question (details in LEARNING_LOG.md, Session 2). Exercise 2 (`errors.ts`, `errors.test.ts`, `ValidationError` in `createTask`, `getTaskOrThrow`, stretch `ConflictError`) meets all acceptance criteria; commits e9f55d1 → cbe57d6 → a834239 reviewed by reading the code; reviewer type-checked the source files with TS 6.0.3 and ran a runtime probe. `npm run check` reported passed by the learner for e9f55d1; not re-reported for the two follow-up commits. Checkpoint 2 (unions in depth) and Exercise 3 not started. | Thought missing fields would crash a duck-typed handler (actually a silently broken contract; `throw null` is what crashes). Used `in` on an array as a value check (it checks keys; follow-up check answered correctly). Left public types unexported (fixed). | Checkpoint 2: union types in depth |
| NODE-01 | Node.js architecture and browser differences | Not started | Not assessed | Not assessed | Start after TS-08 (A1 complete) |

Continue adding topics using the IDs in backend-curriculum.md.

## Project milestones

| Milestone | Status | Evidence |
|---|---|---|
| Initial TypeScript exercises with unit tests | In progress | Exercise 1: task-utils (commit 556f224). Exercise 2: typed errors (commit a834239) |
| Minimal Node.js HTTP server | Not started | None |
| Express API (Modules A3 and B1) | Not started | None |
| First NestJS API | Not started | None |
| PostgreSQL integration | Not started | None |
| Authentication and authorization | Not started | None |
| Automated tests and CI/CD | Not started | None |
| AWS deployment (Module F3) | Not started | None |
| AI feature in the capstone (Module G4) | Not started | None |

Do not infer completion from this initial setup. Update the tracker using evidence from actual learning and implementation.