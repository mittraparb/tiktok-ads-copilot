import { randomBytes } from "node:crypto";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  buildTikTokAuthorizationUrl,
  generateTikTokPkcePair,
  getTikTokOAuthConfig,
  shouldUseSecureCookie,
  TIKTOK_CODE_VERIFIER_COOKIE,
  TIKTOK_CONNECTED_COOKIE,
  TIKTOK_CONNECTED_EXPIRES_AT_COOKIE,
  TIKTOK_CONNECTED_PROFILE_COOKIE,
  TIKTOK_CONNECTED_SCOPES_COOKIE,
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
  const { codeChallenge, codeVerifier } = generateTikTokPkcePair();
  const authorizationUrl = buildTikTokAuthorizationUrl(
    configResult.config,
    state,
    codeChallenge
  );

  const cookieStore = await cookies();
  const secureCookie = shouldUseSecureCookie(configResult.config.redirectUri);

  clearCookie(cookieStore, TIKTOK_CONNECTED_COOKIE);
  clearCookie(cookieStore, TIKTOK_CONNECTED_SCOPES_COOKIE);
  clearCookie(cookieStore, TIKTOK_CONNECTED_PROFILE_COOKIE);
  clearCookie(cookieStore, TIKTOK_CONNECTED_EXPIRES_AT_COOKIE);

  cookieStore.set(TIKTOK_OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    maxAge: STATE_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: secureCookie,
  });

  cookieStore.set(TIKTOK_CODE_VERIFIER_COOKIE, codeVerifier, {
    httpOnly: true,
    maxAge: STATE_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: secureCookie,
  });

  return NextResponse.redirect(authorizationUrl);
}

function clearCookie(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  name: string
) {
  cookieStore.set(name, "", {
    maxAge: 0,
    path: "/",
  });
}
