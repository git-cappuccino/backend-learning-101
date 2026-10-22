# LEARNING_LOG.md

# Backend Engineering Learning Log

## Session history

### 2026-10-20 to 2026-10-22 — Session 1: TS-01 (with TEST-01 basics)

- Topics: TS-01 (all three checkpoints), TEST-01 introduction.
- Concepts understood:
  - Type erasure: TypeScript checks code, not runtime data.
  - What `strict` enables, plus `noUncheckedIndexedAccess`.
  - Why `!` and `as` hide bugs.
  - Inference: annotate at boundaries, infer inside.
  - Widening and `as const`, and explicit return types on exported functions.
  - How `any` from `JSON.parse` spreads through inference.
  - tsc vs Vitest as separate checks.
- Practical work: Exercise 1, task-utils (5 functions, 12 tests). Review rounds: 5b6d70f → 5571e4e → 0780b2d → 556f224.
- Review findings, all fixed:
  - A lookup threw despite declaring `string | null`.
  - A display label was stored in the data defaults (`TASK_DEFAULTS.assigneeId: "Unassigned"`).
  - A type-only import was written as a value import.
  - A test name was stale after the behaviour changed.
- Assessment: understanding checks on checkpoints 1, 2 and 3 answered correctly, with minor precision notes.
- Misconceptions:
  - Proposed try/catch at every call site to avoid 500s. Corrected: let errors propagate to a central handler, and catch only where the code can recover.
  - Did not yet explain why a plain `Error` cannot map to a 400 (it needs a typed error class).
- Not verified by the reviewer: tests were not run in the review environment, because the npm registry was unreachable there. Test result as reported by the learner on 2026-10-22: `npm run check` passed, typecheck clean, 2 test files, 13/13 tests passed.
- Next checkpoint: TS-02, checkpoint 1.

## Recording rules

For each substantive session, record:

- Date
- Topic IDs covered
- Key concepts understood
- Practical work and assessment results
- Misconceptions or mistakes
- Items requiring revision
- Decisions made
- Next checkpoint

Keep entries chronological. Do not rewrite earlier entries merely to make progress look better. Correct factual errors transparently.

## Learning decisions

Record significant curriculum or technology decisions here, including why a change was made and whether it affects future topics.

### 2026-10-18 — Sequential module order (A1 before A2)

- Decision: Complete Module A1 (TS-01 to TS-08) before starting Module A2 (NODE-01 onward).
- Reason: backend-curriculum.md §6 said "Begin with TS-01 and NODE-01", which conflicted with the module order and with PROGRESS.md ("Follow curriculum order" for NODE-01). Sequential order keeps one module in focus at a time.
- Effect: NODE-01 starts after TS-08. No topic content or statuses changed.
- Related setup change: renamed claude.md to CLAUDE.md so Claude Code loads it on case-sensitive filesystems.

### 2026-10-18 — Teaching rules aligned with the Project instructions

- Decision: Keep the long Claude Project instructions (always in context) and make backend-learning.md match them exactly.
- Changes to backend-learning.md: adopted the 10-step explanation structure; unified the checkpoint format (Covered / Remaining / Next / Understanding check); mapped "Explained" to the In progress status; added the rule to commit and push record updates only after approval; added a rule to keep both sources in sync and flag conflicts.
- Effect: No curriculum, topic or status changes.

### 2026-10-20 — Curriculum additions from market review

- Evidence: Stack Overflow Developer Survey 2025 (professional developers), three full remote Node.js/TypeScript postings from October 2026, 16 remote Node.js listings in India (cutshort.io) and about 20 NestJS listings (ZipRecruiter). Small sample; treated as direction, not precise market share.
- Added Module A3 (EXP-01 to EXP-03, Express fundamentals) between the built-in HTTP server and NestJS. Express usage (20%) is well above NestJS (7%), and NestJS runs on Express by default. The Phase B CRUD project now uses Express.
- Named AWS as the cloud platform and added AWS-01 to AWS-06 to Module F3. AWS was the most used cloud (46%) and appeared in most postings that named a cloud.
- Moved unit-testing basics (TEST-01) into Module A1 so every exercise includes tests from the start; Module F1 revisits it.
- Added Module G4 (LLM-01 to LLM-05): LLM API integration in TypeScript. AI/LLM work appeared in 7 of 16 Indian listings. Python and the full applied AI curriculum stay in the later stage.
- Named Zod for runtime validation (TS-08, stack, Phase B project) and added PostgreSQL Row-Level Security to SEC-03.
- Not changed yet: the 4–5 month estimate (likely optimistic), labelling overlapping topics as revisits, optional MongoDB awareness and a job-search track.
- Effect: TS-01 remains the first topic. No statuses changed.

### 2026-10-20 — Exercise workspace, test runner and versions

- Decision: Exercise code lives in `exercises/`, one npm package in this repo. The capstone gets its own repository later.
- Decision: Vitest as the test runner. NestJS now generates new projects with Vitest by default, and Vitest runs TypeScript and ESM without ts-jest or Babel. Jest syntax will be compared when we reach mocking.
- Decision: Node.js 24 LTS (24.18.0) and TypeScript 6.0.3 (pinned exactly), not 7.0. TS 7.0 has no stable programmatic API until 7.1, and typescript-eslint support for 7.x is expected around Q1 2027. Revisit in 2027. Moving to Node 26 LTS is also deferred to a natural break.
- Setup commit: d3548ed. tsconfig: strict + noUncheckedIndexedAccess, module nodenext, noEmit. Scripts: test, test:watch, typecheck, check.
