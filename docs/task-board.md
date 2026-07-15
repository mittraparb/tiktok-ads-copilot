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
- 2026-07-15

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
- The page now links to `/videos/[id]` from the video title and detail action after TAD-011.
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
Status: Done
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
- Started on 2026-07-15.
- Implemented on 2026-07-15.
- Added dynamic `/videos/[id]` detail route. It uses synced TikTokVideo rows when a connected account has synced rows and safely falls back to the mock Display API-shaped dataset otherwise.
- Detail page shows video metric summary, Pre-Boost Score, recommendation, suggested budget, trend delta, Display API scoring signals versus monthly benchmarks, reasons, risks, and creative notes from title/caption/duration/engagement mix.
- `/videos` cards now link to the detail page from the video title and score-panel action.
- No unsupported metrics were added. The detail page does not show saves/favorites, watch time, retention, profile visits, follows gained, traffic source, or top comments.
- Added the active ngrok host to `next.config.ts` `allowedDevOrigins` so browser testing through ngrok can use Next.js dev resources cleanly.
- User accepted TAD-011 on 2026-07-15 after confirming they can open video details from the Video Library.
- User acceptance hit TikTok Login Kit error `non_sandbox_target` on 2026-07-15. Local env points to Sandbox and the active ngrok callback, so this appears to require TikTok Developer Portal Sandbox target-user/client-key settings review before connected-account testing can pass.
- Fixed an app-side OAuth issue found during the `non_sandbox_target` investigation: PKCE `S256` code challenges are now SHA-256 base64url instead of hex.
- Added `GET /api/tiktok/debug-config` as a safe non-secret diagnostic endpoint for OAuth shape checks. It reports hosts, paths, scope names, boolean config presence, and a short client-key fingerprint only; it does not return secrets, tokens, cookies, or verifier values.
- Replaced `next/link` OAuth start links with plain `<a>` navigation on `/` and `/videos` after dev-server logs showed client navigation can request `/api/tiktok/connect` twice. This avoids overwriting the CSRF state and PKCE verifier cookies before TikTok returns to the callback.
- User retested at 2026-07-15 10:44 Bangkok time and still received TikTok Login Kit `non_sandbox_target` after login. Dev-server logs show `/api/tiktok/connect` returned a TikTok 307 redirect, but no matching `/api/tiktok/callback` request arrived for that failed attempt. The failure is occurring inside TikTok before the app receives control, so the remaining blocker is TikTok Developer Portal Sandbox target-user / Sandbox client configuration.
- Added `disable_auto_auth=1` to the TikTok authorization URL for Sandbox testing so TikTok does not silently reuse an existing web authorization session during Login Kit tests.
- Verified the live outbound request/response through ngrok after user granted permission to inspect request and response: `/api/tiktok/connect` returns HTTP 307 to `https://www.tiktok.com/v2/auth/authorize/` with `client_key`, exact ngrok callback, response type `code`, scopes `user.info.basic,user.info.profile,user.info.stats,video.list`, 64-character state, 43-character base64url PKCE challenge, `S256`, and `disable_auto_auth=1`. A direct pre-login request to that TikTok authorize URL returned HTTP 302 to `https://www.tiktok.com/login` with a Sandbox-looking `enter_from` value, which confirms TikTok accepts the authorize request shape before account login.
Files changed:
- `apps/web/next.config.ts`
- `apps/web/src/app/page.tsx`
- `apps/web/src/app/api/tiktok/debug-config/route.ts`
- `apps/web/src/app/videos/[id]/page.tsx`
- `apps/web/src/app/videos/videos-client-page.tsx`
- `apps/web/src/lib/tiktok-oauth.ts`
- `AGENTS.md`
- `docs/task-board.md`
- `docs/task-workflow.md`
- `docs/project-status.md`
Build/lint/test result:
- `pnpm lint` passed on 2026-07-15.
- `pnpm build` initially hit the known Turbopack sandbox port-binding issue, then passed on 2026-07-15 when rerun outside the sandbox.
- Local HTTP checks passed on 2026-07-15: `/videos` returned 200 and `/videos/743100000000000001` returned 200 from the dev server.
- Active ngrok checks passed on 2026-07-15 after dev-server restart: `https://ravishing-refusal-abrasive.ngrok-free.dev/videos` returned 200 and `https://ravishing-refusal-abrasive.ngrok-free.dev/videos/743100000000000001` returned 200.
- OAuth shape check passed on 2026-07-15 through active ngrok: `/api/tiktok/debug-config` returned Sandbox app mode, callback host `ravishing-refusal-abrasive.ngrok-free.dev`, callback path `/api/tiktok/callback`, scopes `user.info.basic,user.info.profile,user.info.stats,video.list`, and a 43-character `S256` code challenge.
- TikTok redirect check passed on 2026-07-15 through active ngrok: `/api/tiktok/connect` redirects to `https://www.tiktok.com/v2/auth/authorize/` with the active ngrok callback, CSRF state, PKCE `code_challenge_method=S256`, and 43-character code challenge.
- Second OAuth incident check passed on 2026-07-15 after converting OAuth start links to plain anchors: `pnpm lint` passed, `pnpm build` passed after the known outside-sandbox Turbopack rerun, active ngrok `/videos` returned 200, `/api/tiktok/debug-config` returned 200, and `/api/tiktok/connect` returned one TikTok 307 redirect with expected OAuth cookies, active ngrok callback, 64-character state, and 43-character `S256` code challenge.
- Safe dependency check passed on 2026-07-15: the Next.js dev server is running on port 3000, active ngrok is serving the app, required local env variables are present without printing secret values, and Prisma can reach the configured database with 1 user, 1 TikTok account, 1 token row, and 3 video rows.
- Latest failed user retest evidence: after the user reported TikTok error ID `20260715104405BFF77694C697354A2F2C`, the dev-server log showed the connect route was hit and redirected to TikTok, but no callback route was hit for that failed login attempt.
- Request/response verification passed on 2026-07-15 after adding `disable_auto_auth=1`: `pnpm lint` passed, `pnpm build` passed after the known outside-sandbox Turbopack rerun, active ngrok `/api/tiktok/connect` returned HTTP 307 to TikTok with the expected non-secret OAuth parameters, and TikTok's pre-login response to the authorize URL returned HTTP 302 to `/login`.
- User acceptance passed on 2026-07-15: user confirmed they can view video detail pages.
Last updated:
- 2026-07-15

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
Status: Done
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
- `GET /api/tiktok/connect` redirects to TikTok Login Kit with `response_type=code`, requested scopes, configured redirect URI, CSRF state, and PKCE `code_challenge` using `S256`.
- `GET /api/tiktok/callback` validates state, handles user-denied errors gracefully, exchanges `code` with the matching PKCE `code_verifier` at TikTok's token endpoint, and never prints token values.
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
- Added PKCE support after TikTok login returned a `code_challenge` app settings error: the connect route now sends `code_challenge` and `code_challenge_method=S256`; the callback route sends the matching server-only `code_verifier` during token exchange.
- Investigated TikTok `redirect_uri` login error on 2026-07-03. The running local app was sending `https://tiktok-ads-copilot.vercel.app/api/tiktok/callback`; local `.env.local` was aligned for local testing to send `http://localhost:3000/api/tiktok/callback` instead.
- After local env alignment and dev-server restart, `/api/tiktok/connect` returns a TikTok redirect with `redirect_uri=http://localhost:3000/api/tiktok/callback`, scopes `user.info.basic,video.list`, and PKCE `code_challenge_method=S256`.
- TikTok Developer Portal Sandbox settings must contain the exact same redirect URI as the running app; otherwise TikTok will continue to reject login with `redirect_uri` before the app callback runs.
- TikTok Developer Portal does not accept localhost redirect URIs for this app setup, so local Sandbox OAuth testing needs an HTTPS tunnel such as ngrok.
- Attempted to start ngrok on 2026-07-03 with `pnpm dlx ngrok http 3000`; ngrok failed with `ERR_NGROK_4018` because no ngrok authtoken is configured on this machine. The token must be configured locally by the user and must not be pasted into chat, docs, or committed files.
- Added `.ngrok/ngrok.yml.example` and ignored `.ngrok/ngrok.yml` so the user can place their ngrok authtoken in a local config file without committing it.
- Started ngrok successfully on 2026-07-03 using the local ignored config. Active tunnel: `https://ravishing-refusal-abrasive.ngrok-free.dev`.
- Updated local `.env.local` URL fields to use the ngrok tunnel for TAD-045 testing. The running connect route now sends `redirect_uri=https://ravishing-refusal-abrasive.ngrok-free.dev/api/tiktok/callback`.
- After a successful Sandbox login on 2026-07-03, updated the `/videos` connected account card to read server-side OAuth status cookies and show a real connected Login Kit state instead of the mock-account-only message.
- The connected account card now shows safe session metadata only: connected state, granted scopes, and session expiry. It does not display or persist access tokens, refresh tokens, copied credentials, cookies, or real video data.
- `/videos` was split into a server wrapper and client component so the page can read httpOnly OAuth cookies while preserving the existing interactive filter/sort UI.
- Updated the callback to fetch TikTok Display API `/v2/user/info/` after token exchange and store safe connected account metadata in an httpOnly cookie. The card can now show real display name, avatar, username, verification badge, public video count, followers, following, and likes when TikTok grants the required scopes.
- Expanded Sandbox Login Kit requested scopes to `user.info.basic`, `user.info.profile`, `user.info.stats`, and `video.list`. `user.info.stats` is required for total public video count and account stats; if TikTok does not grant it, the UI shows an unavailable/scope-needed state instead of fake values.
- Fixed stale connected-account state on 2026-07-03: `/api/tiktok/connect` now clears previous connected-account cookies before starting a new OAuth flow, and `/videos` no longer treats an old `tad_tiktok_connected=1` cookie as a complete account unless the real profile cookie exists.
- The callback now rejects successful token exchange when TikTok does not grant the scopes required for the card values, and shows the missing scope names instead of setting a misleading connected state.
- Callback exchanges `code` for a TikTok user access token server-side, but token persistence is intentionally not included in this task.
- Manual TikTok Sandbox login succeeded on 2026-07-03; connected account card behavior was implemented and verified with safe profile-cookie checks.
- Local dev server was restarted successfully on port 3000 after clearing the old stuck process.
Files changed:
- `.gitignore`
- `.ngrok/ngrok.yml.example`
- `apps/web/src/app/api/tiktok/connect/route.ts`
- `apps/web/src/app/api/tiktok/callback/route.ts`
- `apps/web/src/app/videos/page.tsx`
- `apps/web/src/app/videos/videos-client-page.tsx`
- `apps/web/src/lib/tiktok-oauth.ts`
- `apps/web/src/app/page.tsx`
- `docs/task-board.md`
- `docs/project-status.md`
Build/lint/test result:
- `pnpm lint` passed on 2026-07-02 using the bundled pnpm runtime.
- `pnpm build` initially failed inside the sandbox because Turbopack could not bind a local worker port; rerunning outside the sandbox passed on 2026-07-02.
- `pnpm dev` could not start a fresh server because another Next dev process for this project is already running on port 3000.
- PKCE fix verification: `pnpm lint` passed on 2026-07-02 after rerunning with registry/network access for pnpm's dependency check.
- PKCE fix verification: `pnpm build` hit the known Turbopack sandbox port-binding issue, then passed on 2026-07-02 when rerun outside the sandbox.
- Redirect URI troubleshooting verification: local dev server was restarted on 2026-07-03 and `/api/tiktok/connect` was checked without printing client key or secrets. It now sends the local callback URL from `.env.local`.
- ngrok tunnel verification passed on 2026-07-03. Localhost and ngrok root both returned HTTP 200, and `/api/tiktok/connect` redirects to TikTok with the ngrok callback URL plus PKCE `S256`.
- Connected account card verification passed on 2026-07-03. Without OAuth cookies, `/videos` renders the mock/disconnected state; with safe connected cookies, `/videos` renders the connected Sandbox state, granted scopes, and reconnect action.
- `pnpm lint` passed on 2026-07-03 after the connected account card update.
- `pnpm build` hit the known Turbopack sandbox port-binding issue, then passed on 2026-07-03 when rerun outside the sandbox.
- Real profile card verification passed on 2026-07-03 with safe fake profile cookies. The card rendered display name, username, verified badge, public video count, follower/following/like labels, and reconnect action.
- TikTok connect redirect verification passed on 2026-07-03 with the ngrok callback URL, PKCE `S256`, and requested scopes `user.info.basic,user.info.profile,user.info.stats,video.list`.
- Stale connected-cookie verification passed on 2026-07-03. A legacy `tad_tiktok_connected=1` cookie without profile metadata now renders a reconnect-required state instead of generic `TikTok Sandbox account` / unavailable stats.
- Complete profile-cookie verification passed on 2026-07-03. Safe fake profile data rendered display name, username, verification badge, total public videos, followers, following, likes, and reconnect action.
- Manual TikTok Sandbox login succeeded on 2026-07-03, and the user confirmed the milestone before closeout.
Last updated:
- 2026-07-03

### TAD-046

ID: TAD-046
Type: Task
Status: Done
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
- Started on 2026-07-04 after user selected TAD-046 for today's work.
- Implemented server-only AES-256-GCM token encryption using `TOKEN_ENCRYPTION_KEY`.
- Implemented TikTok OAuth token persistence through Prisma upserts for `User`, `TikTokAccount`, and `TikTokToken`.
- The OAuth callback now persists encrypted access and refresh token values before setting the connected-account cookies.
- Token expiry and refresh-token expiry are stored from TikTok `expires_in` and `refresh_expires_in`.
- Token values are not logged, rendered, stored in cookies, or exposed to client components.
- Runtime persistence was verified on 2026-07-04 after Neon `DATABASE_URL` and `TOKEN_ENCRYPTION_KEY` were added locally outside the repository.
- `pnpm exec prisma db push` synced the Prisma schema to Neon on 2026-07-04.
- Safe Neon verification found one `User`, one `TikTokAccount`, and one `TikTokToken`; encrypted access and refresh token values start with `v1:` and expiry/scope metadata is present.
Files changed:
- `apps/web/src/app/api/tiktok/callback/route.ts`
- `apps/web/src/lib/tiktok-oauth.ts`
- `apps/web/src/lib/tiktok-token-store.ts`
- `apps/web/src/lib/token-encryption.ts`
- `docs/task-board.md`
- `docs/project-status.md`
Build/lint/test result:
- `pnpm lint` passed on 2026-07-04 using the bundled pnpm runtime.
- `pnpm build` initially hit the known Turbopack sandbox port-binding issue, then passed on 2026-07-04 when rerun outside the sandbox.
- `pnpm exec prisma db push` passed on 2026-07-04 against Neon Postgres.
- Safe Prisma DB verification passed on 2026-07-04 without printing token values.
Last updated:
- 2026-07-04

### TAD-047

ID: TAD-047
Type: Task
Status: Done
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
- Moved to Ready on 2026-07-04 after TAD-046 token persistence was verified in Neon.
- Started on 2026-07-04 after user selected TAD-047.
- Implemented official TikTok Display API `/v2/video/list/` first-page sync with `max_count = 20`.
- The sync route decrypts the persisted access token server-side only, fetches the first page, and never returns or logs access/refresh token values.
- Synced TikTok Display API fields: `id`, `create_time`, `cover_image_url`, `share_url`, `video_description`, `duration`, `title`, `like_count`, `comment_count`, `share_count`, and `view_count`.
- Upserts synced rows into `TikTokVideo` and updates `TikTokAccount.lastSyncedAt`.
- Runtime sync verification on 2026-07-04 returned 3 videos, `hasMore=false`, and stored 3 `TikTokVideo` rows in Neon.
Files changed:
- `apps/web/src/app/api/tiktok/sync-videos/route.ts`
- `apps/web/src/lib/tiktok-display-api.ts`
- `docs/task-board.md`
- `docs/project-status.md`
Build/lint/test result:
- `pnpm lint` passed on 2026-07-04 using the bundled pnpm runtime.
- `pnpm build` passed on 2026-07-04 when run outside the sandbox for the known Turbopack worker port issue.
- Runtime `POST /api/tiktok/sync-videos` passed on 2026-07-04 with `syncedCount=3`, `skippedCount=0`, and `hasMore=false`.
- Safe Prisma DB verification passed on 2026-07-04 with one synced account and three stored video rows.
Last updated:
- 2026-07-04

### TAD-048

ID: TAD-048
Type: Task
Status: Done
Priority: P0 critical
Epic: TikTok Authentication
Story: Authenticate with TikTok and test
Title: Wire synced TikTok videos into Video Library
Goal: Let the app read synced TikTokVideo rows from Neon so the Video Library can move from mock rows toward real Display API rows.
Scope:
- Add `GET /api/videos` or an equivalent server-side data reader using existing planned API direction.
- Read TikTokVideo rows for the connected account.
- Return or render Display API-shaped rows without exposing tokens.
- Keep the existing mock UI fallback when no synced rows exist.
- Preserve deterministic Pre-Boost scoring based only on supported Display API fields.
Out of scope:
- Fetching another Display API page.
- Auto-looping through all pages.
- Token refresh.
- Paid CSV analysis.
- TikTok Business API.
- Scraping or browser automation.
Acceptance criteria:
- `/videos` can display synced rows or safely fall back to mock rows.
- No access token or refresh token reaches client components.
- Synced row shape remains compatible with `TikTokDisplayVideo`.
- Mock fallback remains available for demo safety.
Dependencies:
- TAD-047.
Expected files:
- `apps/web/src/app/api/videos/route.ts`
- `apps/web/src/app/videos/page.tsx`
- `apps/web/src/app/videos/videos-client-page.tsx`
- `apps/web/src/lib/pre-boost.ts`
- `docs/task-board.md`
- `docs/project-status.md`
Notes:
- Created on 2026-07-04 after TAD-047 synced 3 public videos into Neon.
- Implemented on 2026-07-06. `/videos` now reads synced TikTokVideo rows for the connected account and falls back to mock Display API-shaped rows when no synced rows exist.
- `GET /api/videos` returns safe Display API-shaped video rows and non-sensitive account metadata only. It does not return access tokens, refresh tokens, encrypted token values, or account identifiers.
- User acceptance passed on 2026-07-06 after testing through the ngrok HTTPS origin.
- Acceptance testing for synced rows should use the active ngrok HTTPS origin, not localhost, because TikTok connected cookies are scoped to the OAuth callback host.
- Synced rows had `cover_image_url` values from a fresh TikTok API sync, but some TikTok CDN covers may fail, block, expire, or hang in the browser. The Video Library now falls back to a designed cover state when a synced cover image is missing, fails to load, or does not load within 2.5 seconds.
Files changed:
- `apps/web/src/app/api/videos/route.ts`
- `apps/web/src/app/videos/page.tsx`
- `apps/web/src/app/videos/videos-client-page.tsx`
- `apps/web/src/lib/tiktok-videos.ts`
- `apps/web/src/lib/pre-boost.ts`
- `docs/task-board.md`
- `docs/project-status.md`
Build/lint/test result:
- `pnpm lint` passed on 2026-07-06.
- `pnpm build` passed on 2026-07-06 after rerunning outside the sandbox for the known Turbopack worker port issue.
- Safe Prisma/Neon shape check passed on 2026-07-06 with `source=synced`, `count=3`, and `firstHasDisplayApiShape=true`.
- Safe cover URL check passed on 2026-07-06 with 3 of 3 synced rows having `cover_image_url`; browser rendering still depends on TikTok CDN availability, so UI fallback is required.
- Fresh TikTok sync check passed on 2026-07-06 with 3 of 3 API-returned rows having `cover_image_url`; client cover fallback timeout added and `pnpm lint` / `pnpm build` passed again after the change.
- User confirmed TAD-048 passed on 2026-07-06.
Last updated:
- 2026-07-06

### TAD-052

ID: TAD-052
Type: Bug
Status: Needs Review
Priority: P0 critical
Epic: TikTok Authentication
Story: Authenticate with TikTok and test
Title: Refresh synced videos after TikTok reconnect
Goal: Ensure the connected Video Library shows the latest TikTok Display API rows and fresh cover URLs after a successful Login Kit reconnect.
Scope:
- Document the resolved `non_sandbox_target` Sandbox Login Kit lesson.
- Refresh TikTok Display API video rows immediately after successful OAuth callback token persistence.
- Reuse the same sync implementation for callback sync and manual `POST /api/tiktok/sync-videos`.
- Remove stale DB video rows when TikTok returns a complete first page with `has_more=false`.
- Avoid prematurely marking slow TikTok CDN covers as unavailable.
Out of scope:
- Fetching additional Display API pages beyond the first page.
- Token refresh flow.
- TikTok Business API.
- Scraping TikTok or browser automation.
- Unsupported metrics such as saves/favorites, watch time, retention, or profile visits per video.
Acceptance criteria:
- Successful TikTok reconnect refreshes the synced Video Library before the user opens `/videos`.
- Manual `POST /api/tiktok/sync-videos` and callback sync use the same persistence logic.
- Current Sandbox account sync stores 5 Display API videos and 5 cover URLs.
- Video Library no longer marks covers unavailable only because they take more than 2.5 seconds to load.
- Test handoff includes the active ngrok URL and DoD.
Dependencies:
- TAD-045
- TAD-046
- TAD-047
- TAD-048
Expected files:
- `AGENTS.md`
- `docs/task-workflow.md`
- `docs/task-board.md`
- `docs/project-status.md`
- `apps/web/src/app/api/tiktok/callback/route.ts`
- `apps/web/src/app/api/tiktok/sync-videos/route.ts`
- `apps/web/src/app/videos/videos-client-page.tsx`
- `apps/web/src/lib/tiktok-token-store.ts`
- `apps/web/src/lib/tiktok-video-sync.ts`
Notes:
- Created on 2026-07-15 after user confirmed Login Kit now works but reported only 3 videos and unavailable covers while TikTok has 5 videos.
- Root cause: Login Kit reconnect persisted fresh token/profile but did not automatically refresh the video list. `/videos` was showing stale Neon rows last synced on 2026-07-06, including signed TikTok CDN cover URLs that could expire or load slowly.
- Durable OAuth lesson recorded: use `disable_auto_auth=1` during Sandbox testing; if `non_sandbox_target` appears after login and callback is not reached, inspect Sandbox target-user/session state instead of repeatedly changing the callback route.
- Manual fresh sync on 2026-07-15 returned 5 videos from TikTok Display API, `hasMore=false`, and 5 non-empty `cover_image_url` values.
- One returned cover URL was fetched directly and returned HTTP 200 with `image/webp`, confirming at least fresh TikTok cover URLs are reachable outside the app.
- Callback now runs video sync immediately after token persistence when `video.list` is granted. Sync failure is non-fatal to login and is shown in the callback success page.
- `POST /api/tiktok/sync-videos` now uses shared sync logic from `apps/web/src/lib/tiktok-video-sync.ts`.
- The list cover component no longer uses a 2.5 second timeout to mark covers unavailable. It only falls back when the image fails to load.
Files changed:
- `AGENTS.md`
- `docs/task-workflow.md`
- `docs/task-board.md`
- `docs/project-status.md`
- `apps/web/src/app/api/tiktok/callback/route.ts`
- `apps/web/src/app/api/tiktok/sync-videos/route.ts`
- `apps/web/src/app/videos/videos-client-page.tsx`
- `apps/web/src/lib/tiktok-token-store.ts`
- `apps/web/src/lib/tiktok-video-sync.ts`
Build/lint/test result:
- `POST /api/tiktok/sync-videos` through active ngrok passed on 2026-07-15 with `syncedCount=5`, `hasMore=false`, `skippedCount=0`, `deletedStaleCount=0`, and 5 returned `cover_image_url` values after the shared sync helper refactor.
- Safe Prisma check passed on 2026-07-15 with 5 synced TikTokVideo rows and 5 non-empty cover URLs for the connected account.
- Dev-server log showed successful callback on 2026-07-15: `/api/tiktok/callback` returned 200, then `/videos` returned 200.
- `pnpm lint` passed on 2026-07-15.
- `pnpm build` initially hit the known Turbopack sandbox port-binding issue, then passed on 2026-07-15 when rerun outside the sandbox.
Last updated:
- 2026-07-15

### TAD-051

ID: TAD-051
Type: Bug
Status: Backlog
Priority: P0 critical
Epic: TikTok Authentication
Story: Authenticate with TikTok and test
Title: Add saved/favourite count to Video Library metric row
Goal: Change the Video Library metric row from `Views / Likes / Comments / Shares` to `Views / Likes / Comments / Saved or Favourite / Shares` and persist the saved/favourite count when an official TikTok API source is available.
Scope:
- Update the Video Library UI metric row to include `Saved or Favourite` between `Comments` and `Shares`.
- Add a database field for saved/favourite count only when there is an official source for this value.
- Map the official TikTok API saved/favourite count into the database and UI if TikTok exposes it in an approved API.
- Keep scoring deterministic and do not make saved/favourite required for the core Pre-Boost formula unless an official API field exists.
- Review and update all dependent surfaces if the field becomes officially available: mock data, `TikTokDisplayVideo` type, sync route, API route output, video row mapper, monthly benchmark card, engagement-rate calculation, score formula, reasons/risks copy, sort/filter controls, and documentation/compliance copy.
Out of scope:
- Scraping TikTok.
- Browser automation.
- Asking for TikTok cookies, sessions, copied tokens, or credentials.
- Inferring saved/favourite counts from unofficial sources.
- Showing fake saved/favourite numbers.
Acceptance criteria:
- The Video Library shows `Views`, `Likes`, `Comments`, `Saved or Favourite`, and `Shares` in that order.
- The saved/favourite value is persisted in the database from an official TikTok API field.
- The saved/favourite value shown in the UI matches the official TikTok API value.
- If no official API field exists, the task remains Blocked and the UI must not claim a real saved/favourite number.
Dependencies:
- Official TikTok API support for per-video saved/favourite count.
- Product decision if a manual saved/favourite input should be allowed as an alternative.
Expected files:
- `apps/web/prisma/schema.prisma`
- `apps/web/src/app/api/tiktok/sync-videos/route.ts`
- `apps/web/src/lib/tiktok-display-api.ts`
- `apps/web/src/lib/tiktok-videos.ts`
- `apps/web/src/lib/pre-boost.ts`
- `apps/web/src/lib/mock-data.ts`
- `apps/web/src/app/videos/videos-client-page.tsx`
- `apps/web/src/app/terms/page.tsx`
- `apps/web/src/app/privacy/page.tsx`
- `docs/task-board.md`
- `docs/project-status.md`
Notes:
- Created on 2026-07-06 after user requested `Saved or Favourite` in the Video Library metric row.
- Moved to Backlog on 2026-07-06. Keep as P0 critical because it is a valuable missing signal, but do not implement until TikTok provides an official saved/favourite source or the product approves a clearly manual input path.
- Backlog reason: TikTok Display API currently returns `id`, `create_time`, `cover_image_url`, `share_url`, `video_description`, `duration`, `title`, `like_count`, `comment_count`, `share_count`, and `view_count`, but not saves/favorites.
- `AGENTS.md` explicitly states TikTok Display API does not provide saves/favorites and the core scoring formula must not require those fields.
- Clarification from user on 2026-07-06: the product can calculate month-to-date projection itself. Example: previous month total saved = 100; current month saved = 10 on day 10; with 20 days left, estimate current month pace and compare projected month-end saved value against previous month. This projection algorithm is feasible, but it still requires a raw saved/favourite input source first.
- Recommended algorithm once saved/favourite input exists:
  - `elapsedDays = current day of month`
  - `daysInMonth = number of days in current month`
  - `remainingDays = daysInMonth - elapsedDays`
  - `currentDailyPace = currentMonthSaved / elapsedDays`
  - `projectedMonthSaved = currentDailyPace * daysInMonth`
  - `projectionDelta = projectedMonthSaved - previousMonthSaved`
  - `projectionDeltaPercent = previousMonthSaved > 0 ? projectionDelta / previousMonthSaved * 100 : null`
  - Also normalize by current-month video count where useful: `savedPerVideo = currentMonthSaved / currentMonthVideoCount` and `projectedSavedPerVideo = projectedMonthSaved / currentMonthVideoCount`.
- The UI copy must label this clearly as a projection, for example `Projected saved/favourite based on month-to-date pace`, not as a TikTok-provided value.
- Impact review on 2026-07-06 found these specific surfaces would need changes if an official saved/favourite field exists:
  - Raw Display API field allowlist in `apps/web/src/lib/tiktok-display-api.ts`.
  - Prisma `TikTokVideo` model and migration/database push.
  - Sync upsert payload and `POST /api/tiktok/sync-videos` safe response.
  - `GET /api/videos` and `apps/web/src/lib/tiktok-videos.ts` row mapping.
  - `TikTokDisplayVideo`, `MonthlyBenchmark`, and `PreBoostAnalysis` types.
  - `analyzePreBoostVideo` metrics: engagement rate, saved/favourite rate, trend delta, scoring weights, reasons, and risks.
  - `monthlyBenchmark` mock values and all mock TikTok video rows.
  - `/videos` metric cards: first metric row, second rate row, monthly trend panel, sort options, and any "above trend" copy.
  - Terms/Privacy/public copy listing TikTok Display API metrics.
- Safe alternative later: create a separate task for optional manual saved/favourite input, clearly labelled as manual, not API-synced.
Files changed:
- `docs/task-board.md`
- `docs/project-status.md`
Build/lint/test result:
- Not run; task status/docs update only.
Last updated:
- 2026-07-06
