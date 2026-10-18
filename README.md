# Backend Learning 101

A structured, long-term backend engineering learning workspace focused on practical skills, incremental teaching and evidence-based progress tracking.

Repository: https://github.com/git-cappuccino/backend-learning-101

## Learning objective

Build on existing frontend experience with JavaScript, React.js and Next.js to develop strong backend engineering fundamentals.

The initial learning path focuses on TypeScript, Node.js, NestJS, PostgreSQL, SQL, Prisma, testing, security, deployment and production operations.

Applied AI engineering is a subsequent stage, built on the backend foundation.

## Learning philosophy

This curriculum follows an 80/20 approach: prioritize the concepts and workflows most useful in professional development, but explain those concepts in sufficient depth.

Lessons are incremental rather than documentation-style dumps. Practical exercises, diagrams, checkpoints and understanding assessments help turn explanations into usable engineering skills.

The goal is durable understanding, not simply completing a syllabus.

## Repository structure

| File | Purpose |
|---|---|
| `CLAUDE.md` | Instructions for Claude Code when working in this repository |
| `backend-learning.md` | Detailed teaching preferences and learning workflow |
| `backend-curriculum.md` | Ordered curriculum, technology stack, priorities and milestones |
| `PROGRESS.md` | Current learning status and evidence of demonstrated skills |
| `LEARNING_LOG.md` | Chronological record of sessions, assessments and decisions |
| `README.md` | Repository overview and operating instructions |

## How the files work together

**Teaching preferences:** `backend-learning.md` defines how lessons should be taught, including pacing, explanation depth, exercises and checkpoints.

**Curriculum:** `backend-curriculum.md` defines what to learn and in which order.

**Progress:** `PROGRESS.md` records the current state of each topic and the evidence supporting completion.

**History:** `LEARNING_LOG.md` preserves previous sessions, mistakes, decisions and next steps.

**Claude Code instructions:** `CLAUDE.md` directs repository-based work and points Claude Code to the other files.

## How to start a learning session

Use this prompt in Claude Project or Claude Code:

> Curriculum session: backend engineering.
>
> Read the teaching preferences, curriculum and latest progress records. Identify the last verified checkpoint and teach the next logical concept incrementally. Follow the 80/20 approach, explain selected concepts properly, give practical exercises and check my understanding before advancing.

## Progress tracking

Topics use four statuses:

- **Not started:** No learning work recorded.
- **In progress:** Currently learning the topic.
- **Practiced:** Practical work has been attempted.
- **Verified:** Sufficient evidence demonstrates understanding and application.

A topic is not automatically verified merely because it has been explained or code has been generated.

## Git workflow

Use Git to preserve meaningful milestones and maintain a recoverable history.

Recommended workflow:

1. Pull or synchronize the latest repository changes before beginning work on another machine.
2. Make focused changes to curriculum, progress or learning history.
3. Review the diff and confirm the records remain consistent.
4. Commit meaningful changes.
5. Push to GitHub.
6. Refresh Claude Project knowledge when its selected files have changed.

Do not assume Claude Project knowledge automatically updates whenever GitHub changes.

## Guiding principle

Learn the concepts that matter, understand them properly, implement them yourself, verify your work and record what you have actually demonstrated.