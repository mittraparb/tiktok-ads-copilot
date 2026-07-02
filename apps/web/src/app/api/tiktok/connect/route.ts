import { randomBytes } from "node:crypto";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  buildTikTokAuthorizationUrl,
  getTikTokOAuthConfig,
  shouldUseSecureCookie,
  TIKTOK_OAUTH_STATE_COOKIE,
} from "@/lib/tiktok-oauth";

const STATE_MAX_AGE_SECONDS = 10 * 60;

export const dynamic = "force-dynamic";

export async function GET() {
  const configResult = getTikTokOAuthConfig();

  if (!configResult.ok) {
    return NextResponse.json(
      {
        error: "tiktok_oauth_not_configured",
        issues: configResult.issues,
      },
      { status: 500 }
    );
  }

  const state = randomBytes(32).toString("hex");
  const authorizationUrl = buildTikTokAuthorizationUrl(
    configResult.config,
    state
  );

  const cookieStore = await cookies();

  cookieStore.set(TIKTOK_OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    maxAge: STATE_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: shouldUseSecureCookie(configResult.config.redirectUri),
  });

  return NextResponse.redirect(authorizationUrl);
}
