# TikTok Sandbox Readiness

This document prepares TikTok Ads Co-Pilot for safe TikTok Sandbox OAuth testing. It does not contain real secret values and should never be used to store them.

## 1. Which Credentials To Use Now

Use Sandbox credentials first:

- Sandbox Client Key
- Sandbox Client Secret

Do not use Production credentials for local or integration testing. Production credentials are only for review or live use later, when the app is ready for that stage.

## 2. Where Real Values Go

Local development:

```text
apps/web/.env.local
```

Vercel later:

```text
Project Settings > Environment Variables
```

Never write real values into `.env.example`, docs, README files, `docs/task-board.md`, or `docs/project-status.md`.

## 3. Example `.env.local` Template

Use placeholders only in documentation. Real values belong only in `apps/web/.env.local` for local development or Vercel Environment Variables later.

```bash
TIKTOK_APP_ENV=sandbox
TIKTOK_CLIENT_KEY=<sandbox-client-key>
TIKTOK_CLIENT_SECRET=<sandbox-client-secret>
TIKTOK_REDIRECT_URI=http://localhost:3000/api/tiktok/callback
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=<local-or-hosted-postgres-url>
TOKEN_ENCRYPTION_KEY=<strong-random-secret>
```

## 4. TikTok Developer Portal Checklist

- Use Sandbox mode.
- Copy Client Key from Sandbox credentials.
- Copy Client Secret from Sandbox credentials.
- Use the Vercel deployment as the stable public project URL:

  ```text
  Web/Desktop URL = https://your-vercel-domain
  Terms URL = https://your-vercel-domain/terms
  Privacy URL = https://your-vercel-domain/privacy
  Redirect URI = https://your-vercel-domain/api/tiktok/callback
  ```

- Configure the redirect URI exactly. It must match `TIKTOK_REDIRECT_URI`.
- For local-only debugging later, use an HTTPS tunnel URL only if TikTok must call back into localhost.
- When testing connected-account UI or synced videos locally, use the same HTTPS tunnel origin in the browser. Do not validate OAuth-cookie-dependent behavior on `localhost` after logging in through ngrok, because the cookies are scoped to the ngrok host.
- Enable Login Kit.
- Prepare scopes:
  - `user.info.basic`
  - `video.list`
- Add the testing TikTok account as a sandbox tester or target user if required by the portal.

## 5. Blockers Before OAuth Implementation

- Missing Sandbox Client Key.
- Missing Sandbox Client Secret.
- Redirect URI mismatch.
- Login Kit not enabled.
- `user.info.basic` scope unavailable.
- `video.list` scope unavailable.
- TikTok account not added as tester if required.
- `DATABASE_URL` missing if token persistence is required.
- `TOKEN_ENCRYPTION_KEY` missing if token persistence is required.

## Security Rules

- Real values must only be placed in `apps/web/.env.local` or Vercel Environment Variables.
- Never write real values into `.env.example`.
- Never write real values into docs.
- Never write real values into README files.
- Never write real values into `docs/task-board.md` or `docs/project-status.md`.
- Never log `TIKTOK_CLIENT_SECRET`, `DATABASE_URL`, `TOKEN_ENCRYPTION_KEY`, access tokens, refresh tokens, cookies, or sessions.
- Never expose server secrets to browser or client components.
- Never ask the user to paste secrets into chat or prompts.

## 6. Next Task After Readiness

TAD-045: Implement TikTok OAuth connect and callback for Sandbox testing only.
