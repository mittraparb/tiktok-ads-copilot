# TikTok Ads Co-Pilot

TikTok Ads Co-Pilot / Creator Ads Decision Dashboard helps creators and small teams decide which TikTok videos are worth testing with ad budget and produce brand-friendly performance reports.

Product positioning:

> ยิงแอด TikTok แบบไม่เดาสุ่ม — รู้ก่อนว่าคลิปไหนควรดัน คลิปไหนควรหยุด และส่งรายงานแบรนด์ได้ในไม่กี่คลิก

Do not sell the product as `ยิงแอดถูกกว่า`. Sell it as:

> ช่วยตัดสินใจก่อนเผางบ และทำรายงานให้ดูโปร.

## Target Users

- The creator channels แก้มตุงพุงโต / พ่อแว่นขับอีวี
- Creators who do brand deals and boost TikTok videos themselves
- SMEs / small shops that run TikTok Ads but do not know which creative is worth boosting
- Small agencies that need creator/ad performance reports for clients

## Product Modes

The product has two major analysis modes.

### 1. Pre-Boost Analyzer

Used before running ads.

The user connects their own TikTok account via official TikTok OAuth/Login Kit. The app lists the user's public videos. The user clicks a video to see a Pre-Boost Score and recommendation.

Primary official API:

- TikTok Display API

Required TikTok scopes:

- `user.info.basic`
- `video.list`

TikTok Display API data to fetch:

- `id`
- `create_time`
- `cover_image_url`
- `share_url`
- `video_description`
- `duration`
- `title`
- `like_count`
- `comment_count`
- `share_count`
- `view_count`

Pre-Boost calculated metrics:

- like rate
- comment rate
- share rate
- engagement rate
- view velocity
- post age
- pre-boost score

Pre-Boost recommendations:

- `BOOST_TEST`
- `WAIT`
- `FIX_CREATIVE`
- `DO_NOT_BOOST`

Suggested budget tiers:

- 100 THB
- 300 THB
- 500 THB

Important limitation:

TikTok Display API does not provide saves/favorites, profile visits per video, follows gained per video, average watch time, completion rate, retention graph, traffic source, or top comment text. Do not design the core scoring formula to require those fields. They may be optional manual inputs later.

### 2. Paid CSV Analyzer

Used after ads have run.

The user uploads TikTok Ads Manager CSV export. The app analyzes paid performance and gives recommendations.

Paid CSV data may include:

- campaign name / ID
- ad group name / ID
- ad name / ID
- spend / cost
- impressions
- clicks
- CTR
- CPC
- CPM
- video views
- likes
- comments
- shares
- follows
- profile visits
- conversions if available

Paid recommendations:

- `BOOST`
- `WAIT`
- `PAUSE`
- `FIX_CREATIVE`

Paid calculated metrics:

- CPV
- CTR
- CPC
- CPM
- engagement rate
- follow rate
- profile visit rate

## Current Phase

Phase 1 only: Mock Product UI with mock data.

Routes:

- `/dashboard`
- `/videos`
- `/videos/[id]`
- `/reports/preview` may be a later Phase 1B task and is not required before TikTok API planning.

Do not connect the real TikTok API yet.

Build now:

- Next.js frontend
- Mock data
- Dashboard UI
- Video detail with Boost Score
- Phase 1B may add CSV upload mock UI, campaign performance table polish, and brand report preview later.

Do not build in Phase 1:

- Real TikTok API connection
- OAuth/Login Kit
- Database persistence
- Real CSV processing
- Payment
- TikTok Business API / Marketing API

## MVP Phases

Phase 1: Mock Product UI

- Mock frontend product UI with mock data.
- Required routes before TikTok API planning: `/dashboard`, `/videos`, `/videos/[id]`.
- `/reports/preview` may be a later Phase 1B task.
- Do not connect real TikTok API yet.

Phase 2: TikTok Connect + Video Library

- Prepare the TikTok Connect and Video Library product path after Phase 1 mock UI.
- Keep the UI contract compatible with official TikTok Login Kit and Display API.
- Confirm required scopes, Display API fields, and user flow.
- Do not use scraping, copied credentials, cookies, or browser automation.

Phase 3: Database Foundation

- Prisma setup
- PostgreSQL setup
- User, TikTokAccount, TikTokToken, TikTokVideo, and PreBoostScore models
- Database migrations and persistence foundation

Phase 4: Real TikTok OAuth + Video Sync

- Implement official TikTok OAuth/Login Kit
- Fetch TikTok profile
- Fetch public videos via TikTok Display API
- Store videos in database
- Replace mock video data with synced Display API data
- Calculate Pre-Boost Score from real API data
- Pre-Boost Score detail
- Improve scoring engine
- Add reasons, risks, and suggested budget
- Add Creative Doctor from title/caption/hook/CTA if available
- Keep scoring deterministic and explainable
- AI may explain or summarize, but AI must not be the only scoring source

Phase 5: Paid CSV Analyzer

- Paid CSV Analyzer
- Upload TikTok Ads Manager CSV
- Validate columns
- Map aliases
- Normalize rows
- Calculate paid metrics
- Show paid dashboard
- Recommend `BOOST` / `WAIT` / `PAUSE` / `FIX_CREATIVE`

Phase 6: Brand Report Generator

- Brand Report Generator
- Generate brand-friendly report preview
- Summarize organic + paid performance
- Include top videos, metrics, insights, recommendations
- Export PDF / Google Sheet later

## Technical Direction

Do not use Java/Spring Boot for the MVP.

Use Next.js full-stack for faster iteration and to avoid an unnecessary backend/frontend split at this stage. All backend endpoints should live inside the Next.js app under `apps/web/src/app/api`.

Final MVP stack:

- Next.js App Router
- TypeScript
- Route Handlers for backend endpoints
- Tailwind CSS
- shadcn/ui
- lucide-react
- Recharts
- TanStack Table
- React Hook Form
- Zod
- Prisma
- PostgreSQL
- Neon or Supabase Postgres
- TikTok Display API
- OAuth/Login Kit
- Vercel deployment

Reason for stack:

The MVP needs fast iteration, TikTok OAuth, video listing, scoring, dashboard UI, report preview, and later CSV upload. A separate Java/Spring backend adds unnecessary overhead at this stage.

Prefer existing project patterns and components before adding new abstractions.

## Package Manager

This project uses pnpm.

Never use npm unless explicitly asked. Use pnpm for all install, dev, lint, build, and test commands.

Preferred commands:

- `pnpm install`
- `pnpm dev`
- `pnpm lint`
- `pnpm build`
- `pnpm test` if available

If npm is not on the shell path, do not mention it repeatedly. Just use pnpm directly.

When verifying changes, run:

- `pnpm lint` if available
- `pnpm build` if available

## Planned Internal API Routes

- `GET /api/tiktok/connect`
- `GET /api/tiktok/callback`
- `POST /api/tiktok/sync-videos`
- `GET /api/videos`
- `GET /api/videos/[id]`
- `GET /api/videos/[id]/pre-boost-score`
- `POST /api/csv/upload` later
- `GET /api/reports/[id]` later

Do not invent backend APIs outside this planned route list unless explicitly asked.

## Planned Data Models

- `User`
- `TikTokAccount`
- `TikTokToken`
- `TikTokVideo`
- `PreBoostScore`
- `CsvUpload`
- `PaidAdMetric`
- `BrandReport`

Data model notes:

`User`:

- app user

`TikTokAccount`:

- connected TikTok account
- `open_id`
- `union_id` if available
- `display_name`
- `avatar_url`

`TikTokToken`:

- encrypted access token
- encrypted refresh token
- `expires_at`
- `refresh_expires_at`
- `scope`

`TikTokVideo`:

- TikTok video ID
- title
- description
- share URL
- cover image URL
- duration
- create time
- view count
- like count
- comment count
- share count
- last synced at

`PreBoostScore`:

- score 0-100
- recommendation
- suggested budget
- reasons JSON
- risks JSON
- formula version
- created at

`CsvUpload`:

- uploaded CSV metadata
- original file name
- imported at
- status
- validation errors if any

`PaidAdMetric`:

- normalized TikTok Ads Manager CSV row
- campaign/ad group/ad/video data
- spend/impressions/clicks/views/engagement metrics
- calculated CPV, CTR, CPC, CPM, engagement rate

`BrandReport`:

- campaign summary
- organic + paid performance
- insights
- recommendations
- export status

## Design Direction

Design a premium creator-SaaS dashboard that feels clean, modern, trustworthy, and brand-report friendly.

Visual inspiration:

- Linear
- Vercel
- Stripe Dashboard
- TikTok Creator Center

Do not make it playful, cartoonish, or like an old generic admin panel.

## UX Rules

The user must understand within 5 seconds:

- Which video should be tested with ad budget
- Which video should wait
- Which video should be fixed creatively
- Which video should not be boosted
- Why
- What budget tier to try next

Every score must include:

- score
- recommendation
- reasons
- risks
- suggested budget
- formula version

Prioritize scannability, strong visual hierarchy, clear recommendation states, and concise explanations.

## Compliance Guardrails

Never:

- ask for TikTok username/password
- ask for cookies, sessions, copied tokens, or browser credentials
- use Selenium or browser automation
- scrape TikTok
- auto-like
- auto-follow
- auto-comment
- auto-favorite
- auto-DM
- claim guaranteed results
- claim ads will be cheaper

Use only:

- OAuth/Login Kit
- TikTok Display API
- TikTok Ads Manager CSV export
- official TikTok Business/Marketing API in later phases if approved

Keep product language decision-support oriented. Recommendations should be framed as guidance based on available signals, not guarantees.

## Coding Behavior

- Keep changes small and phased.
- Do not implement future phases unless explicitly asked.
- Before large changes, explain the plan.
- After changes, summarize files changed and how to run/check.
- Prefer reusable components.
- Keep business logic explainable and testable.
- Do not add paid features, auth providers, payment, or TikTok Business API until explicitly requested.

## Mandatory Task Board Workflow

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
