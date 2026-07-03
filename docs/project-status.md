# TikTok Ads Co-Pilot Project Status

## 1. Current Snapshot

Current phase:
- Phase 1: Mock Product UI

Current goal:
- TAD-045 TikTok Sandbox OAuth login is complete for today's scope. The app has Login Kit connect/callback, PKCE, ngrok local HTTPS callback testing, TikTok user profile/stat fetch, and a `/videos` connected account card that can display real TikTok profile/stat fields after Login Kit connection. The next implementation task is TAD-046 token persistence, after database/encryption env prerequisites are confirmed.

Current stack:
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- lucide-react
- Recharts
- TanStack Table
- React Hook Form
- Zod
- Prisma
- PostgreSQL
- TikTok Display API
- OAuth/Login Kit
- Vercel
- pnpm only

Current product direction:
- Phase 1: Mock Product UI
- Phase 2: TikTok Connect + Video Library
- Phase 3: Database Foundation
- Phase 4: Real TikTok OAuth + Video Sync
- Phase 5: Paid CSV Analyzer
- Phase 6: Brand Report Generator

## 2. Repository Inspection

- Existing routes: Partial
  - `apps/web/src/app/page.tsx` is now a public landing page with footer links to Terms and Privacy.
  - `apps/web/src/app/dashboard/page.tsx` exists.
  - `apps/web/src/app/videos/page.tsx` exists.
  - `apps/web/src/app/terms/page.tsx` exists.
  - `apps/web/src/app/privacy/page.tsx` exists.
  - `apps/web/src/app/api/tiktok/connect/route.ts` exists.
  - `apps/web/src/app/api/tiktok/callback/route.ts` exists.
  - `/videos/[id]` is missing.
  - `/reports/preview` is missing and is now treated as a later Phase 1B task, not required before TikTok API planning.
  - TikTok OAuth API routes exist for Sandbox login testing, but video sync routes do not exist yet.
- Existing components: Partial
  - Dashboard components exist: `app-shell.tsx`, `recommendation-badge.tsx`, `spend-views-chart.tsx`.
  - shadcn/ui-style primitives exist for badge, button, card, dialog, dropdown menu, input, progress, select, separator, table, tabs, and textarea.
  - Video Library UI now exists in the `/videos` page.
  - Public landing, Terms, and Privacy pages now exist for TikTok developer compliance setup.
  - Dedicated video detail, CSV upload, campaign table, and report preview components are missing.
- Existing mock data files: Partial
  - `apps/web/src/lib/mock-data.ts` exists with mock campaigns, videos, daily performance, recommendations, dashboard metrics, and recommendation labels.
  - `apps/web/src/lib/mock-data.ts` now includes TikTok Display API-shaped mock videos using only approved Display API fields.
  - `apps/web/src/lib/pre-boost.ts` exists with deterministic mock Pre-Boost scoring, benchmark comparison, reasons, risks, recommendations, budget tiers, and formula version.
  - Existing dashboard mock recommendations still use paid-style statuses: `BOOST`, `WAIT`, `PAUSE`, `FIX_CREATIVE`.
- Existing task board status: Updated
  - TAD-010 mock `/videos` page is Done after repository inspection.
  - TAD-011 mock `/videos/[id]` detail page is Ready and missing.
  - TAD-020 scoring engine extraction is Done after repository inspection.
  - TAD-021 monthly trend benchmark scoring is Done after repository inspection.
  - TAD-043 developer compliance pages are Done.
  - TAD-044 Vercel deployment and TikTok Sandbox readiness is Done.
  - TAD-045 Sandbox-only OAuth connect/callback is Done after successful Sandbox login, real connected profile card update, PKCE fix, and ngrok redirect alignment.
  - TAD-046 token persistence is Blocked until database/encryption env values are ready.
  - TAD-047 first-page TikTok video sync is Backlog and depends on TAD-046.
  - TAD-050 Prisma schema review is Done after repository inspection.
- Existing docs: Partial
  - `AGENTS.md` exists.
  - `docs/tiktok-display-api-plan.md` exists.
  - `docs/project-status.md` now exists.
  - `docs/task-board.md` now exists with Jira-style Epics, Stories, and task IDs.
  - `docs/task-workflow.md` now exists with statuses, task fields, priorities, and operating rules.
  - `docs/tiktok-sandbox-readiness.md` now exists with Sandbox credential and environment safety guidance.
  - `docs/vercel-deployment-checklist.md` now exists with Vercel Hobby/free deployment settings and TikTok URL formats.
  - `docs/vercel-vs-ngrok.md` now exists and explains why Vercel is the main public URL while ngrok is only temporary local callback debugging.
  - `apps/web/README.md` is still the default Next.js starter README and needs product-specific cleanup later.
- Existing config files: Done
  - `apps/web/package.json`
  - `apps/web/pnpm-lock.yaml`
  - `apps/web/pnpm-workspace.yaml`
  - `apps/web/next.config.ts`
  - `apps/web/tsconfig.json`
  - `apps/web/eslint.config.mjs`
  - `apps/web/postcss.config.mjs`
  - `apps/web/components.json`
  - `apps/web/.env.example`
  - `apps/web/prisma/schema.prisma`
- Environment safety files: Done
  - `.gitignore` ignores `.env`, `.env.local`, and `.env.*.local`.
  - `apps/web/.env.example` contains variable names only, including `TIKTOK_APP_ENV`, `TIKTOK_CLIENT_KEY`, `TIKTOK_CLIENT_SECRET`, `TIKTOK_REDIRECT_URI`, `NEXT_PUBLIC_APP_URL`, `DATABASE_URL`, and `TOKEN_ENCRYPTION_KEY`.
- Package manager detected: Done
  - pnpm is detected through `apps/web/pnpm-lock.yaml` and `apps/web/pnpm-workspace.yaml`.
  - No root `package.json` or root workspace file was found.
- Build/lint status: Done
  - `pnpm lint` passed on 2026-07-02 using the bundled pnpm runtime.
  - `pnpm build` passed on 2026-07-02 using the bundled pnpm runtime.
- Any missing expected files: Partial
  - Missing Phase 1 required route: `/videos/[id]`.
  - Missing later Phase 1B route: `/reports/preview`.
  - Missing Phase 1 required UI surface: video detail with Boost Score.
  - CSV upload UI, campaign performance table polish, and brand report preview are later Phase 1B surfaces, not blockers for TikTok API planning.
  - Missing API route directory, which is acceptable for the current Phase 1: Mock Product UI unless explicitly needed.
  - Missing database migration files; Prisma schema exists as a draft and has now been reviewed in TAD-050, but database implementation should remain inactive until explicitly requested.

## 3. Completed Work

| Date | Phase | Work Completed | Files Changed | Notes |
|---|---|---|---|---|
| Unknown | Phase 1: Mock Product UI | Created initial Next.js app shell and dashboard route with mock metrics, recommendation card, spend vs views chart, and top videos table. | `apps/web/src/app/dashboard/page.tsx`, `apps/web/src/components/dashboard/app-shell.tsx`, `apps/web/src/components/dashboard/recommendation-badge.tsx`, `apps/web/src/components/dashboard/spend-views-chart.tsx`, `apps/web/src/lib/mock-data.ts` | Current dashboard is mock-data only. |
| Unknown | Planning | Documented TikTok Display API Phase 2 plan. | `docs/tiktok-display-api-plan.md` | Plan uses official OAuth/Login Kit and Display API only. Real OAuth/video sync implementation belongs to Phase 4. |
| Unknown | Phase 3: Database Foundation | Added Prisma schema draft for `User`, `TikTokAccount`, `TikTokToken`, `TikTokVideo`, and `PreBoostScore`. | `apps/web/prisma/schema.prisma`, `apps/web/src/lib/prisma.ts` | TAD-050 reviewed this as a draft; no migrations exist yet. |
| 2026-07-02 | Planning | Created single source-of-truth project status file and added operating rule to AGENTS.md. | `docs/project-status.md`, `AGENTS.md` | Documentation-only task. |
| 2026-07-02 | Phase 1: Mock Product UI | Added mock `/videos` Video Library with Display API-shaped mock data, monthly benchmark panel, client-side search/filter/sort, deterministic Pre-Boost scoring, and navigation entry. | `apps/web/src/app/videos/page.tsx`, `apps/web/src/lib/pre-boost.ts`, `apps/web/src/lib/mock-data.ts`, `apps/web/src/components/dashboard/app-shell.tsx`, `docs/project-status.md` | Mock data only; no TikTok OAuth/API, backend routes, database persistence, or Prisma changes. |
| 2026-07-02 | Planning | TAD-002 created a Jira-style task board and task workflow, and updated AGENTS.md to require task-board tracking for future work. | `docs/task-board.md`, `docs/task-workflow.md`, `AGENTS.md`, `docs/project-status.md` | Documentation-only task. `pnpm lint` and `pnpm build` passed using the bundled pnpm runtime. |
| 2026-07-02 | Planning | TAD-003 reconciled the task board with repository reality and added TAD-050 Prisma schema review. | `docs/task-board.md`, `docs/project-status.md` | Documentation-only task. Verified TAD-010, TAD-020, TAD-021, and TAD-050 as Done; TAD-011 remains Ready. `pnpm lint` and `pnpm build` passed using the bundled pnpm runtime. |
| 2026-07-02 | Planning | TAD-004 cleaned up documentation consistency for phase numbering, Phase 1 scope, next task, and TikTok Display API pagination wording. | `AGENTS.md`, `docs/project-status.md`, `docs/task-board.md`, `docs/tiktok-display-api-plan.md` | Documentation-only task. Build not run because no application code changed. |
| 2026-07-02 | Phase 1: Mock Product UI | TAD-043 added public developer compliance pages for TikTok app setup. | `apps/web/src/app/page.tsx`, `apps/web/src/app/terms/page.tsx`, `apps/web/src/app/privacy/page.tsx`, `docs/task-board.md`, `docs/project-status.md` | Public landing page now replaces the dashboard redirect. Terms and Privacy pages describe TikTok OAuth/Login Kit, Display API metrics, no passwords/cookies/copied tokens, no scraping/engagement automation, and disconnect/deletion requests. No OAuth, API calls, payment, or database changes. |
| 2026-07-02 | Phase 4: Real TikTok OAuth + Video Sync | TAD-044 prepared Vercel deployment and TikTok Sandbox readiness documentation without exposing secrets. | `docs/vercel-deployment-checklist.md`, `docs/vercel-vs-ngrok.md`, `docs/tiktok-sandbox-readiness.md`, `apps/web/src/app/terms/page.tsx`, `apps/web/src/app/privacy/page.tsx`, `docs/task-board.md`, `docs/project-status.md` | Documentation/compliance-copy task. Vercel Hobby/free settings and TikTok URL formats are documented; ngrok is documented as temporary local debugging only. No OAuth code, TikTok API calls, API routes, Prisma schema changes, migrations, or real secret values were added. `pnpm lint` and `pnpm build` passed on 2026-07-02. |
| 2026-07-02 | Phase 4: Real TikTok OAuth + Video Sync | TAD-045 implemented TikTok Sandbox OAuth connect and callback routes. | `apps/web/src/app/api/tiktok/connect/route.ts`, `apps/web/src/app/api/tiktok/callback/route.ts`, `apps/web/src/lib/tiktok-oauth.ts`, `apps/web/src/app/page.tsx`, `apps/web/src/app/videos/page.tsx`, `docs/task-board.md`, `docs/project-status.md` | Needs manual Sandbox login review by the user. Code adds CSRF state and PKCE cookies, redirects to TikTok Login Kit with `code_challenge`, validates state on callback, exchanges code server-side with `code_verifier`, and does not print or persist access/refresh token values. Token persistence and video sync are separate follow-up tasks. |

## 4. Current In-Progress Work

| Phase | Task | Status | What is done | What remains | Owner |
|---|---|---|---|---|---|
| Planning | Single source-of-truth project status | Done | Repository inspected; status file created; lint/build status recorded; AGENTS.md rule added. | Keep this file updated before and after every future task. | Codex |
| Planning | TAD-002 Jira-style task board and workflow | Done | `docs/task-board.md` and `docs/task-workflow.md` created; `AGENTS.md` updated with mandatory task-board workflow; lint/build passed. | Use task IDs for future work and keep task board updated before/during/after tasks. | Codex |
| Planning | TAD-003 task board reconciliation | Done | Repository inspected; task board statuses reconciled; TAD-050 added and completed as a schema review. | Keep future work flowing through task IDs. | Codex |
| Planning | TAD-004 documentation consistency cleanup | Done | Phase numbering and Phase 1 scope aligned across docs; TikTok Display API pagination wording clarified. | Keep TAD-011 as the next implementation task. | Codex |
| Phase 1 | TAD-043 developer compliance pages | Done | Public `/`, `/terms`, and `/privacy` pages created with footer links and TikTok app setup compliance copy; lint/build passed. | Keep real OAuth/API/database work out of scope until the relevant phase. | Codex |
| Phase 1 | Mock Product UI | Partial | `/dashboard` route, `/videos` route, app shell, metric cards, primary recommendation, spend vs views chart, top videos table, Video Library, benchmark comparison, and mock Pre-Boost scoring exist. | Add required `/videos/[id]` video detail route. Treat `/reports/preview`, CSV upload mock UI, campaign table polish, and brand report preview as later Phase 1B tasks. | Codex |
| Phase 3 | Database Foundation draft | Reviewed draft | Prisma schema exists for `User`, `TikTokAccount`, `TikTokToken`, `TikTokVideo`, and `PreBoostScore`; TAD-050 reviewed it. | Add migrations and later models only when database work is explicitly requested. | Codex |
| Phase 4 | TAD-044 Vercel deployment and TikTok Sandbox readiness | Done | Public `/`, `/terms`, and `/privacy` were verified; Vercel deployment settings, TikTok URL formats, Sandbox credential guidance, env variable names, `.env.example`, and `.gitignore` protections are documented. | Deploy to Vercel manually, then configure TikTok Developer Portal URLs from the deployed Vercel domain. Put real values only in `apps/web/.env.local` or Vercel Environment Variables outside the repository. | Codex |
| Phase 4 | TAD-045 TikTok OAuth connect/callback | Done | `/api/tiktok/connect`, `/api/tiktok/callback`, server-side OAuth helper, visible Connect with TikTok links, PKCE handling, ngrok redirect alignment, TikTok `/v2/user/info/` profile fetch, and `/videos` connected account profile/stat card are implemented; lint/build passed after the real profile card update. | Token persistence and video sync stay out of scope until TAD-046/TAD-047. | Codex |

## 5. Pending Work / Backlog

### Phase 1: Mock Product UI
Expected:
- /dashboard
- app shell / navigation
- metric cards
- main recommendation card
- spend vs views chart
- top videos table
- recommendation badges
- /videos
- /videos/[id]
- mock data only

Status:
- Partial

Notes:
- Public `/`, `/terms`, and `/privacy` pages exist for TikTok developer compliance setup. TAD-043 is Done.
- `/dashboard` exists.
- `/videos` exists with mock TikTok Display API-shaped data and deterministic mock scoring. TAD-010 is Done.
- `/videos/[id]` is still missing and is covered by TAD-011.
- `/reports/preview` may be a later Phase 1B task and is not required before TikTok API planning.
- Keep all Phase 1 work mock-data only.

### Phase 2: TikTok Connect + Video Library
Expected:
- TikTok Connect user flow planning
- official TikTok Login Kit and Display API scope plan
- Video Library contract based on Display API fields
- mock-to-real transition plan after Phase 1

Status:
- Partial

Notes:
- Do not implement real OAuth in Phase 1.
- The mock video library now uses fields available from TikTok Display API, which supports the later Phase 2/4 path.
- TAD-011 remains the next Ready Phase 1 task before starting TikTok API implementation.

### Phase 3: Database Foundation
Expected:
- Prisma setup
- PostgreSQL setup
- User model
- TikTokAccount model
- TikTokToken model
- TikTokVideo model
- PreBoostScore model

Status:
- Partial

Notes:
- Prisma schema exists with these models.
- TAD-050 reviewed the draft schema and confirmed no migration files exist.
- `CsvUpload`, `PaidAdMetric`, and `BrandReport` are not yet modeled.
- Avoid expanding database work until explicitly requested.

### Phase 4: Real TikTok OAuth + Video Sync
Expected:
- GET /api/tiktok/connect
- GET /api/tiktok/callback
- POST /api/tiktok/sync-videos
- token encryption
- fetch TikTok profile
- fetch video list
- store videos
- replace mock data with real TikTok Display API data

Status:
- Missing

Notes:
- Must use official OAuth/Login Kit and TikTok Display API only.
- Do not add scraping, browser automation, password collection, cookie extraction, or engagement automation.
- TAD-044 Vercel deployment and Sandbox readiness is Done.
- TAD-045 is Needs Review for Sandbox-only OAuth connect/callback implementation after real Sandbox credentials are configured outside the repository.
- TAD-046 is Blocked until TAD-045 manual login review passes and database/encryption env values are ready.
- TAD-047 is Backlog and will sync the first page of TikTok videos only after tokens are persisted.
- Use Vercel as the stable public URL for TikTok Developer Portal setup:
  - Web/Desktop URL: `https://your-vercel-domain`
  - Terms URL: `https://your-vercel-domain/terms`
  - Privacy URL: `https://your-vercel-domain/privacy`
  - Redirect URI: `https://your-vercel-domain/api/tiktok/callback`
- Use ngrok only later for temporary local OAuth callback debugging, and only if the exact tunnel callback URL is registered in TikTok Developer Portal.
- Real values must only be placed in `apps/web/.env.local` or Vercel Environment Variables, never in docs, `.env.example`, README files, task board, project status, prompts, or chat.

### Phase 5: Paid CSV Analyzer
Expected:
- TikTok Ads Manager CSV upload
- field validation
- field alias mapping
- paid metrics calculation
- paid dashboard
- recommendations: BOOST / WAIT / PAUSE / FIX_CREATIVE

Status:
- Missing

Notes:
- CSV work should stay mock/prototype-only until the phase is explicitly requested.

### Phase 6: Brand Report Generator
Expected:
- report preview
- organic + paid summary
- insights
- recommendations
- PDF / Google Sheet export later

Status:
- Missing

Notes:
- Phase 1B may include a static brand report preview.
- Export should wait until later.

## 6. Decisions Made

| Date | Decision | Reason |
|---|---|---|
| Unknown | Use Next.js full-stack for MVP instead of Java/Spring Boot. | Faster iteration and less backend/frontend overhead for the MVP. |
| Unknown | Use TikTok Display API first for Pre-Boost Analyzer. | The Pre-Boost flow needs authorized public video data from official TikTok APIs. |
| Unknown | Use TikTok Ads Manager CSV later for Paid Analyzer. | Paid analysis can be built from user-exported Ads Manager data without connecting paid APIs early. |
| Unknown | Use pnpm only. | Project package manager is pnpm. |
| Unknown | Use official OAuth/API/CSV only. | Keeps the product compliant and avoids unsafe credential or scraping flows. |
| Unknown | No scraping or browser automation. | TikTok data access must remain official and user-authorized. |
| Unknown | AI may explain/summarize but scoring must be deterministic and explainable. | Users need auditable decision support, not black-box guarantees. |
| 2026-07-02 | Maintain `docs/project-status.md` as the source of truth. | Future work needs clear phase boundaries and a durable progress record. |
| 2026-07-02 | Track all future work in `docs/task-board.md` with stable task IDs. | The user should be able to ask Codex to work on a specific task such as `TAD-012`, and Codex should update task status as work progresses. |

## 7. Known Bugs / Issues

- No known app bugs from TAD-044.
- TAD-045 manual login returned a TikTok `code_challenge` error; the OAuth flow now sends PKCE `code_challenge` on connect and matching `code_verifier` on callback. Manual Sandbox retry is still required.
- TAD-045 manual login later returned a TikTok `redirect_uri` error. The running local app was sending the Vercel callback URL; local `.env.local` was aligned on 2026-07-03 to send `http://localhost:3000/api/tiktok/callback`. TikTok Developer Portal Sandbox must contain the exact same redirect URI before login can succeed.
- TikTok Developer Portal does not accept localhost redirect URIs for this app setup, so local OAuth testing needs an HTTPS tunnel. ngrok is now running at `https://ravishing-refusal-abrasive.ngrok-free.dev` and the app is configured to send its callback URL.
- `.ngrok/ngrok.yml.example` exists and `.ngrok/ngrok.yml` is ignored, so the user can configure the ngrok authtoken locally without committing it.
- Stale connected-account cookies no longer render as a valid account. If `/videos` shows reconnect required, reconnect TikTok after enabling `user.info.profile` and `user.info.stats` in Sandbox.
- The build command still requires an outside-sandbox rerun because Turbopack cannot bind a local worker port inside the sandbox.
- Local dev server for TAD-045 was restarted successfully on port 3000 after clearing the old stuck process.
- Task-board finding: TAD-050 was referenced by the user but did not exist on the board before this reconciliation; it has now been added and marked Done with schema-review notes.

## 8. Risks / Open Questions

| Risk / Question | Impact | Current thinking | Next step |
|---|---|---|---|
| TikTok Developer app approval requirements | Could block real OAuth/video access in Phase 4. | Plan around official Login Kit and Display API scopes only. | Confirm requirements before Phase 4 implementation. |
| TikTok Display API scope approval | `video.list` may require review or setup before testing. | OAuth connect/callback is implemented, but real video sync is separated into TAD-047. | Confirm `video.list` is enabled before starting TAD-047. |
| TikTok user profile/stat scope approval | Without `user.info.profile` and `user.info.stats`, the connected account card cannot show username, total videos, follower count, following count, or likes. | The app requests these scopes and gracefully falls back when they are not granted. | Enable/approve `user.info.profile` and `user.info.stats` in Sandbox, then reconnect TikTok. |
| Token encryption approach | Weak encryption could create security risk for stored tokens. | Use server-only authenticated encryption with `TOKEN_ENCRYPTION_KEY`. | Decide exact implementation before token storage. |
| Sandbox credentials readiness | Missing Sandbox credentials or redirect URI mismatch would block OAuth testing. | TAD-045 is implemented, but manual login review depends on correct Sandbox credentials, tester setup, scopes, and redirect URI. | Run the TikTok Sandbox login flow from `/api/tiktok/connect`; if testing on Vercel, add env values in Vercel and redeploy first. |
| Whether TikTok Display API data is enough for a useful Pre-Boost Score | Score quality may be limited without watch time, completion rate, saves, or retention. | Keep formula deterministic and based only on available fields; add optional manual inputs later if needed. | Validate scoring with sample creator videos once available. |
| Whether user auth is needed before TikTok OAuth | Real OAuth needs a local user identity and session model. | Avoid adding auth provider until explicitly requested. | Decide before Phase 4. |
| Database provider choice: Neon vs Supabase Postgres | Affects env setup, connection pooling, and deployment. | Both fit the planned stack. | Pick provider before migrations are finalized. |
| Vercel environment variable setup | Missing env values would block deployed OAuth and database access. | Keep `.env.example` current and put real values only in Vercel Project Settings > Environment Variables. | Deploy `apps/web` to Vercel Hobby/free using the documented settings, then add the required environment variables in Vercel. |
| Phase sequencing drift | Existing Prisma schema appears ahead of the current Phase 1: Mock Product UI phase. | TAD-050 reviewed the schema as a draft; do not add migrations, persistence, or later models until database work is explicitly requested. | Keep next implementation work on Phase 1 UI unless the user selects a database task. |

## 9. Next Recommended Action

Next action:
- Prepare TAD-046, `Persist TikTok OAuth tokens securely`, by confirming `DATABASE_URL` and `TOKEN_ENCRYPTION_KEY` are available only in server-side local/Vercel env. After TAD-046, start TAD-047 first-page TikTok video sync.

Why:
- TAD-045 proves the Login Kit redirect/callback flow before any database token persistence or real video sync work. TikTok Display API video retrieval needs persisted, server-side tokens, so it belongs after the manual OAuth review.

## 10. Mandatory Task Board Workflow

Before starting any future task:
1. Read AGENTS.md.
2. Read docs/project-status.md.
3. Read docs/task-board.md.
4. Identify the requested task ID, if provided.
5. If no task ID is provided, use the Next Recommended Action from docs/project-status.md and the highest-priority Open task from docs/task-board.md.
6. Confirm:
   - task ID
   - task title
   - current status
   - epic/story
   - scope
   - expected files to change
   - out-of-scope items
7. Move the task to In Progress before editing.
8. Do not work on unrelated tasks.
9. If the work requires new scope, create a new task first instead of silently expanding scope.
10. Do not start unrelated future phases.

After completing any future task:
1. Update docs/task-board.md.
2. Move the task to Done, Partial, Blocked, or Needs Review.
3. Add implementation notes.
4. Add files changed.
5. Add build/lint/test result.
6. Add bugs found or created.
7. Update docs/project-status.md.
8. Set the next recommended action.
9. Summarize the task ID, result, files changed, and next task.

End-of-day closeout rule:
1. When the user says the work is done for today, summarize what was completed during the day.
2. Update task/status docs.
3. Run required verification for unverified code changes.
4. Commit and push safe code/docs changes to git.
5. Keep secrets and local-only files out of git.
6. Stop running local app processes, tunnels, and dev servers started for the work, including Next.js and ngrok, to avoid battery/CPU drain.
7. Report what was pushed and what was stopped.
