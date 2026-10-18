# Backend Engineering Curriculum

## 1. Goal

Build professional backend engineering capability on top of existing React.js and Next.js experience.

The target is to become capable of owning backend features in a production-oriented application, qualify for relevant remote full-stack/backend positions, and establish the foundations needed for applied AI engineering later.

This curriculum is deliberately practical and follows the 80/20 rule. Essential concepts receive proper depth; low-frequency topics are deferred until a project or job requirement makes them relevant.

Estimated schedule: approximately 4–5 months for the core learning path and initial advanced exposure, assuming 10–15 focused hours per week. This is an estimate, not a deadline or a guarantee of mastery.

## 2. Primary technology stack

- Language: TypeScript
- Runtime: Node.js
- Backend framework: NestJS
- Database: PostgreSQL
- Database access: Prisma ORM, with direct SQL skills
- API style: REST and JSON
- Validation: NestJS validation tooling and runtime schemas where appropriate
- Testing: Jest or the testing setup supported by the chosen NestJS version, plus HTTP integration tests
- Browser-level testing: Playwright where useful
- Version control: Git and GitHub
- Local environment: Linux fundamentals and Docker
- Deployment: one suitable application host and a managed PostgreSQL service
- CI/CD: GitHub Actions or an equivalent pipeline

Use current stable, compatible versions and commit dependency lockfiles. Record the selected versions in the repository README.

Python and FastAPI are planned for the subsequent applied AI stage, not as competing primary stacks during the initial backend phase.

## 3. Priority levels

**P0 — Core:** Required for a credible backend foundation.

**P1 — Important:** Needed for dependable production work and broader job readiness.

**P2 — Advanced/conditional:** Learn when the foundations are strong and the target job market or project justifies it.

Do not interpret the order as a reason to postpone writing code. Begin the capstone during the early modules and expand it as new concepts are learned.

---

# PHASE A — Language and runtime foundations

## Module A1: TypeScript for backend development [P0]

Topic IDs:

- TS-01: Strict TypeScript and type inference
- TS-02: Interfaces, type aliases and unions
- TS-03: Narrowing and discriminated unions
- TS-04: Generics and utility types
- TS-05: `unknown`, `any` and safe external input handling
- TS-06: Modules, imports and compiler configuration
- TS-07: DTOs and separation of external and internal types
- TS-08: Type safety versus runtime validation

Expected outcomes:

- Write strictly typed backend code.
- Model request and response structures.
- Understand why TypeScript types do not validate incoming JSON at runtime.
- Avoid unsafe casts and excessive use of `any`.

Project task: create typed domain models and validated input schemas for projects and tasks.

## Module A2: Node.js runtime [P0]

Topic IDs:

- NODE-01: Node.js architecture and browser differences
- NODE-02: Event loop and non-blocking I/O
- NODE-03: Promises, async/await and error propagation
- NODE-04: Modules, npm, package.json and lockfiles
- NODE-05: Environment variables and configuration
- NODE-06: Filesystem, buffers and streams at a practical level
- NODE-07: Processes, signals and graceful shutdown
- NODE-08: Built-in HTTP server fundamentals

Expected outcomes:

- Explain how Node.js executes asynchronous operations.
- Recognize unhandled errors and incorrect asynchronous patterns.
- Understand what a backend framework abstracts.
- Build a small HTTP server independently.

Project task: implement a minimal JSON API with a health endpoint and basic error handling without NestJS.

---

# PHASE B — HTTP and application architecture

## Module B1: HTTP and REST [P0]

Topic IDs:

- HTTP-01: Request/response lifecycle
- HTTP-02: Methods, status codes and idempotency
- HTTP-03: Headers, cookies, JSON and content types
- HTTP-04: Path parameters, query parameters and request bodies
- HTTP-05: REST resource design
- HTTP-06: Validation, normalization and consistent errors
- HTTP-07: Filtering, sorting and pagination
- HTTP-08: CORS, HTTPS and caching fundamentals
- HTTP-09: API documentation and OpenAPI
- HTTP-10: Webhooks, file transfer and API versioning fundamentals

Expected outcomes:

- Design predictable APIs.
- Select appropriate status codes and HTTP methods.
- Document API contracts.
- Handle invalid requests consistently.
- Understand the difference between authentication, CORS and server-side authorization.

Project task: build task-management CRUD endpoints with filtering, pagination and documented error responses.

## Module B2: Backend architecture [P0]

Topic IDs:

- ARCH-01: Controllers, services and data-access responsibilities
- ARCH-02: Dependency injection
- ARCH-03: Modules and dependency boundaries
- ARCH-04: Domain logic versus transport logic
- ARCH-05: DTOs, validation and serialization
- ARCH-06: Centralized error handling
- ARCH-07: Configuration and environment separation
- ARCH-08: Practical logging and request context

Expected outcomes:

- Organize an application without placing all logic in controllers.
- Understand how dependencies are created and tested.
- Avoid unnecessary abstractions and premature microservices.

Project task: refactor the initial API into clear modules and services.

---

# PHASE C — Database engineering

## Module C1: Relational data modeling [P0]

Topic IDs:

- DB-01: Tables, rows, keys and constraints
- DB-02: Data types, nullability and defaults
- DB-03: One-to-one, one-to-many and many-to-many relationships
- DB-04: Normalization and data integrity
- DB-05: Foreign keys, unique constraints and cascading
- DB-06: Index fundamentals
- DB-07: Schema evolution and migrations

Expected outcomes:

- Design a relational schema for a real application.
- Enforce data integrity at the database level.
- Explain where constraints belong and why application validation alone is insufficient.

Project task: model users, organizations, memberships, projects, tasks and comments.

## Module C2: SQL fundamentals [P0]

Topic IDs:

- SQL-01: SELECT, INSERT, UPDATE and DELETE
- SQL-02: Filtering, sorting and limiting
- SQL-03: INNER JOIN and LEFT JOIN
- SQL-04: Aggregation, GROUP BY and HAVING
- SQL-05: Subqueries and CTEs
- SQL-06: Upserts and conflict handling
- SQL-07: Parameterized queries
- SQL-08: Window functions at a practical level
- SQL-09: Query plans and basic EXPLAIN

Expected outcomes:

- Write useful queries without depending on an ORM.
- Retrieve relational data efficiently.
- Avoid SQL injection.
- Understand how queries affect performance.

Project task: implement project reports, task filtering and queries across related tables.

## Module C3: Transactions and concurrency [P0/P1]

Topic IDs:

- TX-01: ACID and transaction boundaries
- TX-02: Commit and rollback
- TX-03: Atomic multi-step operations
- TX-04: Isolation and common concurrency problems
- TX-05: Locks, deadlocks and race conditions
- TX-06: Optimistic concurrency and version checks
- TX-07: Connection pooling
- TX-08: Safe migrations and concurrent application changes

Expected outcomes:

- Identify operations that must be atomic.
- Prevent lost updates and inconsistent records.
- Explain common transaction failures.
- Handle concurrent requests safely.

Project task: implement a multi-step business operation and test rollback and concurrent updates.

## Module C4: PostgreSQL in practice [P0/P1]

Topic IDs:

- PG-01: Local setup and database connections
- PG-02: Roles, privileges and least privilege
- PG-03: UUIDs, timestamps and time-zone handling
- PG-04: Composite indexes and query plans
- PG-05: JSONB and relational modeling trade-offs
- PG-06: Cursor-based pagination fundamentals
- PG-07: Backup, restore and recovery concepts

Expected outcomes:

- Use PostgreSQL confidently in development.
- Recognize database-specific behavior.
- Diagnose basic query and connection issues.

Project task: optimize a slow query and document the before/after results.

---

# PHASE D — NestJS and ORM

## Module D1: NestJS application development [P0]

Topic IDs:

- NEST-01: Application structure and bootstrap
- NEST-02: Modules, controllers and providers
- NEST-03: Dependency injection
- NEST-04: Request DTOs and validation pipes
- NEST-05: Services and business logic
- NEST-06: Exception filters and error handling
- NEST-07: Middleware, guards and interceptors
- NEST-08: Configuration and environment validation
- NEST-09: OpenAPI documentation
- NEST-10: Unit testing and integration testing

Expected outcomes:

- Build modular REST APIs.
- Understand the request lifecycle.
- Test services and HTTP behavior.
- Keep business logic independent of unnecessary framework details.

Project task: migrate the initial API into a maintainable NestJS application.

## Module D2: Prisma ORM [P0]

Topic IDs:

- ORM-01: Schema, models and relations
- ORM-02: Generated client and typed queries
- ORM-03: CRUD, filtering and relation loading
- ORM-04: Nested writes and transactions
- ORM-05: Migration generation and application
- ORM-06: Seeding and test data
- ORM-07: Database error handling
- ORM-08: N+1 queries and query efficiency
- ORM-09: Raw SQL and when to use it
- ORM-10: Production connection management

Expected outcomes:

- Use an ORM safely without hiding database behavior.
- Create and review migrations.
- Diagnose common query and constraint failures.
- Recognize when direct SQL is more suitable.

Project task: implement the data-access layer for the capstone application.

---

# PHASE E — Security and identity

## Module E1: Authentication [P0]

Topic IDs:

- AUTH-01: Authentication versus authorization
- AUTH-02: Password hashing and credential storage
- AUTH-03: Sessions and cookies
- AUTH-04: Access tokens and refresh tokens
- AUTH-05: JWT verification and expiry
- AUTH-06: OAuth 2.0 and OpenID Connect concepts
- AUTH-07: Password recovery and email verification
- AUTH-08: Secure use of established authentication solutions

Expected outcomes:

- Explain the authentication lifecycle.
- Choose an appropriate session or token strategy.
- Avoid storing credentials or tokens unsafely.
- Use established authentication libraries rather than inventing security protocols.

## Module E2: Authorization and application security [P0]

Topic IDs:

- SEC-01: Role-based access control
- SEC-02: Resource ownership and permissions
- SEC-03: Multi-tenant isolation
- SEC-04: Broken object-level authorization
- SEC-05: SQL injection and unsafe queries
- SEC-06: XSS, CSRF and CORS security
- SEC-07: Rate limiting and resource exhaustion
- SEC-08: File upload and secret handling
- SEC-09: Dependency vulnerabilities and secure logging
- SEC-10: Security testing and threat modeling basics

Expected outcomes:

- Protect resources at the server and database layers.
- Test unauthorized access, not only successful requests.
- Recognize common API security vulnerabilities.

Project task: implement organization-scoped access and tests for unauthorized resource access.

---

# PHASE F — Testing and delivery

## Module F1: Testing [P0]

Topic IDs:

- TEST-01: Unit testing
- TEST-02: Integration testing
- TEST-03: HTTP end-to-end testing
- TEST-04: Test databases and fixtures
- TEST-05: Mocking external dependencies
- TEST-06: Testing authorization and error cases
- TEST-07: Test isolation and cleanup
- TEST-08: CI test execution

Expected outcomes:

- Test business logic independently.
- Verify real database and HTTP behavior.
- Write tests for failures and permissions.
- Diagnose unreliable tests.

Project task: establish a repeatable test suite for critical API workflows.

## Module F2: Git and CI/CD [P0]

Topic IDs:

- CICD-01: Branches, commits and pull requests
- CICD-02: Code review and merge workflows
- CICD-03: Linting, type-checking and automated tests
- CICD-04: Build and deployment pipelines
- CICD-05: Secrets and environment configuration
- CICD-06: Release verification and rollback planning

Expected outcomes:

- Deliver changes through a repeatable pipeline.
- Prevent basic quality failures from reaching production.
- Manage configuration and secrets safely.

Project task: configure a CI pipeline that runs checks before a change can be merged.

## Module F3: Linux, Docker and deployment [P0/P1]

Topic IDs:

- OPS-01: Linux command-line fundamentals
- OPS-02: Processes, ports, permissions and environment variables
- OPS-03: Docker images and containers
- OPS-04: Volumes, networks and Docker Compose
- OPS-05: Application configuration and secrets
- OPS-06: HTTPS, DNS and reverse-proxy concepts
- OPS-07: Application and managed database deployment
- OPS-08: Database migrations during release
- OPS-09: Health checks and graceful shutdown

Expected outcomes:

- Run the application consistently in local and deployed environments.
- Diagnose configuration and connectivity issues.
- Deploy a new version without treating deployment as a manual mystery.

Project task: containerize the application, deploy it and document the release process.

## Module F4: Observability and reliability [P1]

Topic IDs:

- OBS-01: Structured logging
- OBS-02: Request IDs and tracing concepts
- OBS-03: Error tracking and useful alerts
- OBS-04: Health checks and service metrics
- OBS-05: Timeouts, retries and exponential backoff
- OBS-06: Graceful handling of dependency failures
- OBS-07: Backup, recovery and incident diagnosis

Expected outcomes:

- Diagnose failed requests.
- Distinguish application errors from infrastructure problems.
- Understand how to operate a service responsibly.

Project task: introduce structured logs, error reporting and a documented recovery procedure.

---

# PHASE G — Advanced backend capabilities

## Module G1: Redis and caching [P1]

- CACHE-01: Cache-aside pattern
- CACHE-02: Keys, TTL and invalidation
- CACHE-03: Rate limiting with shared storage
- CACHE-04: Cache stampedes and stale data
- CACHE-05: When not to cache

Project task: cache a suitable read-heavy endpoint and measure the effect.

## Module G2: Background jobs [P1]

- JOB-01: Why background processing is needed
- JOB-02: Job queues and workers
- JOB-03: Retries, backoff and dead-letter handling
- JOB-04: Idempotency and duplicate processing
- JOB-05: Scheduled jobs and job status tracking
- JOB-06: Transactional consistency when dispatching jobs

Project task: implement asynchronous notifications or document processing.

## Module G3: Performance and system design [P1/P2]

- PERF-01: Query profiling and indexing
- PERF-02: Load testing and bottleneck diagnosis
- PERF-03: Pagination and bulk operations
- PERF-04: Horizontal versus vertical scaling
- PERF-05: Stateless application design
- SYS-01: Monoliths versus microservices
- SYS-02: Synchronous versus asynchronous workflows
- SYS-03: Consistency and availability trade-offs
- SYS-04: Designing a notification service or file-processing workflow

Expected outcomes:

- Identify bottlenecks using evidence.
- Explain common scalability trade-offs.
- Design a reasonable service without overengineering it.

---

# PHASE H — Optional skills based on job evidence

These topics should not block completion of the core curriculum:

- Python and FastAPI
- WebSockets and Server-Sent Events
- Object storage and signed upload URLs
- GraphQL
- Search engines
- Cloud-specific managed services
- Microservices
- Kafka and distributed event streaming
- Kubernetes

Learn each only when it supports the next career step or a concrete project requirement.

The subsequent AI curriculum should cover Python fundamentals, model APIs, structured output, streaming, embeddings, RAG, tool calling, evaluations, prompt-injection defenses, cost management and AI observability.

---

# 4. Capstone project

Build a multi-user project and document-management application.

Initial stack: Next.js + TypeScript frontend, NestJS API, PostgreSQL and Prisma.

Progressive milestones:

1. Basic entities and CRUD.
2. Relational schema and validation.
3. Authentication and organization membership.
4. Resource-level authorization.
5. Transactions and concurrent updates.
6. Automated testing.
7. Docker and CI/CD.
8. Deployment, logging and error diagnosis.
9. Caching and background processing.
10. Performance measurements and documentation.

Later AI extension:

- Upload and process documents.
- Retrieve relevant passages.
- Answer questions using an LLM.
- Cite source passages.
- Evaluate retrieval and answer quality.
- Enforce existing authorization rules during retrieval.

The project should be understandable, tested and deployable. A smaller, well-engineered application is preferable to an unfinished collection of technologies.

# 5. Completion gates

For every topic, record:

- What I should understand.
- What I should implement.
- What evidence demonstrates the skill.
- What errors or edge cases I should be able to diagnose.

Use four statuses:

- Not started
- In progress
- Practiced
- Verified

A topic is Verified only when I can explain the core concept in my own words and demonstrate it in code or an appropriate practical assessment.

Completion of this curriculum indicates a foundation, not mastery of every production scenario or a guarantee of employment.

# 6. Initial execution

Begin with TS-01. Complete Module A1 (TS-01 to TS-08) before starting Module A2 with NODE-01. See the 2026-10-18 entry in LEARNING_LOG.md.

Teach TypeScript and Node.js backend concepts according to backend-learning.md. Start with the mental model, use small examples, and progress through checkpoints rather than teaching the entire module in one response.

Update PROGRESS.md and LEARNING_LOG.md as actual learning evidence becomes available.