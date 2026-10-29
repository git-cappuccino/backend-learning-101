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

### 2026-10-23 to 2026-10-25 — Session 2: TS-02 checkpoint 1 (with TEST-01 practice)

- Topics: TS-02 checkpoint 1, TEST-01 practice.
- Concepts understood:
  - Interface vs type alias vs class. Only a class exists at runtime and can be checked with `instanceof`.
  - `extends` reports conflicts where they are made, while `&` can silently produce `never`. Declaration merging. Convention: `interface` for object shapes, `type` for everything else.
  - Custom error hierarchy (`AppError` → `ValidationError`, `NotFoundError`, `ConflictError`) with `name`, `cause`, `statusCode` and a stable `code`.
  - A central `toErrorResponse(err: unknown)` that classifies only with `instanceof AppError` and fails closed with a generic 500.
  - `as` turns off checking. Class types are structural at compile time, but `instanceof` checks how an object was constructed.
  - Return `null` when absence is a normal result; throw when the operation cannot continue. An empty collection is 200 with `[]`, while a missing single resource is 404. Next.js `notFound()` uses the same throw pattern.
  - `in` checks property keys, not array values.
- Practical work: Exercise 2, typed errors. Review rounds: e9f55d1 → cbe57d6 → a834239.
- Review findings, all fixed:
  - Assertions that could never fail (on the handler's response object and on test input data), plus duplicated hierarchy assertions.
  - Public types (`ErrorCode`, `ErrorResponse`, `ErrorResponseBody`) were not exported.
  - `I` prefix on interfaces, inconsistent with `Task`.
  - The `cause` test used a string instead of an `Error`.
- Assessment:
  - Check 1 (teammate's duck-typed `HttpError` handler): part (a) mostly correct; part (b) gave a valid status/code pairing point instead of the intended false-positive case, which was explained with a Stripe 401 example.
  - Check 2 (plain object thrown, `instanceof` handler): all three parts correct.
  - Reflection on `getTaskTitle` vs `getTaskOrThrow`: correct.
  - Check 3 (which bug each `toErrorResponse` test catches): part 2 correct; part 1's example would neither compile nor be caught.
  - Check 4 (predicting `in` results): all correct.
- Misconceptions:
  - Claimed a duck-typed handler would crash on missing fields. Corrected: it produces a silently broken contract; only `throw null` crashes the handler.
  - Used `err.code in [...]` as a value-membership check. Corrected: `in` checks keys, `.includes()` checks values, and `unknown` blocks the property access anyway.
- Self-initiated improvements: added a trimming test and fixed a stale `getAssigneeLabel` test name without being asked.
- Deferred by design: putting `statusCode` on domain errors couples the domain to HTTP. Revisit in ARCH-04 (domain logic versus transport logic). Server-side logging of unknown errors is deferred to ARCH-08.
- Not verified by the reviewer: Vitest was not run in the review environment (Node 22, and the dependency install failed). The reviewer type-checked `errors.ts` and `task-utils.ts` with TypeScript 6.0.3 and ran a runtime probe of `createTask`, `getTaskOrThrow` and `toErrorResponse`. Learner reported `npm run check` passed for e9f55d1; it was not re-reported for cbe57d6 or a834239.
- Next checkpoint: TS-02, checkpoint 2 (union types in depth).

### 2026-10-26 to 2026-10-29 — Session 3: TS-02 checkpoint 2 and Exercise 3 (with TEST-01 practice)

- Topics: TS-02 checkpoint 2 (TS-02 now Verified), TEST-01 practice.
- Concepts understood:
  - A type is a set of values; a literal union is a closed set. Assignability goes subset → superset, and a widened `string` is not assignable to a literal union.
  - Only members common to every union member are usable without narrowing.
  - Unions are erased at runtime. Write the list once as an `as const` array and derive the type with `(typeof X)[number]`, so the type, validation and error messages cannot drift apart.
  - `in` checks keys; `.includes()` on a readonly tuple rejects a plain `string`; widening with `as readonly string[]` is the safe direction of `as`, while `input as TaskStatus` is a claim the compiler cannot check.
  - `Record<Union, V>` forces every key to be present (missing and extra keys both fail) but cannot check that the values are correct; business rules need tests.
  - Type errors do not stop Node or Vitest from running the code; only `tsc` enforces types.
- Practical work: Exercise 3, task status as a single source of truth. Commits 327715f (Parts 1–2) → 59b51d1 (`blocked` added) → f830ee5 → 7147336 → 6018ea3.
- Review findings:
  - Fixed: the first stretch attempt (327715f) built errors by hand and re-tested `toErrorResponse`; 7147336 calls the real `parseStatus` and `changeStatus`. The valid-status test now loops over `TASK_STATUSES`. `changeStatus` uses `{ ...task, status: next }`.
  - Not fixed by choice: `done → todo` instead of the specified `done → in_progress`; tests encode the implementation. The 400 response test still hardcodes the allowed-status list. No rejection tests involve `blocked` or `done`.
- Assessment:
  - Checkpoint 2 check (teammate's `parseStatus` PR): part 1 correct; part 2 diagnosis correct (two drifting sources of truth) but predicted a 500 where the code returns a 400 `VALIDATION_FAILED`; part 3 correct, including the `readonly string[]` fix.
  - Follow-up check (reverse drift): step 1 correct; steps 2–3 wrong because the scenario was misread (assumed a `blocked` label existed). After running a probe: correctly identified the divergence and the two lines that derive the type, and predicted the TS2741 error; missed the second error on `.includes()`.
  - Exercise 3 question: correctly explained that `Record` forces keys but not values, and that tests must catch missing transitions.
  - TEST-01 check (where test expectations come from): part 1 answered: the expected values were taken from `ALLOWED_TRANSITIONS`, not the spec table. Part 2 not answered; the learner asked for the answer: a spec-first test `done → in_progress` would have failed with `ConflictError: Cannot change status from done to in_progress`. Recorded as explained, not demonstrated.
- Misconceptions:
  - Called a `Record<…>` annotation "type narrowing". Corrected: narrowing is a runtime check that lets the compiler pick a union member (TS-03).
  - Described tests as "runtime assertions". Corrected: the `if`/`throw` is the runtime check; tests run before deployment to verify it.
- Decisions: the learner chose to keep `done → todo` and not apply the specified `done → in_progress` change, saying they understand how to change it if requirements change.
- Unresolved question (asked by the learner at the end of the session): in `(TASK_STATUSES as readonly string[]).includes(input)`, why is the widening target `readonly string[]` rather than `string[]`? Not yet explained. Explain at the start of the next session, with a few related examples, before TS-03 checkpoint 1.
- Not verified by the reviewer: Vitest was not run in the review environment (Node 22, and the dependency install failed). The reviewer type-checked `errors.ts` and `task-utils.ts` with TypeScript 6.0.3 and ran union and drift probes. Learner reported `npm run check` passed for 6018ea3: typecheck clean, 3 test files, 47/47 tests passed.
- Next checkpoint: TS-03, checkpoint 1 (narrowing and type guards).

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
