import { createHash } from "node:crypto";

import { NextResponse } from "next/server";

import {
  buildTikTokAuthorizationUrl,
  generateTikTokPkcePair,
  getTikTokOAuthConfig,
} from "@/lib/tiktok-oauth";

export const dynamic = "force-dynamic";

export async function GET() {
  const configResult = getTikTokOAuthConfig();

  if (!configResult.ok) {
    return NextResponse.json(
      {
        ok: false,
        issues: configResult.issues,
      },
      { status: 500 }
    );
  }

  const { codeChallenge } = generateTikTokPkcePair();
  const authorizationUrl = buildTikTokAuthorizationUrl(
    configResult.config,
    "debug-state-redacted",
    codeChallenge
  );
  const redirectUrl = new URL(configResult.config.redirectUri);
  const appUrl = new URL(configResult.config.appUrl);

  return NextResponse.json({
    ok: true,
    appEnv: configResult.config.appEnv,
    appHost: appUrl.host,
    authHost: authorizationUrl.host,
    authPath: authorizationUrl.pathname,
    clientKeyFingerprint: fingerprint(configResult.config.clientKey),
    codeChallengeLength: codeChallenge.length,
    codeChallengeMethod: authorizationUrl.searchParams.get(
      "code_challenge_method"
    ),
    hasClientKey: authorizationUrl.searchParams.has("client_key"),
    hasCodeChallenge: authorizationUrl.searchParams.has("code_challenge"),
    hasState: authorizationUrl.searchParams.has("state"),
    redirectHost: redirectUrl.host,
    redirectPath: redirectUrl.pathname,
    redirectUri: authorizationUrl.searchParams.get("redirect_uri"),
    responseType: authorizationUrl.searchParams.get("response_type"),
    scopes: authorizationUrl.searchParams.get("scope")?.split(",") ?? [],
  });
}

function fingerprint(value: string) {
  return createHash("sha256").update(value).digest("hex").slice(0, 10);
}
