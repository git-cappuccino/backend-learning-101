# LEARNING_LOG.md

# Backend Engineering Learning Log

## Session history

No learning sessions recorded yet.

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