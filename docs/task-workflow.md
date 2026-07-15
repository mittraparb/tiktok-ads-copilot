# Task Workflow

This project tracks work as Epics, Stories, Tasks, Bugs, and Spikes with stable IDs. Codex should use `docs/task-board.md` as the active work board before starting, during implementation, and after finishing work.

## Statuses

- Backlog
- Ready
- In Progress
- Needs Review
- Partial
- Blocked
- Done
- Cancelled

## Task Types

- Epic
- Story
- Task
- Bug
- Spike

## Task ID Format

- Tasks, bugs, and spikes use `TAD-001`, `TAD-002`, `TAD-003`, and so on.
- Epics use `TAD-EPIC-001`, `TAD-EPIC-002`, `TAD-EPIC-003`, and so on.
- Stories use `TAD-STORY-010`, `TAD-STORY-020`, `TAD-STORY-030`, and so on.
- Do not reuse IDs after a task is cancelled or replaced.

## Priority

- P0 critical
- P1 high
- P2 medium
- P3 low

## Required Task Fields

Every task must include:

- ID
- Type
- Status
- Priority
- Epic
- Story if applicable
- Title
- Goal
- Scope
- Out of scope
- Acceptance criteria
- Dependencies
- Expected files
- Notes
- Files changed
- Build/lint/test result
- Last updated

## Operating Rules

Before starting a task:

1. Read `AGENTS.md`.
2. Read `docs/project-status.md`.
3. Read `docs/task-board.md`.
4. Identify the requested task ID, if provided.
5. If no task ID is provided, use the Next Recommended Action from `docs/project-status.md` and the highest-priority Open task from `docs/task-board.md`.
6. Confirm the task ID, title, current status, epic/story, scope, expected files to change, and out-of-scope items.
7. Move the task to `In Progress` before editing.
8. Do not work on unrelated tasks.
9. If work requires new scope, create a new task first instead of silently expanding scope.

After completing a task:

1. Update `docs/task-board.md`.
2. Move the task to `Done`, `Partial`, `Blocked`, or `Needs Review`.
3. Add implementation notes.
4. Add files changed.
5. Add build/lint/test result.
6. Add bugs found or created.
7. Update `docs/project-status.md`.
8. Set the next recommended action.
9. Provide the user-facing test URL and Definition of Done checklist.
10. Wait for the user to confirm the acceptance-test result before marking the task `Done`; use `Needs Review` while waiting.
11. Summarize the task ID, result, files changed, and next task.

## Local Acceptance Testing

- For plain UI checks that do not depend on TikTok OAuth cookies, `http://localhost:3000` is acceptable.
- For TikTok OAuth, connected-account state, synced video library, or any feature that depends on the connected TikTok cookies, test through the same public origin used for OAuth callback setup.
- In local development, that usually means the active ngrok HTTPS URL, for example `https://current-ngrok-domain/videos`, not `http://localhost:3000/videos`.
- Reason: browser cookies are scoped by host. A TikTok login completed on an ngrok domain will not make the same connected cookies available on `localhost`, so localhost may correctly fall back to mock data.
- For TikTok Sandbox Login Kit, include `disable_auto_auth=1` in authorization URLs during testing so an existing TikTok browser session does not silently authorize the wrong account.
- If Login Kit returns `non_sandbox_target` after account login and the app logs no `/api/tiktok/callback`, treat it as a TikTok Sandbox target-user/session issue, not a callback implementation bug.
- After successful Login Kit reconnect, refresh the TikTok Display API video sync before judging Video Library count or cover rendering. Saved rows and signed TikTok CDN cover URLs can become stale.
- Do not mark OAuth/session-dependent tasks as `Done` until the user confirms acceptance on the correct public test URL.
- At implementation handoff, include the exact active ngrok URL for testing and a concise DoD checklist for the user to verify.
- Do not commit `.env.local` or `.ngrok/ngrok.yml`; update only docs and safe source files.

## End-of-Day Closeout

When the user says the work is done for today:

1. Summarize what was completed during the day.
2. Update `docs/task-board.md` and `docs/project-status.md`.
3. Run required verification if there are unverified code changes.
4. Commit and push safe code/docs changes to git.
5. Do not commit secrets or local-only files such as `.env.local` or `.ngrok/ngrok.yml`.
6. Stop/close running local app processes, tunnels, and dev servers started for the work, including Next.js and ngrok, so they do not keep consuming battery or CPU.
7. Report what was pushed and which processes were stopped.
