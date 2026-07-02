# TikTok Ads Co-Pilot Task Board

## Board Summary

Current focus:
- Phase 1: Mock Product UI, focused on the mock Video Library path and Pre-Boost detail route.

Current rule:
- Do not implement real OAuth/API/database changes until the relevant task is moved to In Progress.
- Keep Phase 1 application work mock-only unless a task explicitly moves a later phase into In Progress.
- `/reports/preview` may be a later Phase 1B task and is not required before TikTok API planning.

Open task selection rule:
- If no task ID is requested, use the Next Recommended Action from `docs/project-status.md` and the highest-priority Ready task on this board.

Last updated:
- 2026-07-02

## Epic TAD-EPIC-001: Foundation & Project Control

Goal:
- Keep project scope, phase boundaries, and Codex operating rules explicit.

### TAD-001

ID: TAD-001
Type: Task
Status: Done
Priority: P0 critical
Epic: Foundation & Project Control
Story: N/A
Title: Create project status source of truth
Goal: Maintain `docs/project-status.md` as the source of truth for current phase, completed work, bugs, and next action.
Scope:
- Create `docs/project-status.md`.
- Add operating rule to `AGENTS.md`.
Out of scope:
- Application features.
Acceptance criteria:
- `docs/project-status.md` exists.
- `AGENTS.md` requires reading and updating it.
Dependencies:
- None.
Expected files:
- `docs/project-status.md`
- `AGENTS.md`
Notes:
- Completed before this task board was created.
Files changed:
- `docs/project-status.md`
- `AGENTS.md`
Build/lint/test result:
- Previously recorded `pnpm lint` and `pnpm build` as passing on 2026-07-02.
Last updated:
- 2026-07-02

### TAD-002

ID: TAD-002
Type: Task
Status: Done
Priority: P0 critical
Epic: Foundation & Project Control
Story: N/A
Title: Create Jira-style task board and task workflow
Goal: Create `docs/task-board.md` and `docs/task-workflow.md` so all future work can be tracked by task ID.
Scope:
- Create `docs/task-board.md`.
- Create `docs/task-workflow.md`.
- Update `AGENTS.md` with task board workflow.
- Update `docs/project-status.md` after completion.
Out of scope:
- Application features.
- Real TikTok OAuth/API work.
- Database persistence.
- CSV processing.
Acceptance criteria:
- Task board exists.
- Workflow exists.
- `AGENTS.md` requires reading/updating the task board.
Dependencies:
- `docs/project-status.md`
Expected files:
- `docs/task-board.md`
- `docs/task-workflow.md`
- `AGENTS.md`
- `docs/project-status.md`
Notes:
- Created as documentation-only project-control work.
Files changed:
- `docs/task-board.md`
- `docs/task-workflow.md`
- `AGENTS.md`
- `docs/project-status.md`
Build/lint/test result:
- `pnpm lint` passed on 2026-07-02 using the bundled pnpm runtime.
- `pnpm build` passed on 2026-07-02 using the bundled pnpm runtime.
Last updated:
- 2026-07-02

### TAD-003

ID: TAD-003
Type: Task
Status: Done
Priority: P0 critical
Epic: Foundation & Project Control
Story: N/A
Title: Reconcile task board with repository reality
Goal: Inspect the repository and update task statuses so the task board reflects verified files and missing work.
Scope:
- Inspect app routes, mock data, Pre-Boost scoring, Prisma schema, and docs.
- Update task statuses for verifiable tasks.
- Add missing TAD-050 Prisma schema review task.
- Update `docs/project-status.md`.
Out of scope:
- Application feature implementation.
- Real TikTok OAuth/API work.
- Database migrations or persistence.
- Code changes.
Acceptance criteria:
- TAD-010, TAD-011, TAD-020, TAD-021, and TAD-050 statuses reflect repository reality.
- `docs/project-status.md` records the reconciliation.
- Recommended next task is updated.
Dependencies:
- TAD-002
Expected files:
- `docs/task-board.md`
- `docs/project-status.md`
Notes:
- Verified by reading repository files only. No application code was changed.
Files changed:
- `docs/task-board.md`
- `docs/project-status.md`
Build/lint/test result:
- `pnpm lint` passed on 2026-07-02 using the bundled pnpm runtime.
- `pnpm build` passed on 2026-07-02 using the bundled pnpm runtime after rerunning outside the sandbox because Turbopack could not bind a local worker port inside the sandbox.
Last updated:
- 2026-07-02

### TAD-004

ID: TAD-004
Type: Task
Status: Done
Priority: P0 critical
Epic: Foundation & Project Control
Story: N/A
Title: Clean up documentation consistency
Goal: Align phase numbering, Phase 1 scope, next task wording, and TikTok Display API pagination guidance across project docs.
Scope:
- Update `AGENTS.md`.
- Update `docs/project-status.md`.
- Update `docs/task-board.md`.
- Update `docs/tiktok-display-api-plan.md`.
- Preserve verified statuses for TAD-010, TAD-011, TAD-020, TAD-021, and TAD-050.
Out of scope:
- Application code.
- App UI.
- Prisma schema.
- API routes.
Acceptance criteria:
- Phase numbering uses the canonical Phase 1 through Phase 6 structure.
- Phase 1 scope says `/reports/preview` may be a later Phase 1B task.
- Next implementation task remains TAD-011.
- TikTok video sync pagination says first page only initially, then Load More by user action.
Dependencies:
- TAD-003
Expected files:
- `AGENTS.md`
- `docs/project-status.md`
- `docs/task-board.md`
- `docs/tiktok-display-api-plan.md`
Notes:
- Documentation-only cleanup requested by the user.
Files changed:
- `AGENTS.md`
- `docs/project-status.md`
- `docs/task-board.md`
- `docs/tiktok-display-api-plan.md`
Build/lint/test result:
- Build not run because no application code changed and no documentation tooling requires it.
Last updated:
- 2026-07-02

### TAD-044

ID: TAD-044
Type: Spike
Status: Done
Priority: P0 critical
Epic: Foundation & Project Control
Story: Deployment Readiness
Title: Prepare Vercel deployment and TikTok Sandbox environment
Goal: Prepare the project so the user can deploy to Vercel Hobby/free, get a stable public URL, and use that URL for TikTok Developer Portal setup.
Scope:
- Verify public `/`, `/terms`, and `/privacy` pages exist and build.
- Document that Vercel is the main public deployment URL.
- Document that Vercel Hobby/free is enough for current testing.
- Document recommended Vercel settings.
- Document that TikTok Sandbox credentials are used for testing.
- Document that Production TikTok credentials are not used yet.
- Document that ngrok is only for temporary local OAuth callback debugging later.
- Create `docs/vercel-deployment-checklist.md`.
- Create `docs/vercel-vs-ngrok.md`.
- Update `docs/tiktok-sandbox-readiness.md`.
- Check `apps/web/.env.example` contains variable names only.
- Check `.gitignore` protects env files.
- Update `docs/project-status.md`.
- Update `docs/task-board.md`.
Out of scope:
- OAuth implementation.
- TikTok API calls.
- API routes.
- Prisma schema changes.
- Migrations.
- Real secret values in any file, log, docs, README, task board, project status, prompt, or chat.
Acceptance criteria:
- `/`, `/terms`, and `/privacy` exist or are documented as already present.
- `docs/vercel-deployment-checklist.md` exists.
- `docs/vercel-vs-ngrok.md` exists.
- `docs/tiktok-sandbox-readiness.md` exists.
- `apps/web/.env.example` has variable names only.
- `.gitignore` protects env files.
- `docs/project-status.md` is updated.
- `docs/task-board.md` is updated.
- No OAuth code is implemented.
- No real secrets are written anywhere.
Dependencies:
- TAD-004
- TAD-043
Expected files:
- `apps/web/src/app/page.tsx`
- `apps/web/src/app/terms/page.tsx`
- `apps/web/src/app/privacy/page.tsx`
- `docs/vercel-deployment-checklist.md`
- `docs/vercel-vs-ngrok.md`
- `docs/tiktok-sandbox-readiness.md`
- `apps/web/.env.example`
- `.gitignore`
- `docs/task-board.md`
- `docs/project-status.md`
Notes:
- Public `/`, `/terms`, and `/privacy` already existed from TAD-043 and were verified for this task.
- Terms and Privacy copy now explicitly mentions prototype testing and creator analytics.
- Vercel should be used as the stable public URL for TikTok Developer Portal setup.
- ngrok should be used only later for temporary local OAuth callback debugging if needed.
- Use TikTok Sandbox credentials first; do not use Production credentials yet.
- Real values must only be placed in `apps/web/.env.local` or Vercel Environment Variables.
- Never ask the user to paste secrets into chat or prompts.
- Never log `TIKTOK_CLIENT_SECRET`, `DATABASE_URL`, `TOKEN_ENCRYPTION_KEY`, access tokens, refresh tokens, cookies, or sessions.
Files changed:
- `apps/web/src/app/terms/page.tsx`
- `apps/web/src/app/privacy/page.tsx`
- `docs/vercel-deployment-checklist.md`
- `docs/vercel-vs-ngrok.md`
- `docs/tiktok-sandbox-readiness.md`
- `docs/task-board.md`
- `docs/project-status.md`
Build/lint/test result:
- `pnpm lint` passed on 2026-07-02 using the bundled pnpm runtime.
- `pnpm build` passed on 2026-07-02 using the bundled pnpm runtime after rerunning outside the sandbox because Turbopack could not bind a local worker port inside the sandbox.
Last updated:
- 2026-07-02

## Epic TAD-EPIC-002: Videos Pages

Goal:
- Build the video library and video detail experience for Pre-Boost analysis.

### Story TAD-STORY-010: Mock Video Library

Goal:
- Show a mock TikTok Display API-shaped list of videos before connecting the real TikTok API.

### TAD-010

ID: TAD-010
Type: Task
Status: Done
Priority: P1 high
Epic: Videos Pages
Story: Mock Video Library
Title: Build mock `/videos` page
Goal: Display mock TikTok videos with views, likes, comments, shares, engagement rate, Pre-Boost Score, recommendation, and monthly trend comparison.
Scope:
- `/videos` route.
- Mock data shaped like TikTok Display API.
- Monthly benchmark panel.
- Filter, sort, and search.
- Recommendation badges.
Out of scope:
- Real OAuth.
- Real TikTok API calls.
- Database persistence.
Acceptance criteria:
- `/videos` exists.
- Uses mock data only.
- Displays video metrics.
- Displays Pre-Boost Score.
- Displays monthly trend comparison.
- `docs/project-status.md` updated.
Dependencies:
- TAD-001
Expected files:
- `apps/web/src/app/videos/page.tsx`
- `apps/web/src/lib/mock-data.ts`
- `apps/web/src/lib/pre-boost.ts`
- `apps/web/src/components/dashboard/app-shell.tsx`
- `docs/project-status.md`
Notes:
- Verified from `apps/web/src/app/videos/page.tsx`, `apps/web/src/lib/mock-data.ts`, and `apps/web/src/lib/pre-boost.ts`.
- `/videos` exists, uses mock Display API-shaped rows, displays metrics and Pre-Boost Score, includes search/filter/sort, and shows monthly benchmark/trend comparison.
- The page does not link to `/videos/[id]`; that belongs to TAD-011.
Files changed:
- `apps/web/src/app/videos/page.tsx`
- `apps/web/src/lib/mock-data.ts`
- `apps/web/src/lib/pre-boost.ts`
- `apps/web/src/components/dashboard/app-shell.tsx`
- `docs/project-status.md`
Build/lint/test result:
- Previously recorded `pnpm lint` and `pnpm build` as passing on 2026-07-02.
Last updated:
- 2026-07-02

### TAD-011

ID: TAD-011
Type: Task
Status: Ready
Priority: P1 high
Epic: Videos Pages
Story: Mock Video Library
Title: Build mock `/videos/[id]` detail page
Goal: Display a single video detail page with Pre-Boost Score explanation.
Scope:
- `/videos/[id]`.
- Video metric summary.
- Score breakdown.
- Recommendation reasons.
- Risk warnings.
- Suggested budget tier.
- Monthly trend comparison.
- Creative notes from title/description.
Out of scope:
- Real TikTok API.
- Database persistence.
Acceptance criteria:
- `/videos/[id]` exists.
- Clicking a video from `/videos` opens the detail page.
- Score and reasons are explainable.
- No unsupported metrics are shown.
Dependencies:
- TAD-010
- TAD-020
Expected files:
- `apps/web/src/app/videos/[id]/page.tsx`
- `apps/web/src/app/videos/page.tsx`
- `apps/web/src/lib/mock-data.ts`
- `apps/web/src/lib/pre-boost.ts`
- `docs/project-status.md`
- `docs/task-board.md`
Notes:
- Next recommended Phase 1: Mock Product UI implementation task.
Files changed:
- None yet.
Build/lint/test result:
- Not run yet.
Last updated:
- 2026-07-02

## Epic TAD-EPIC-003: Scoring Engine

Goal:
- Create deterministic, explainable scoring for Pre-Boost recommendations.

### Story TAD-STORY-020: Pre-Boost Scoring

Goal:
- Keep Pre-Boost recommendations auditable and based only on supported TikTok Display API fields plus project-owned mock benchmark data.

### TAD-020

ID: TAD-020
Type: Task
Status: Done
Priority: P0 critical
Epic: Scoring Engine
Story: Pre-Boost Scoring
Title: Extract Pre-Boost scoring engine
Goal: Move scoring logic into a reusable, deterministic function.
Scope:
- Create scoring utility.
- Input TikTok Display API-shaped video data.
- Calculate likeRate, commentRate, shareRate, engagementRate, postAgeHours, viewVelocity, trendDeltaPercent, and score.
- Output recommendation, reasons, risks, suggestedBudget, and formulaVersion.
Out of scope:
- AI-based scoring.
- Paid CSV scoring.
Acceptance criteria:
- Scoring is reusable by `/videos` and `/videos/[id]`.
- Score is deterministic.
- Reasons are explainable.
- No unsupported TikTok metrics are required.
Dependencies:
- TAD-010
Expected files:
- `apps/web/src/lib/pre-boost.ts`
- `apps/web/src/lib/mock-data.ts`
- `apps/web/src/app/videos/page.tsx`
- `docs/project-status.md`
- `docs/task-board.md`
Notes:
- Verified from `apps/web/src/lib/pre-boost.ts`.
- `analyzePreBoostVideo` is a reusable deterministic function that accepts TikTok Display API-shaped video data plus monthly benchmark data.
- It calculates likeRate, commentRate, shareRate, engagementRate, postAgeHours, viewVelocity, trendDeltaPercent, and preBoostScore.
- It outputs recommendation, reasons, risks, suggestedBudget, and formulaVersion without unsupported TikTok metrics.
Files changed:
- `apps/web/src/lib/pre-boost.ts`
- `apps/web/src/lib/mock-data.ts`
- `apps/web/src/app/videos/page.tsx`
- `docs/project-status.md`
Build/lint/test result:
- Previously recorded `pnpm lint` and `pnpm build` as passing on 2026-07-02.
Last updated:
- 2026-07-02

### TAD-021

ID: TAD-021
Type: Task
Status: Done
Priority: P1 high
Epic: Scoring Engine
Story: Pre-Boost Scoring
Title: Add monthly trend benchmark scoring
Goal: Compare each video against channel monthly averages.
Scope:
- Define monthly benchmark data shape.
- Calculate above/below trend.
- Calculate percentile or trend label if possible.
- Show trend comparison in UI.
Out of scope:
- External trend scraping.
- Unsupported TikTok metrics.
- Real TikTok API calls.
Acceptance criteria:
- Monthly benchmark data shape is clear.
- Trend comparison is deterministic.
- UI explains above/below benchmark in plain language.
- No external data source is required.
Dependencies:
- TAD-020
Expected files:
- `apps/web/src/lib/pre-boost.ts`
- `apps/web/src/lib/mock-data.ts`
- `apps/web/src/app/videos/page.tsx`
- `apps/web/src/app/videos/[id]/page.tsx`
- `docs/project-status.md`
- `docs/task-board.md`
Notes:
- Verified from `apps/web/src/lib/pre-boost.ts`, `apps/web/src/lib/mock-data.ts`, and `apps/web/src/app/videos/page.tsx`.
- `monthlyBenchmark` defines monthly benchmark data.
- `analyzePreBoostVideo` calculates above/below trend through `trendDeltaPercent`.
- `/videos` shows monthly benchmark stats and a trend label for each video.
Files changed:
- `apps/web/src/lib/pre-boost.ts`
- `apps/web/src/lib/mock-data.ts`
- `apps/web/src/app/videos/page.tsx`
- `docs/project-status.md`
Build/lint/test result:
- Previously recorded `pnpm lint` and `pnpm build` as passing on 2026-07-02.
Last updated:
- 2026-07-02

## Epic TAD-EPIC-005: Database Foundation

Goal:
- Prepare the Phase 3 Prisma/PostgreSQL foundation for later real TikTok OAuth, video sync, paid CSV analysis, and brand reporting without wiring persistence during Phase 1.

### Story TAD-STORY-050: Prisma Schema Review

Goal:
- Review the existing Prisma schema draft before migrations, database setup, or runtime persistence are added.

### TAD-050

ID: TAD-050
Type: Task
Status: Done
Priority: P1 high
Epic: Database Foundation
Story: Prisma Schema Review
Title: Review Prisma schema draft
Goal: Inspect the existing Prisma schema and record what is already represented versus what remains for later database work.
Scope:
- Review `apps/web/prisma/schema.prisma`.
- Verify existing planned core models.
- Record missing later-phase models and migration status.
- Keep review documentation-only.
Out of scope:
- Prisma migrations.
- Database setup.
- Runtime persistence.
- Auth provider setup.
- Real TikTok OAuth/API work.
Acceptance criteria:
- Existing schema models are documented.
- Missing planned models are documented.
- Migration status is documented.
- No database or application code is changed.
Dependencies:
- TAD-001
Expected files:
- `apps/web/prisma/schema.prisma`
- `docs/task-board.md`
- `docs/project-status.md`
Notes:
- Verified `User`, `TikTokAccount`, `TikTokToken`, `TikTokVideo`, and `PreBoostScore` exist in `apps/web/prisma/schema.prisma`.
- No migration files exist under `apps/web/prisma`.
- Later planned models `CsvUpload`, `PaidAdMetric`, and `BrandReport` are not yet in the schema.
- Treat the current schema as a draft until a future database implementation task explicitly resumes this phase.
Files changed:
- `docs/task-board.md`
- `docs/project-status.md`
Build/lint/test result:
- `pnpm lint` passed on 2026-07-02 using the bundled pnpm runtime.
- `pnpm build` passed on 2026-07-02 using the bundled pnpm runtime after rerunning outside the sandbox because Turbopack could not bind a local worker port inside the sandbox.
Last updated:
- 2026-07-02

## Epic TAD-EPIC-004: Developer Compliance & App Review

Goal:
- Provide public-facing compliance pages and product information needed for TikTok developer app setup and review, without implementing real OAuth or API calls before the approved phase.

### Story TAD-STORY-040: TikTok Developer App Setup Pages

Goal:
- Make basic public pages available so TikTok developer setup can reference Terms, Privacy, and app purpose during testing.

### TAD-043

ID: TAD-043
Type: Task
Status: Done
Priority: P1 high
Epic: Developer Compliance & App Review
Story: TikTok Developer App Setup Pages
Title: Developer compliance pages for TikTok app setup
Goal: Create simple public Terms, Privacy, and landing pages for testing TikTok Login Kit and Display API app setup.
Scope:
- Create public `/terms` page.
- Create public `/privacy` page.
- Create simple public `/` page or update the existing landing page if needed.
- Add footer links to Terms and Privacy.
- State that the app uses TikTok OAuth/Login Kit with user authorization.
- State that the app reads public TikTok video metrics after user authorization.
- State that the app does not ask for TikTok passwords.
- State that the app does not collect cookies, sessions, or copied tokens.
- State that the app does not scrape TikTok or automate engagement.
- State that users can disconnect or request deletion of connected TikTok data.
Out of scope:
- TikTok OAuth implementation.
- API calls.
- Payment.
- Database changes.
Acceptance criteria:
- `/` is a public landing page with Terms and Privacy footer links.
- `/terms` exists and has simple accurate terms for testing TikTok Login Kit / Display API.
- `/privacy` exists and has simple accurate privacy copy for testing TikTok Login Kit / Display API.
- Copy includes the TikTok OAuth, Display API metrics, password/cookie/token, scraping/automation, and deletion/disconnect statements.
- No backend API routes, database schema changes, payment, or real TikTok OAuth/API implementation are added.
Dependencies:
- TAD-004
Expected files:
- `apps/web/src/app/page.tsx`
- `apps/web/src/app/terms/page.tsx`
- `apps/web/src/app/privacy/page.tsx`
- `docs/task-board.md`
- `docs/project-status.md`
Notes:
- Created from user request on 2026-07-02.
- Implemented public landing, Terms, and Privacy pages with TikTok Login Kit / Display API testing compliance copy.
- No TikTok OAuth implementation, API calls, payment, or database changes were added.
Files changed:
- `apps/web/src/app/page.tsx`
- `apps/web/src/app/terms/page.tsx`
- `apps/web/src/app/privacy/page.tsx`
- `docs/task-board.md`
- `docs/project-status.md`
Build/lint/test result:
- `pnpm lint` passed on 2026-07-02 using the bundled pnpm runtime.
- `pnpm build` passed on 2026-07-02 using the bundled pnpm runtime after rerunning outside the sandbox because Turbopack could not bind a local worker port inside the sandbox.
Last updated:
- 2026-07-02

## Epic TAD-EPIC-006: TikTok Authentication

Goal:
- Prepare and implement official TikTok Login Kit authentication safely, starting with Sandbox-only readiness before any OAuth code is added.

### Story TAD-STORY-045: Authenticate with TikTok and test

Goal:
- Implement Sandbox-only OAuth after Vercel deployment and Sandbox readiness are confirmed.

### TAD-045

ID: TAD-045
Type: Task
Status: Needs Review
Priority: P0 critical
Epic: TikTok Authentication
Story: Authenticate with TikTok and test
Title: Implement TikTok OAuth connect and callback for Sandbox testing only
Goal: Implement official TikTok Login Kit OAuth connect and callback for Sandbox testing after readiness blockers are cleared.
Scope:
- Implement Sandbox-only OAuth connect and callback using official TikTok Login Kit.
- Use only env variables prepared by TAD-044.
- Keep secrets server-side.
- Add a user-facing Connect with TikTok entry point that redirects to the server connect route.
- Verify OAuth state in the callback before exchanging the authorization code.
- Exchange the authorization code for a TikTok user access token without logging or exposing token values.
Out of scope:
- Production credentials.
- TikTok Business API.
- Scraping or browser automation.
- Payment.
- Database persistence.
- Video sync or replacing mock videos with real TikTok videos.
Acceptance criteria:
- `GET /api/tiktok/connect` redirects to TikTok Login Kit with `response_type=code`, requested scopes, configured redirect URI, and CSRF state.
- `GET /api/tiktok/callback` validates state, handles user-denied errors gracefully, exchanges `code` at TikTok's token endpoint, and never prints token values.
- A visible Connect with TikTok link exists for manual Sandbox testing.
- Missing env configuration returns a safe error without revealing secret values.
- No TikTok token values are written to docs, logs, client components, `.env.example`, task board, or project status.
Dependencies:
- TAD-044
Expected files:
- `apps/web/src/app/api/tiktok/connect/route.ts`
- `apps/web/src/app/api/tiktok/callback/route.ts`
- `apps/web/src/lib/tiktok-oauth.ts`
- `apps/web/src/app/page.tsx`
- `apps/web/src/app/videos/page.tsx`
- `docs/task-board.md`
- `docs/project-status.md`
Notes:
- Next recommended task after TAD-044.
- Do not start until Sandbox credentials and redirect URI are ready outside the repository.
- Started on 2026-07-02 after user confirmed local env values were set.
- Implemented Sandbox OAuth connect and callback routes using TikTok Login Kit.
- Callback exchanges `code` for a TikTok user access token server-side, but token persistence is intentionally not included in this task.
- Manual TikTok Sandbox login must be tested by the user because it requires their TikTok account and Sandbox app setup.
- Local dev review is blocked by an existing Next dev process on port 3000 with `write EPIPE` errors; user should stop/restart that process or explicitly approve stopping it before local OAuth testing.
Files changed:
- `apps/web/src/app/api/tiktok/connect/route.ts`
- `apps/web/src/app/api/tiktok/callback/route.ts`
- `apps/web/src/lib/tiktok-oauth.ts`
- `apps/web/src/app/page.tsx`
- `apps/web/src/app/videos/page.tsx`
- `docs/task-board.md`
- `docs/project-status.md`
Build/lint/test result:
- `pnpm lint` passed on 2026-07-02 using the bundled pnpm runtime.
- `pnpm build` initially failed inside the sandbox because Turbopack could not bind a local worker port; rerunning outside the sandbox passed on 2026-07-02.
- `pnpm dev` could not start a fresh server because another Next dev process for this project is already running on port 3000.
Last updated:
- 2026-07-02

### TAD-046

ID: TAD-046
Type: Task
Status: Blocked
Priority: P0 critical
Epic: TikTok Authentication
Story: Authenticate with TikTok and test
Title: Persist TikTok OAuth tokens securely
Goal: Store TikTok user access and refresh tokens securely after Sandbox OAuth succeeds.
Scope:
- Use the existing Prisma draft models for `User`, `TikTokAccount`, and `TikTokToken`.
- Encrypt access and refresh tokens server-side before storage.
- Use `DATABASE_URL` and `TOKEN_ENCRYPTION_KEY` only from server environment variables.
- Persist connected account metadata needed for later video sync.
Out of scope:
- TikTok video sync.
- Replacing mock `/videos` data.
- Production credentials.
- TikTok Business API.
- Scraping or browser automation.
Acceptance criteria:
- Tokens are never exposed to browser/client components.
- Tokens are never logged.
- Token values are encrypted before database storage.
- Token persistence handles expiry metadata.
- No real secret values are written into repository files or docs.
Dependencies:
- TAD-045 manual Sandbox login review.
- Valid `DATABASE_URL`.
- Valid `TOKEN_ENCRYPTION_KEY`.
Expected files:
- `apps/web/src/app/api/tiktok/callback/route.ts`
- `apps/web/src/lib/prisma.ts`
- `apps/web/src/lib/tiktok-oauth.ts`
- token encryption helper file to be defined
- `docs/task-board.md`
- `docs/project-status.md`
Notes:
- Created after TAD-045 to keep token persistence separate from the first Login Kit proof.
Files changed:
- None yet.
Build/lint/test result:
- Not run yet.
Last updated:
- 2026-07-02

### TAD-047

ID: TAD-047
Type: Task
Status: Backlog
Priority: P0 critical
Epic: TikTok Authentication
Story: Authenticate with TikTok and test
Title: Sync first page of TikTok videos from Display API
Goal: Retrieve the connected user's first page of public TikTok videos through the official TikTok Display API.
Scope:
- Use the persisted TikTok user token from TAD-046.
- Fetch the first page only with `max_count = 20`.
- Store or expose Display API-shaped video rows for the Video Library.
- Preserve manual Load More behavior for later pagination.
Out of scope:
- Auto-looping through all pages.
- Fetching all videos at once.
- TikTok Business API.
- Scraping or browser automation.
- Paid CSV analysis.
Acceptance criteria:
- The sync uses official TikTok Display API only.
- Initial sync fetches only the first page.
- No access token or refresh token is exposed to the client.
- `/videos` can be prepared to swap from mock rows to synced rows in a later UI task.
Dependencies:
- TAD-046.
Expected files:
- `apps/web/src/app/api/tiktok/sync-videos/route.ts`
- `apps/web/src/lib/tiktok-display-api.ts`
- `apps/web/src/lib/prisma.ts`
- `docs/task-board.md`
- `docs/project-status.md`
Notes:
- Created after TAD-045 to keep real video retrieval separate from OAuth login.
Files changed:
- None yet.
Build/lint/test result:
- Not run yet.
Last updated:
- 2026-07-02
