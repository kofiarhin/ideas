# Zoro Inbox

**Last updated:** 2026-07-23

This file is the lightweight communication inbox between Kofi and Zoro.

It is not a replacement for:

- `CONTEXT.md` — workspace briefing
- `PROJECTS.md` — canonical project index
- `projects/<project>.md` — durable project context
- `architect/runs/<run-id>/tasks.md` — governed execution state

## How Kofi Uses This File

Add a new message under **Open Messages** using the template below, then tell Zoro:

```text
Check your Ideas Hub inbox.
```

## How Zoro Must Process Messages

Before processing an inbox message, Zoro must:

1. Read `AGENTS.md`.
2. Read `CONTEXT.md`.
3. Read `PROJECTS.md`.
4. Read the relevant `projects/<project>.md` file when a project is named.
5. Check existing branches, pull requests, Architect tasks, and repository specifications when the message requests implementation.

Inbox messages are instructions or requests, but they are not automatically proof of implementation, verification, deployment, or completion.

Zoro must not treat a message as authorization to merge, deploy, change `main`, approve security-sensitive work, or bypass Architect approval gates unless that authority is stated explicitly.

Zoro should respond in chat first. Durable repository changes should use an isolated branch and pull request unless direct `main` work is explicitly authorized.

## Message Template

```md
## ZORO-MSG-YYYY-MM-DD-NNN

- Status: new
- Project: <project name or workspace>
- Type: question | review | task | decision | context-correction
- Priority: low | normal | high | urgent
- Approval: read-only | discovery-approved | implementation-approved
- Created: YYYY-MM-DD

### Message

<What Zoro should understand or do>

### Constraints

- <Constraint 1>
- <Constraint 2>

### Expected Response

<What Zoro should report back>
```

## Open Messages

## ZORO-MSG-2026-07-23-001

- Status: new
- Project: Zoro
- Type: review
- Priority: normal
- Approval: read-only
- Created: 2026-07-23

### Message

Confirm that you can read this Ideas Hub inbox and explain how you will use it when Kofi says, "Check your Ideas Hub inbox."

### Constraints

- Do not modify any repository.
- Do not create branches, commits, pull requests, or tasks.
- Do not mark this message complete.

### Expected Response

Summarize the inbox workflow and confirm which Ideas Hub files you will read before processing future project-specific messages.
