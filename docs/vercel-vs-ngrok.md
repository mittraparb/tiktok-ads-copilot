# Vercel vs ngrok

Use Vercel as the main public deployment URL for TikTok Ads Co-Pilot. Use ngrok only as a temporary local debugging tool if needed later.

## Use Vercel For

- Web/Desktop URL
- Terms of Service URL
- Privacy Policy URL
- Production-like Redirect URI
- Stable TikTok Developer Portal setup

Vercel gives the project a stable HTTPS URL. That makes it the right default for TikTok Developer Portal configuration and Sandbox testing.

Use this URL format after deployment:

```text
Web/Desktop URL: https://your-vercel-domain
Terms of Service URL: https://your-vercel-domain/terms
Privacy Policy URL: https://your-vercel-domain/privacy
Redirect URI: https://your-vercel-domain/api/tiktok/callback
```

## Use ngrok Only For

- Temporary local OAuth callback debugging.
- Cases where TikTok must call back into a local development server.
- Short-lived troubleshooting sessions.

Do not use ngrok as the main project URL. ngrok URLs can change, which makes them fragile for TikTok Developer Portal setup.

If ngrok is used later, the redirect URI in TikTok Developer Portal must exactly match the current ngrok URL:

```text
https://current-ngrok-domain/api/tiktok/callback
```

The same exact value must also be used for `TIKTOK_REDIRECT_URI` in the relevant local environment.

When testing features that depend on TikTok OAuth cookies or connected-account state, open the app through the same ngrok origin used for OAuth. Do not switch to `localhost` for those checks. Cookies are host-scoped, so a session created on `https://current-ngrok-domain` will not be visible to `http://localhost:3000`, and the app may intentionally show mock fallback data there.
