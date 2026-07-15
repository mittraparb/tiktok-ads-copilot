import { timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import {
  exchangeTikTokAuthorizationCode,
  fetchTikTokUserProfile,
  getTikTokOAuthConfig,
  shouldUseSecureCookie,
  TIKTOK_CODE_VERIFIER_COOKIE,
  TIKTOK_CONNECTED_COOKIE,
  TIKTOK_CONNECTED_EXPIRES_AT_COOKIE,
  TIKTOK_CONNECTED_PROFILE_COOKIE,
  TIKTOK_CONNECTED_SCOPES_COOKIE,
  TIKTOK_OAUTH_STATE_COOKIE,
} from "@/lib/tiktok-oauth";
import { persistTikTokOAuthSession } from "@/lib/tiktok-token-store";
import { syncTikTokVideosForAccount } from "@/lib/tiktok-video-sync";

const CONNECTED_MAX_AGE_SECONDS = 60 * 60;

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const configResult = getTikTokOAuthConfig();

  if (!configResult.ok) {
    return htmlResponse({
      status: 500,
      title: "TikTok OAuth is not configured",
      body: [
        "The app is missing required Sandbox OAuth environment variables.",
        ...configResult.issues,
      ],
    });
  }

  const searchParams = request.nextUrl.searchParams;
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");

  if (error) {
    return htmlResponse({
      status: 400,
      title: "TikTok authorization was not completed",
      body: [
        `TikTok returned: ${error}`,
        errorDescription ?? "The user may have cancelled or denied authorization.",
      ],
    });
  }

  const code = searchParams.get("code");
  const returnedState = searchParams.get("state");
  const grantedScopes = searchParams.get("scopes");

  if (!code || !returnedState) {
    return htmlResponse({
      status: 400,
      title: "TikTok callback is missing required values",
      body: ["The callback must include both code and state query parameters."],
    });
  }

  const cookieStore = await cookies();
  const expectedState = cookieStore.get(TIKTOK_OAUTH_STATE_COOKIE)?.value;
  const codeVerifier = cookieStore.get(TIKTOK_CODE_VERIFIER_COOKIE)?.value;

  cookieStore.set(TIKTOK_OAUTH_STATE_COOKIE, "", {
    maxAge: 0,
    path: "/",
  });
  cookieStore.set(TIKTOK_CODE_VERIFIER_COOKIE, "", {
    maxAge: 0,
    path: "/",
  });

  if (!expectedState || !statesMatch(expectedState, returnedState)) {
    return htmlResponse({
      status: 400,
      title: "TikTok OAuth state check failed",
      body: [
        "The callback state did not match the original login request.",
        "Start the TikTok connection again from the app.",
      ],
    });
  }

  if (!codeVerifier) {
    return htmlResponse({
      status: 400,
      title: "TikTok OAuth verifier is missing",
      body: [
        "The callback could not find the original PKCE verifier for this login request.",
        "Start the TikTok connection again from the app.",
      ],
    });
  }

  const tokenResult = await exchangeTikTokAuthorizationCode({
    code,
    codeVerifier,
    config: configResult.config,
  });

  if (!tokenResult.ok) {
    return htmlResponse({
      status: 502,
      title: "TikTok token exchange failed",
      body: [
        `TikTok response status: ${tokenResult.failure.status}`,
        `Error: ${tokenResult.failure.error}`,
        tokenResult.failure.errorDescription,
      ],
    });
  }

  const grantedScope = grantedScopes ?? tokenResult.token.scope;
  const missingRequiredScopes = getMissingConnectedAccountScopes(grantedScope);

  if (missingRequiredScopes.length > 0) {
    return htmlResponse({
      status: 400,
      title: "TikTok scopes are missing",
      body: [
        "TikTok Login Kit succeeded, but TikTok did not grant all scopes required to show the connected account card correctly.",
        `Missing scopes: ${missingRequiredScopes.join(", ")}`,
        "Enable these scopes in the TikTok Developer Portal Sandbox Login Kit settings, then reconnect TikTok.",
      ],
    });
  }

  const profileResult = await fetchTikTokUserProfile({
    accessToken: tokenResult.token.access_token,
    scope: grantedScope,
  });

  if (!profileResult.ok) {
    return htmlResponse({
      status: 502,
      title: "TikTok profile fetch failed",
      body: [
        `TikTok response status: ${profileResult.failure.status}`,
        `Error: ${profileResult.failure.error}`,
        profileResult.failure.errorDescription,
        "Login Kit token exchange succeeded, but the app could not read basic account information for the connected account.",
      ],
    });
  }

  const persistenceResult = await persistTikTokOAuthSession({
    grantedScope,
    profile: profileResult.profile,
    token: tokenResult.token,
  });

  if (!persistenceResult.ok) {
    return htmlResponse({
      status: 500,
      title: "TikTok token persistence is not ready",
      body: [
        "TikTok Login Kit authorization completed, but the app could not securely persist the token values yet.",
        ...persistenceResult.issues,
        "No token values were printed or exposed to the browser.",
      ],
    });
  }

  const videoSyncResult = grantedScope
    .split(/[,\s]+/)
    .includes("video.list")
    ? await syncTikTokVideosForAccount({
        accessToken: tokenResult.token.access_token,
        accountId: persistenceResult.accountId,
      })
    : null;
  const connectedMaxAge = Math.min(
    tokenResult.token.expires_in,
    CONNECTED_MAX_AGE_SECONDS
  );
  const secureCookie = shouldUseSecureCookie(configResult.config.redirectUri);

  cookieStore.set(TIKTOK_CONNECTED_COOKIE, "1", {
    httpOnly: true,
    maxAge: connectedMaxAge,
    path: "/",
    sameSite: "lax",
    secure: secureCookie,
  });
  cookieStore.set(
    TIKTOK_CONNECTED_SCOPES_COOKIE,
    grantedScope,
    {
      httpOnly: true,
      maxAge: connectedMaxAge,
      path: "/",
      sameSite: "lax",
      secure: secureCookie,
    }
  );
  cookieStore.set(
    TIKTOK_CONNECTED_PROFILE_COOKIE,
    JSON.stringify(profileResult.profile),
    {
      httpOnly: true,
      maxAge: connectedMaxAge,
      path: "/",
      sameSite: "lax",
      secure: secureCookie,
    }
  );
  cookieStore.set(
    TIKTOK_CONNECTED_EXPIRES_AT_COOKIE,
    new Date(Date.now() + connectedMaxAge * 1000).toISOString(),
    {
      httpOnly: true,
      maxAge: connectedMaxAge,
      path: "/",
      sameSite: "lax",
      secure: secureCookie,
    }
  );

  return htmlResponse({
    status: 200,
    title: "TikTok Sandbox login connected",
    body: [
      "TikTok Login Kit authorization completed and the server exchanged the code successfully.",
      `Connected account: ${
        profileResult.profile.displayName ?? profileResult.profile.openId
      }`,
      "Token metadata was persisted for the connected TikTok account.",
      `Access token expires at ${persistenceResult.expiresAt.toISOString()}.`,
      `Refresh token expires at ${persistenceResult.refreshExpiresAt.toISOString()}.`,
      "Access and refresh token values were encrypted before storage and were not printed or exposed to the browser.",
      `Granted scopes: ${grantedScope}`,
      getVideoSyncMessage(videoSyncResult),
    ],
    actionHref: "/videos",
    actionLabel: "Open Video Library",
  });
}

function statesMatch(expectedState: string, returnedState: string) {
  const expected = Buffer.from(expectedState);
  const returned = Buffer.from(returnedState);

  return expected.length === returned.length && timingSafeEqual(expected, returned);
}

function getMissingConnectedAccountScopes(scope: string) {
  const grantedScopes = new Set(
    scope
      .split(/[,\s]+/)
      .map((value) => value.trim())
      .filter(Boolean)
  );
  const requiredScopes = [
    "user.info.basic",
    "user.info.profile",
    "user.info.stats",
    "video.list",
  ];

  return requiredScopes.filter((requiredScope) => !grantedScopes.has(requiredScope));
}

function getVideoSyncMessage(
  syncResult: Awaited<ReturnType<typeof syncTikTokVideosForAccount>> | null
) {
  if (!syncResult) {
    return "Video sync was skipped because video.list was not granted.";
  }

  if (!syncResult.ok) {
    return `Video sync needs retry: ${syncResult.failure.errorDescription}`;
  }

  return `Video library refreshed: ${syncResult.syncedCount} videos synced from TikTok Display API.`;
}

function htmlResponse({
  actionHref,
  actionLabel,
  body,
  status,
  title,
}: {
  actionHref?: string;
  actionLabel?: string;
  body: string[];
  status: number;
  title: string;
}) {
  const safeTitle = escapeHtml(title);
  const safeBody = body.map((line) => `<p>${escapeHtml(line)}</p>`).join("");
  const action =
    actionHref && actionLabel
      ? `<a href="${escapeHtml(actionHref)}">${escapeHtml(actionLabel)}</a>`
      : `<a href="/">Back to app</a>`;

  return new NextResponse(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${safeTitle}</title>
    <style>
      body {
        background: #f7f7f8;
        color: #09090b;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        margin: 0;
      }
      main {
        margin: 0 auto;
        max-width: 720px;
        padding: 64px 20px;
      }
      section {
        background: white;
        border: 1px solid #e4e4e7;
        border-radius: 8px;
        padding: 28px;
        box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
      }
      h1 {
        font-size: 28px;
        line-height: 1.2;
        margin: 0 0 16px;
      }
      p {
        color: #52525b;
        font-size: 14px;
        line-height: 1.7;
        margin: 10px 0;
      }
      a {
        background: #09090b;
        border-radius: 8px;
        color: white;
        display: inline-flex;
        font-size: 14px;
        font-weight: 600;
        margin-top: 18px;
        padding: 10px 14px;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <main>
      <section>
        <h1>${safeTitle}</h1>
        ${safeBody}
        ${action}
      </section>
    </main>
  </body>
</html>`,
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
      status,
    }
  );
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character] ?? character;
  });
}
