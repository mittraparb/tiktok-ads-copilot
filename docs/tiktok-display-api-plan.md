# TikTok Display API Phase 2 Plan

Phase 2 defines the TikTok Connect + Video Library path for the Pre-Boost Analyzer using the Next.js full-stack app, Prisma, PostgreSQL, and the official TikTok OAuth/Login Kit + Display API.

This plan must not add TikTok Business API, payment, real CSV processing, scraping, browser automation, or any paid-feature gating. The goal is to define how Phase 1 mock video data will later be replaced with authorized TikTok Display API data and persisted data for deterministic Pre-Boost Scores.

Real OAuth and video sync implementation belongs to Phase 4: Real TikTok OAuth + Video Sync, after the Phase 3: Database Foundation work is explicitly active or complete.

Phase numbering for this project:

- Phase 1: Mock Product UI
- Phase 2: TikTok Connect + Video Library
- Phase 3: Database Foundation
- Phase 4: Real TikTok OAuth + Video Sync
- Phase 5: Paid CSV Analyzer
- Phase 6: Brand Report Generator

## Official References

- TikTok Login Kit for Web: `https://developers.tiktok.com/doc/login-kit-web/`
- TikTok OAuth user access token management: `https://developers.tiktok.com/doc/oauth-user-access-token-management`
- TikTok Display API - Get User Info: `https://developers.tiktok.com/doc/tiktok-api-v2-get-user-info/`
- TikTok Display API - List Videos: `https://developers.tiktok.com/doc/tiktok-api-v2-video-list/`
- TikTok Display API - Video Object: `https://developers.tiktok.com/doc/tiktok-api-v2-video-object/`

## User Flow

1. User opens the app and clicks `Connect TikTok`.
2. Frontend sends the user to `GET /api/tiktok/connect`.
3. Backend creates a CSRF `state` value, stores it server-side or in a secure, HTTP-only, short-lived cookie, then redirects to TikTok OAuth/Login Kit.
4. TikTok authorization URL:

   ```text
   https://www.tiktok.com/v2/auth/authorize/
   ```

5. Backend requests these scopes:

   ```text
   user.info.basic,video.list
   ```

6. User logs in through TikTok and grants the requested scopes.
7. TikTok redirects back to `TIKTOK_REDIRECT_URI`, which points to `GET /api/tiktok/callback`.
8. Callback validates `state` and handles TikTok error query params if authorization fails.
9. Callback receives the authorization `code`.
10. Backend exchanges the authorization code for an access token and refresh token:

    ```text
    POST https://open.tiktokapis.com/v2/oauth/token/
    Content-Type: application/x-www-form-urlencoded
    ```

11. Backend stores token metadata and encrypted token values in PostgreSQL.
12. Backend fetches the TikTok profile with the access token:

    ```text
    GET https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name
    Authorization: Bearer <access_token>
    ```

13. Backend upserts the local `User` and linked `TikTokAccount`.
14. Backend fetches public videos with the access token:

    ```text
    POST https://open.tiktokapis.com/v2/video/list/?fields=id,create_time,cover_image_url,share_url,video_description,duration,title,like_count,comment_count,share_count,view_count
    Authorization: Bearer <access_token>
    Content-Type: application/json
    ```

15. Initial sync fetches the first video-list page only with `max_count = 20`.
16. Backend stores TikTok pagination metadata such as `cursor` and `has_more` for the connected account or sync response.
17. Backend upserts videos from that first page into `TikTokVideo` and records `lastSyncedAt`.
18. Backend calculates and stores a `PreBoostScore` for each synced video, using only Display API fields.
19. Backend redirects the user to `/videos`.
20. Frontend calls `GET /api/videos` and shows the Video Library.
21. If `has_more` is true, the UI may show a Load More control.
22. Load More fetches the next page only when the user clicks.
23. Do not auto-loop through every page by default, and do not fetch all videos at once.
24. User clicks a video in the Video Library.
25. Frontend navigates to `/videos/[id]`.
26. Frontend calls `GET /api/videos/[id]` and `GET /api/videos/[id]/pre-boost-score`.
27. User sees the video details, score, recommendation, reasons, risks, suggested budget, and formula version.

## Required Environment Variables

```bash
TIKTOK_CLIENT_KEY=
TIKTOK_CLIENT_SECRET=
TIKTOK_REDIRECT_URI=
DATABASE_URL=
TOKEN_ENCRYPTION_KEY=
NEXT_PUBLIC_APP_URL=
```

Notes:

- `TIKTOK_CLIENT_SECRET` must only be used server-side.
- `TOKEN_ENCRYPTION_KEY` must be a strong secret suitable for authenticated encryption, not a human-readable passphrase.
- `TIKTOK_REDIRECT_URI` must exactly match the redirect URI configured in TikTok Developer Portal.
- `NEXT_PUBLIC_APP_URL` is safe for browser use and should point to the app origin, for example `https://example.com` or `http://localhost:3000` in local development.

## Planned Route Handlers

All route handlers live under `apps/web/src/app/api`.

### `GET /api/tiktok/connect`

Purpose:

- Start TikTok OAuth/Login Kit.
- Generate and persist a CSRF `state`.
- Redirect to TikTok authorization URL.

Behavior:

- Read `TIKTOK_CLIENT_KEY` and `TIKTOK_REDIRECT_URI`.
- Build authorization URL with:
  - `client_key`
  - `response_type=code`
  - `scope=user.info.basic,video.list`
  - `redirect_uri`
  - `state`
- Set secure state storage.
- Return a redirect response to TikTok.

### `GET /api/tiktok/callback`

Purpose:

- Complete OAuth callback.
- Exchange authorization code for tokens.
- Store encrypted tokens.
- Fetch TikTok profile.
- Sync initial video list.
- Redirect to `/videos`.

Behavior:

- Validate returned `state`.
- Handle TikTok `error` and `error_description`.
- Exchange `code` with TikTok token endpoint.
- Confirm granted `scope` includes both `user.info.basic` and `video.list`.
- Encrypt `access_token` and `refresh_token`.
- Store token expiry timestamps from `expires_in` and `refresh_expires_in`.
- Fetch profile fields: `open_id`, `union_id`, `avatar_url`, `display_name`.
- Upsert `User`, `TikTokAccount`, and `TikTokToken`.
- Call the same sync service used by `POST /api/tiktok/sync-videos`.
- Redirect to `/videos?connected=1`.

### `POST /api/tiktok/sync-videos`

Purpose:

- Refresh the connected account's public video list from TikTok Display API.

Behavior:

- Resolve the current app user and connected TikTok account.
- Decrypt the access token only in memory.
- Refresh the access token if expired or near expiry.
- Request TikTok video list with the approved Phase 2 fields and `max_count = 20`.
- For initial sync, fetch the first page only.
- For Load More, request the next page only when the user explicitly clicks, using the stored or returned `cursor`.
- Do not auto-loop through every page by default.
- Do not fetch all videos at once.
- Upsert `TikTokVideo` rows from the fetched page by TikTok video ID and account ID.
- Recalculate `PreBoostScore` for changed videos.
- Return sync metadata: synced count, skipped count, next cursor, `has_more`, and `lastSyncedAt`.

### `GET /api/videos`

Purpose:

- Return the current user's synced TikTok video library.

Behavior:

- Query `TikTokVideo` rows for the current user's connected account.
- Include latest `PreBoostScore`.
- Support simple sorting by `createTime`, `viewCount`, or `score`.
- Return only fields needed by the Video Library UI.

### `GET /api/videos/[id]`

Purpose:

- Return a single synced TikTok video detail.

Behavior:

- Validate that `[id]` belongs to the current user's connected account.
- Return TikTok video metadata and raw Display API counts.
- Include latest `PreBoostScore` summary where useful for the detail page.

### `GET /api/videos/[id]/pre-boost-score`

Purpose:

- Return the latest deterministic Pre-Boost Score for a video.

Behavior:

- Validate video ownership.
- Return:
  - `score`
  - `recommendation`
  - `suggestedBudget`
  - `reasons`
  - `risks`
  - `formulaVersion`
  - calculated metrics
  - `createdAt`
- If no score exists, calculate one from the stored TikTok video fields and persist it before returning.

## Prisma Models

The Phase 2 schema should include only these models from the planned MVP data model set.

```prisma
model User {
  id              String          @id @default(cuid())
  email           String?         @unique
  name            String?
  createdAt       DateTime        @default(now())
  updatedAt       DateTime        @updatedAt
  tikTokAccounts  TikTokAccount[]
}

model TikTokAccount {
  id             String        @id @default(cuid())
  userId         String
  openId         String
  unionId        String?
  displayName    String?
  avatarUrl      String?
  createdAt      DateTime      @default(now())
  updatedAt      DateTime      @updatedAt
  lastSyncedAt   DateTime?

  user           User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  token          TikTokToken?
  videos         TikTokVideo[]

  @@unique([openId])
  @@index([userId])
}

model TikTokToken {
  id                    String        @id @default(cuid())
  tikTokAccountId        String        @unique
  encryptedAccessToken   String
  encryptedRefreshToken  String
  expiresAt             DateTime
  refreshExpiresAt      DateTime
  scope                 String
  tokenType             String        @default("Bearer")
  createdAt             DateTime      @default(now())
  updatedAt             DateTime      @updatedAt

  tikTokAccount         TikTokAccount @relation(fields: [tikTokAccountId], references: [id], onDelete: Cascade)
}

model TikTokVideo {
  id                String           @id @default(cuid())
  tikTokAccountId   String
  tikTokVideoId     String
  createTime        DateTime
  coverImageUrl     String?
  shareUrl          String?
  videoDescription  String?
  duration          Int?
  title             String?
  likeCount         Int              @default(0)
  commentCount      Int              @default(0)
  shareCount        Int              @default(0)
  viewCount         BigInt           @default(0)
  lastSyncedAt      DateTime         @default(now())
  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt

  tikTokAccount     TikTokAccount    @relation(fields: [tikTokAccountId], references: [id], onDelete: Cascade)
  preBoostScores    PreBoostScore[]

  @@unique([tikTokAccountId, tikTokVideoId])
  @@index([tikTokAccountId, createTime])
}

model PreBoostScore {
  id                String       @id @default(cuid())
  tikTokVideoId     String
  score             Int
  recommendation    String
  suggestedBudget   Int?
  reasons           Json
  risks             Json
  metrics           Json
  formulaVersion    String
  createdAt         DateTime     @default(now())

  tikTokVideo       TikTokVideo  @relation(fields: [tikTokVideoId], references: [id], onDelete: Cascade)

  @@index([tikTokVideoId, createdAt])
}
```

Implementation notes:

- `viewCount` uses `BigInt` because TikTok represents view count as a 64-bit value.
- `recommendation` can start as a string in Phase 2, then become a Prisma enum later if the app stabilizes around the same values.
- Token values must be encrypted before writing to `TikTokToken`.
- Do not store raw access or refresh tokens in logs, errors, analytics, or client responses.

## TikTok Video Fields To Fetch

The Phase 2 video list request must ask only for fields available through TikTok Display API and needed by the Pre-Boost Analyzer:

```text
id
create_time
cover_image_url
share_url
video_description
duration
title
like_count
comment_count
share_count
view_count
```

Do not require saves/favorites, profile visits per video, follows gained per video, average watch time, completion rate, retention graph, traffic source, or top comment text. TikTok Display API does not provide those fields for this flow.

## Pre-Boost Score Inputs

Use only these stored Display API fields:

```text
view_count
like_count
comment_count
share_count
create_time
duration
title
video_description
```

Optional future manual inputs may be added later, but the core Phase 2 formula must not depend on them.

## Pre-Boost Calculated Metrics

For each video, calculate:

- `likeRate = like_count / max(view_count, 1)`
- `commentRate = comment_count / max(view_count, 1)`
- `shareRate = share_count / max(view_count, 1)`
- `engagementRate = (like_count + comment_count + share_count) / max(view_count, 1)`
- `postAgeHours = max(hoursSince(create_time), 1)`
- `viewVelocity = view_count / postAgeHours`

Store calculated metrics in `PreBoostScore.metrics` so the UI can explain why a score was assigned.

## Recommendation Logic

The scoring engine must be deterministic, explainable, and versioned. AI may summarize the result later, but AI must not be the only scoring source.

Initial formula version:

```text
preboost-v1-display-api
```

Recommended output shape:

```ts
type PreBoostRecommendation =
  | "BOOST_TEST"
  | "WAIT"
  | "FIX_CREATIVE"
  | "DO_NOT_BOOST";
```

Suggested Phase 2 scoring approach:

1. Normalize engagement quality from `engagementRate`, with extra weight for `shareRate`.
2. Normalize early traction from `viewVelocity`.
3. Apply a freshness adjustment from `postAgeHours`.
4. Apply a creative-readiness adjustment from `title`, `video_description`, and `duration`.
5. Clamp final score to `0..100`.

Suggested recommendation thresholds:

| Recommendation | Score Range | Required Supporting Signals | Suggested Budget |
| --- | ---: | --- | ---: |
| `BOOST_TEST` | `75..100` | Strong engagement rate, clear share signal, healthy view velocity, no major creative risk | `300` or `500` THB |
| `WAIT` | `55..74` | Promising but still young, low sample size, or not enough velocity yet | `100` THB or no spend yet |
| `FIX_CREATIVE` | `35..54` | Some audience signal but weak title/caption/CTA, low share rate, or unclear hook | no spend until fixed |
| `DO_NOT_BOOST` | `0..34` | Weak engagement, weak velocity, stale post, or poor creative readiness | no spend |

Recommendation details:

- `BOOST_TEST`: Frame as "worth a controlled test", not a guaranteed winner.
- `WAIT`: Use when the video is too new or has too little data to make a confident decision.
- `FIX_CREATIVE`: Use when organic signals are mixed but the creative can plausibly be improved before paid spend.
- `DO_NOT_BOOST`: Use when available signals suggest the video should not receive ad budget now.

Every score response must include:

- `score`
- `recommendation`
- `reasons`
- `risks`
- `suggestedBudget`
- `formulaVersion`
- `metrics`

## Compliance Rules

Phase 2 must follow these rules:

- Use OAuth/Login Kit only.
- Request only `user.info.basic` and `video.list`.
- Do not ask for TikTok username or password.
- Do not ask for cookies, sessions, copied tokens, or browser credentials.
- Do not scrape TikTok.
- Do not use Selenium, browser bots, or browser automation.
- Do not auto-like, auto-follow, auto-comment, auto-favorite, or auto-DM.
- Do not claim guaranteed ad results.
- Do not claim ads will be cheaper.
- Keep recommendations decision-support oriented: "ช่วยตัดสินใจก่อนเผางบ และทำรายงานให้ดูโปร."

## Phase 2 Implementation Sequence

1. Confirm Prisma and PostgreSQL configuration from Phase 3: Database Foundation, or add it only if Phase 3 is explicitly in scope.
2. Confirm the required Prisma models and create the initial migration only when Phase 3 database work is explicitly active.
3. Add server-only token encryption helpers using `TOKEN_ENCRYPTION_KEY`.
4. Add a server-only TikTok API client for token exchange, token refresh, profile fetch, and video list fetch.
5. Add deterministic Pre-Boost scoring service with unit tests for recommendation thresholds.
6. Implement `GET /api/tiktok/connect`.
7. Implement `GET /api/tiktok/callback`.
8. Implement `POST /api/tiktok/sync-videos`.
9. Implement `GET /api/videos`.
10. Implement `GET /api/videos/[id]`.
11. Implement `GET /api/videos/[id]/pre-boost-score`.
12. Update the existing Video Library UI to read from API routes instead of mock data when connected.
13. Keep the current mock-data fallback for local UI work when no TikTok account is connected.
14. Verify with `pnpm lint` and `pnpm build`.

## Explicit Non-Goals For Phase 2

- No TikTok Business API or Marketing API.
- No TikTok Ads Manager CSV processing.
- No PDF or Google Sheet export.
- No payment.
- No external auth provider unless explicitly requested.
- No database models outside `User`, `TikTokAccount`, `TikTokToken`, `TikTokVideo`, and `PreBoostScore`.
- No backend API routes outside the planned Phase 2 route list.
