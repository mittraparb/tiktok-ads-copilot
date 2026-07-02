# TikTok Ads Co-Pilot Project Status

## 1. Current Snapshot

Current phase:
- Phase 1: Mock Product UI

Current goal:
- Prepare for safe TikTok Sandbox OAuth testing through Vercel deployment readiness and environment documentation only. TAD-044 Vercel deployment and Sandbox readiness is complete; the next must-do operational step is deploying `apps/web` to Vercel Hobby/free and configuring TikTok Developer Portal URLs from that stable domain. After that, start TAD-045, `Implement TikTok OAuth connect and callback for Sandbox testing only`.

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
  - `/videos/[id]` is missing.
  - `/reports/preview` is missing and is now treated as a later Phase 1B task, not required before TikTok API planning.
  - No API routes exist under `apps/web/src/app/api` yet.
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
  - TAD-045 Sandbox-only OAuth connect/callback is Ready but not started.
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
- TAD-045 is Ready for Sandbox-only OAuth connect/callback implementation after real Sandbox credentials are configured outside the repository.
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
- The build command still requires an outside-sandbox rerun because Turbopack cannot bind a local worker port inside the sandbox.
- Task-board finding: TAD-050 was referenced by the user but did not exist on the board before this reconciliation; it has now been added and marked Done with schema-review notes.

## 8. Risks / Open Questions

| Risk / Question | Impact | Current thinking | Next step |
|---|---|---|---|
| TikTok Developer app approval requirements | Could block real OAuth/video access in Phase 4. | Plan around official Login Kit and Display API scopes only. | Confirm requirements before Phase 4 implementation. |
| TikTok Display API scope approval | `video.list` may require review or setup before testing. | Phase 1 should stay mock-only; Phase 2 and Phase 4 should prepare for approval constraints. | Review current TikTok developer account readiness later. |
| Token encryption approach | Weak encryption could create security risk for stored tokens. | Use server-only authenticated encryption with `TOKEN_ENCRYPTION_KEY`. | Decide exact implementation before token storage. |
| Sandbox credentials readiness | Missing Sandbox credentials or redirect URI mismatch would block OAuth testing. | TAD-044 documents Sandbox credential requirements, env names, redirect URI, scope checklist, Vercel URL formats, and blockers. | Deploy to Vercel, configure TikTok Sandbox URLs, then configure real values only in `apps/web/.env.local` or Vercel Environment Variables before TAD-045. |
| Whether TikTok Display API data is enough for a useful Pre-Boost Score | Score quality may be limited without watch time, completion rate, saves, or retention. | Keep formula deterministic and based only on available fields; add optional manual inputs later if needed. | Validate scoring with sample creator videos once available. |
| Whether user auth is needed before TikTok OAuth | Real OAuth needs a local user identity and session model. | Avoid adding auth provider until explicitly requested. | Decide before Phase 4. |
| Database provider choice: Neon vs Supabase Postgres | Affects env setup, connection pooling, and deployment. | Both fit the planned stack. | Pick provider before migrations are finalized. |
| Vercel environment variable setup | Missing env values would block deployed OAuth and database access. | Keep `.env.example` current and put real values only in Vercel Project Settings > Environment Variables. | Deploy `apps/web` to Vercel Hobby/free using the documented settings, then add the required environment variables in Vercel. |
| Phase sequencing drift | Existing Prisma schema appears ahead of the current Phase 1: Mock Product UI phase. | TAD-050 reviewed the schema as a draft; do not add migrations, persistence, or later models until database work is explicitly requested. | Keep next implementation work on Phase 1 UI unless the user selects a database task. |

## 9. Next Recommended Action

Next action:
- Manually deploy `apps/web` to Vercel Hobby/free using the documented settings, then configure TikTok Developer Portal Sandbox URLs from the deployed Vercel domain. After that, implement TAD-045, `Implement TikTok OAuth connect and callback for Sandbox testing only`.

Why:
- TAD-044 Vercel deployment and Sandbox readiness is complete. TikTok needs stable public app, terms, privacy, and redirect URLs before Sandbox OAuth testing; Vercel provides that stable HTTPS URL, while ngrok should stay limited to temporary local debugging. TAD-045 should remain Sandbox-only and must not use Production credentials.

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
