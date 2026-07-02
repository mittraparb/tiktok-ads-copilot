# Vercel Deployment Checklist

Use Vercel as the main public deployment URL for TikTok Ads Co-Pilot testing. Vercel Hobby/free is enough for the current prototype and TikTok Sandbox setup.

## Core Decision

- Use Vercel as the stable public deployment URL.
- Use TikTok Sandbox credentials for testing.
- Do not use Production TikTok credentials yet.
- Use ngrok only later if local OAuth callback debugging is needed.
- Do not implement OAuth until Vercel deployment and Sandbox readiness are confirmed.

## Recommended Vercel Settings

- Root Directory: `apps/web`
- Framework Preset: `Next.js`
- Install Command: `pnpm install`
- Build Command: `pnpm build`
- Output Directory: `.next`

## Required Environment Variable Names

Add these names in Vercel Project Settings > Environment Variables. Do not put real values in this document.

```text
TIKTOK_APP_ENV
TIKTOK_CLIENT_KEY
TIKTOK_CLIENT_SECRET
TIKTOK_REDIRECT_URI
NEXT_PUBLIC_APP_URL
DATABASE_URL
TOKEN_ENCRYPTION_KEY
```

## Where Real Values Go

Local development:

```text
apps/web/.env.local
```

Vercel deployment:

```text
Vercel Project Settings > Environment Variables
```

Never write real values into docs, README files, `.env.example`, `docs/task-board.md`, or `docs/project-status.md`.

## Public URLs After Deployment

Replace `https://your-vercel-domain` with the deployed Vercel URL.

```text
Web/Desktop URL: https://your-vercel-domain
Terms of Service URL: https://your-vercel-domain/terms
Privacy Policy URL: https://your-vercel-domain/privacy
Redirect URI: https://your-vercel-domain/api/tiktok/callback
```

The redirect URI must exactly match the value configured in TikTok Developer Portal and `TIKTOK_REDIRECT_URI`.

## Deployment Checklist

- Confirm `/` builds as a public landing page.
- Confirm `/terms` builds as a public Terms page.
- Confirm `/privacy` builds as a public Privacy page.
- Deploy `apps/web` to Vercel.
- Add environment variables in Vercel with real values only in Vercel's encrypted settings.
- Set `TIKTOK_APP_ENV` to `sandbox` for Sandbox testing.
- Use Sandbox Client Key and Sandbox Client Secret.
- Do not use Production TikTok credentials until review or live use later.
- Configure TikTok Developer Portal URLs from the Vercel deployment.

