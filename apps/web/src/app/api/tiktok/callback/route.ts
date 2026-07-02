import { timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

import {
  exchangeTikTokAuthorizationCode,
  getTikTokOAuthConfig,
  shouldUseSecureCookie,
  TIKTOK_CONNECTED_COOKIE,
  TIKTOK_OAUTH_STATE_COOKIE,
} from "@/lib/tiktok-oauth";

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

  cookieStore.set(TIKTOK_OAUTH_STATE_COOKIE, "", {
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

  const tokenResult = await exchangeTikTokAuthorizationCode({
    code,
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

  cookieStore.set(TIKTOK_CONNECTED_COOKIE, "1", {
    httpOnly: true,
    maxAge: Math.min(tokenResult.token.expires_in, CONNECTED_MAX_AGE_SECONDS),
    path: "/",
    sameSite: "lax",
    secure: shouldUseSecureCookie(configResult.config.redirectUri),
  });

  return htmlResponse({
    status: 200,
    title: "TikTok Sandbox login connected",
    body: [
      "TikTok Login Kit authorization completed and the server exchanged the code successfully.",
      "Access and refresh token values were not printed, exposed to the browser, or persisted in this task.",
      `Granted scopes: ${grantedScopes ?? tokenResult.token.scope}`,
      "Next task: securely persist tokens, then sync the first page of TikTok videos.",
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
