# FeatureLoop Lab — Product Requirements Document

**Status:** Approved for repository foundation  
**Project:** FeatureLoop Lab  
**Application name:** LoopBoard  
**Owner:** Kofi  
**Last updated:** 2026-07-24

## 1. Product Summary

FeatureLoop Lab is a small MERN application designed to test a reusable AI-assisted feature implementation loop.

The application itself is a personal task board called LoopBoard. Its primary purpose is to provide enough frontend, backend, persistence, authentication, validation, and browser behaviour to test whether an AI coding agent can reliably move a feature request through discovery, specification, planning, implementation, verification, repair, and completion reporting.

## 2. Problem

AI coding workflows often depend on repeated manual prompting:

1. The user describes a feature.
2. The agent generates code.
3. The user inspects the result.
4. The user reports problems.
5. The agent revises the implementation.
6. The cycle continues until the feature appears complete.

This process is inconsistent, difficult to audit, and dependent on the user's ability to notice missing requirements and implementation defects.

FeatureLoop Lab tests whether a reusable workflow can automate this cycle using explicit specifications, verification commands, acceptance criteria, Playwright tests, repair attempts, and stop conditions.

## 3. Product Goal

Create a reference MERN application and repository-level agent workflow that can:

- Discover missing requirements before implementation.
- Generate an implementation-ready specification.
- Generate a test-first implementation plan.
- Implement features incrementally.
- Verify behaviour using unit, integration, build, and Playwright checks.
- Repair implementation failures automatically.
- Stop safely when completion criteria pass or the repair limit is reached.
- Produce traceable feature artifacts and verification evidence.

## 4. Non-Goals

The initial version will not:

- Build a general-purpose autonomous development platform.
- Implement multi-agent orchestration.
- Automatically merge pull requests.
- Automatically deploy to production.
- Replace human approval for material product or security decisions.
- Support social authentication.
- Support email verification.
- Support password reset.
- Provide complex project-management functionality.

## 5. Target User

The primary user is a software engineer experimenting with Codex CLI or another repository-aware coding agent.

The user wants to submit a feature request and observe whether the agent can complete the feature using a repeatable, governed workflow with minimal manual re-prompting.

## 6. Core Product Concept

LoopBoard is a lightweight personal task application.

A user can:

- Register an account.
- Log in and log out.
- Access a protected dashboard.
- Create tasks.
- Edit tasks.
- Mark tasks complete.
- Delete tasks.
- Filter tasks by status.
- View only tasks that belong to their account.

The product is deliberately small so that engineering workflow quality remains the main experiment.

## 7. Technology Stack

### Frontend

- React
- Latest Vite
- Tailwind CSS
- React Router
- TanStack Query
- Vitest
- React Testing Library

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Jest
- Supertest

### End-to-End Verification

- Playwright

### Tooling

- ESLint
- Prettier
- Environment variables through `.env`
- Root-level `package.json`

Redux Toolkit is not required for the MVP. Server state should be handled through TanStack Query, while local interface state should remain within React components or focused hooks.

## 8. Repository Workflow

The repository must include a reusable feature-loop skill and feature-specific workspaces.

Expected workflow:

1. Receive a feature request.
2. Inspect the repository.
3. Complete discovery.
4. Generate a specification.
5. Generate an implementation plan.
6. Obtain approval when a material decision remains unresolved.
7. Implement using test-driven development.
8. Generate or update Playwright tests.
9. Run the complete verification suite.
10. Repair failures.
11. Repeat verification.
12. Generate a verification report.
13. Stop when all completion criteria pass or the repair limit is reached.

## 9. MVP Scope

### 9.1 Authentication

- User registration
- User login
- User logout
- HTTP-only authentication cookie
- Protected dashboard route
- Authentication persistence after page refresh
- Registration and login validation
- Useful authentication errors
- Authorization middleware

### 9.2 Personal Task Management

- Create a task
- Read the authenticated user's tasks
- Edit a task
- Mark a task complete or active
- Delete a task
- Filter tasks by all, active, or completed
- Prevent access to another user's tasks

## 10. Authentication Requirements

### 10.1 Registration

A visitor can register using name, email, and password.

Requirements:

- Name is required.
- Email is required and normalized.
- Email addresses must be unique.
- Password must contain at least eight characters.
- Passwords must be hashed before storage.
- Successful registration automatically authenticates the user.
- The authentication token must not be exposed to frontend JavaScript.

### 10.2 Login

- Invalid credentials return a generic authentication error.
- Successful login creates an HTTP-only cookie.
- Authentication remains valid after a browser refresh.
- Sensitive authentication details are never logged.

### 10.3 Logout

- The authentication cookie is invalidated.
- The user is redirected away from protected content.
- Protected endpoints reject the previous session after logout.

### 10.4 Route Protection

- Unauthenticated users cannot access the dashboard.
- Unauthenticated API requests to protected routes return `401`.
- Authenticated users visiting login or registration routes are redirected to the dashboard.
- Users can access only their own task resources.

## 11. Task Requirements

### 11.1 Task Model

A task contains:

- `title`
- `description`
- `status`
- `owner`
- `createdAt`
- `updatedAt`

Status values:

- `active`
- `completed`

### 11.2 Create Task

- Title is required.
- Description is optional.
- The authenticated user becomes the task owner.
- The new task appears without a full page reload.

### 11.3 View Tasks

- Users see only their own tasks.
- Tasks are ordered newest first by default.
- Loading, empty, error, and success states are represented.
- The interface supports all, active, and completed filters.

### 11.4 Edit Task

- A user can update the title and description of their own task.
- Validation errors are displayed clearly.
- A user cannot modify another user's task.

### 11.5 Complete Task

- A user can switch a task between active and completed.
- The interface reflects the updated status.
- A failed API update must not leave the interface in an incorrect state.

### 11.6 Delete Task

- A user can delete their own task.
- The user receives a confirmation step before deletion.
- A user cannot delete another user's task.

## 12. User Experience Requirements

- Responsive layouts for mobile and desktop.
- Accessible form labels.
- Keyboard-accessible controls.
- Visible focus states.
- Loading indicators for asynchronous actions.
- Inline validation errors.
- Useful empty states.
- Non-destructive error recovery.
- No unexpected browser console errors.

## 13. API Requirements

```text
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

GET    /api/tasks
POST   /api/tasks
GET    /api/tasks/:taskId
PATCH  /api/tasks/:taskId
DELETE /api/tasks/:taskId
```

All task endpoints require authentication. Task lookup, update, and deletion must verify ownership.

## 14. Security Requirements

- Passwords must be hashed with a trusted password-hashing library.
- Authentication cookies must use `httpOnly`.
- Production cookies must use `secure`.
- Cookie `sameSite` behaviour must be documented.
- Authentication errors must not reveal whether an email exists.
- Protected endpoints must verify authentication server-side.
- Resource ownership must be verified server-side.
- Secrets must be loaded from environment variables.
- Secrets and production credentials must never be committed.
- Request payloads must be validated before database operations.
- The application must not trust ownership values supplied by the client.

## 15. Feature-Loop Artifacts

Every feature handled by the loop must have a workspace:

```text
features/<feature-name>/
├── request.md
├── discovery.md
├── specification.md
├── plan.md
├── progress.json
└── verification-report.md
```

- `request.md` stores the original feature request and explicit constraints.
- `discovery.md` stores findings, facts, assumptions, decisions, risks, and unresolved questions.
- `specification.md` stores approved requirements, acceptance criteria, contracts, states, and scenarios.
- `plan.md` stores files, test-first order, commands, risks, and rollback considerations.
- `progress.json` stores execution state, phase, repair attempts, and failures.
- `verification-report.md` stores criteria evidence, command results, browser results, risks, and status.

## 16. Loop Phases

### Phase 1: Discovery

The agent must inspect the repository before asking questions and identify existing functionality, conventions, boundaries, data requirements, authentication impact, validation, states, accessibility, security, tests, and material unresolved decisions.

Implementation must not start while a material requirement remains ambiguous.

### Phase 2: Specification

The specification must include objective, user stories, functional requirements, non-functional requirements, acceptance criteria, API contracts, data changes, UI states, error handling, security requirements, test scenarios, and out-of-scope items.

### Phase 3: Planning

The plan must include files to create, files to modify, test-first implementation order, database changes, API changes, UI changes, verification commands, risks, and rollback considerations.

### Phase 4: Implementation

For every plan item, the agent must:

1. Write or update a test.
2. Confirm the test fails for the expected reason.
3. Implement the smallest valid change.
4. Run the focused test.
5. Refactor while preserving behaviour.
6. Update progress state.

### Phase 5: Verification

The agent must run:

```bash
npm run lint
npm run test:client
npm run test:server
npm run test:e2e
npm run build
```

It must also inspect browser console errors, failed network requests, server errors, authentication cookie behaviour, protected routes, responsive behaviour, and acceptance-criteria coverage.

### Phase 6: Repair

When verification fails, the agent must capture the failure, identify the responsible area, fix the root cause, run the smallest relevant test, run the full suite, record the attempt, and repeat until the stop condition passes.

The agent must not weaken tests, delete valid assertions, silently alter approved requirements, or claim completion without evidence.

## 17. Stop Conditions

A feature is complete only when:

- Every acceptance criterion has matching test or inspection evidence.
- Frontend tests pass.
- Backend tests pass.
- Playwright tests pass.
- Linting passes.
- The production build succeeds.
- No unexpected browser console errors remain.
- No unexpected server errors remain.
- Security and ownership requirements pass.
- The verification report is complete.

Maximum repair attempts: **5**

After five unsuccessful attempts, the loop must stop and report the remaining failure, suspected root cause, files involved, work completed, verification completed, verification not completed, and recommended next action.

## 18. Required Playwright Scenarios

### Authentication

- Register
- Login
- Invalid credentials
- Registration validation
- Persistence after refresh
- Protected dashboard redirect
- Authenticated-user redirect away from auth screens
- Logout
- Old-session rejection after logout

### Tasks

- Create
- Edit
- Complete
- Return to active
- Filter
- Delete
- Empty state
- Failed-request recovery

### Authorization

- One user cannot view another user's task.
- One user cannot update another user's task.
- One user cannot delete another user's task.

## 19. Experiment Metrics

For each loop execution, record:

- Feature name
- Discovery questions
- Human decisions required
- Implementation attempts
- Repair iterations
- Tests created and passed
- Files changed
- Specification changes after implementation began
- Verification commands executed
- Human corrections required
- False completion claims
- Remaining defects
- Final status

## 20. MVP Acceptance Criteria

1. The repository contains reusable feature-loop instructions.
2. Authentication has been processed through the complete loop.
3. Task CRUD has been processed through the same loop without rewriting the core workflow.
4. All required automated checks pass.
5. Playwright verifies critical user journeys.
6. Feature artifacts show discovery, specification, planning, progress, and verification.
7. The loop stops safely after the repair limit.
8. A developer can invoke the workflow from the repository root using a documented prompt.
9. No feature is marked complete without traceable verification evidence.
10. Experiment metrics support evaluation of reduced manual prompting.

## 21. Suggested Repository Structure

```text
feature-loop-lab/
├── AGENTS.md
├── README.md
├── PRD.md
├── package.json
├── .env.example
├── playwright.config.js
├── .agents/
│   └── skills/
│       └── feature-loop/
├── features/
│   └── authentication/
├── client/
├── server/
├── e2e/
└── scripts/
```

## 22. Initial Codex Request

```text
Use the feature-loop skill to implement authentication for LoopBoard.

Begin by inspecting the repository and completing discovery.
Create all feature artifacts under features/authentication/.
Do not begin implementation until the specification and implementation plan
are complete and no material decision remains unresolved.
Use test-driven development.
Generate Playwright tests for registration, login, logout, protected routes,
invalid credentials, validation, and authentication persistence after refresh.
Run the complete verification suite and repair failures until all stop
conditions pass. Do not weaken tests or silently modify the approved
specification. Stop after five failed repair attempts and produce a blocker
report.
```

## 23. Delivery Milestones

### Milestone 1: Repository Foundation

- Initialize repository
- Configure root workspace
- Add repository instructions
- Add feature-loop skill
- Add testing infrastructure
- Add feature artifact templates

### Milestone 2: Authentication Loop

- Complete discovery
- Approve specification
- Generate plan
- Implement authentication
- Run Playwright verification
- Produce verification report

### Milestone 3: Task CRUD Loop

- Reuse the same feature loop
- Implement task ownership and CRUD
- Verify unit, integration, and browser behaviour
- Compare metrics against authentication

### Milestone 4: Evaluation

- Review collected metrics
- Identify manual intervention points
- Document successful and failed patterns
- Decide whether to integrate the workflow into Codex Workflow Kit
