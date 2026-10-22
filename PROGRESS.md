# PROGRESS.md

## Current learning state

- Current phase: Phase A — Language and runtime foundations
- Current module: A1 — TypeScript for backend development
- Current topic: TS-02 — Interfaces, type aliases and unions
- Overall status: In progress
- Last verified checkpoint: TS-01 (2026-10-22)
- Next action: Begin TS-02, checkpoint 1. Use custom error classes as a worked example.

## Topic tracking

| Topic ID | Topic | Status | Evidence | Weak areas | Next action |
|---|---|---|---|---|---|
| TS-01 | Strict TypeScript and type inference | Verified | Four understanding checks answered correctly: type erasure vs runtime data; strictNullChecks on lookups and optional properties; widening and `as const`; `any` from `JSON.parse`; tsc vs Vitest. Exercise 1 (exercises/src/a1-typescript/task-utils.ts) meets all constraints, with commits 5b6d70f → 556f224 reviewed by reading the code. `npm run check` reported by the learner on 2026-10-22: typecheck clean, 13/13 tests passed. | Wording precision: an inferred `any` is not an implicit `any`. Error design: first put a throw inside a lookup and proposed try/catch at every call site (corrected). | Revisit error handling with custom error classes in TS-02/TS-03 |
| TEST-01 | Unit testing basics (Vitest) | Practiced | 12 tests across 5 functions, including unhappy paths; `toBe`, `toEqual`, `toBeNull` and `toThrow` used correctly (`toThrow` with a wrapped call). | Added trimming behaviour without a test; one stale test name (fixed in 556f224). | Apply in every exercise; revisit in Module F1 |
| TS-02 | Interfaces, type aliases and unions | Not started | Not assessed | Not assessed | Begin lesson |
| NODE-01 | Node.js architecture and browser differences | Not started | Not assessed | Not assessed | Start after TS-08 (A1 complete) |

Continue adding topics using the IDs in backend-curriculum.md.

## Project milestones

| Milestone | Status | Evidence |
|---|---|---|
| Initial TypeScript exercises with unit tests | In progress | Exercise 1: task-utils (commit 556f224) |
| Minimal Node.js HTTP server | Not started | None |
| Express API (Modules A3 and B1) | Not started | None |
| First NestJS API | Not started | None |
| PostgreSQL integration | Not started | None |
| Authentication and authorization | Not started | None |
| Automated tests and CI/CD | Not started | None |
| AWS deployment (Module F3) | Not started | None |
| AI feature in the capstone (Module G4) | Not started | None |

Do not infer completion from this initial setup. Update the tracker using evidence from actual learning and implementation.