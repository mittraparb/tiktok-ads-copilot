import { createHash, randomBytes } from "node:crypto";

const TIKTOK_AUTHORIZATION_URL = "https://www.tiktok.com/v2/auth/authorize/";
const TIKTOK_TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/";
const TIKTOK_USER_INFO_URL = "https://open.tiktokapis.com/v2/user/info/";

export const TIKTOK_OAUTH_STATE_COOKIE = "tad_tiktok_oauth_state";
export const TIKTOK_CODE_VERIFIER_COOKIE = "tad_tiktok_code_verifier";
export const TIKTOK_CONNECTED_COOKIE = "tad_tiktok_connected";
export const TIKTOK_CONNECTED_EXPIRES_AT_COOKIE = "tad_tiktok_connected_expires_at";
export const TIKTOK_CONNECTED_PROFILE_COOKIE = "tad_tiktok_connected_profile";
export const TIKTOK_CONNECTED_SCOPES_COOKIE = "tad_tiktok_connected_scopes";
export const TIKTOK_OAUTH_SCOPES = [
  "user.info.basic",
  "user.info.profile",
  "user.info.stats",
  "video.list",
] as const;

export type TikTokOAuthConfig = {
  appEnv: "sandbox";
  clientKey: string;
  clientSecret: string;
  redirectUri: string;
  appUrl: string;
};

export type TikTokTokenSuccess = {
  access_token: string;
  expires_in: number;
  open_id: string;
  refresh_expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

export type TikTokTokenFailure = {
  status: number;
  error: string;
  errorDescription: string;
};

export type TikTokUserProfile = {
  avatarUrl?: string;
  displayName?: string;
  followerCount?: number;
  followingCount?: number;
  isVerified?: boolean;
  likesCount?: number;
  openId: string;
  profileDeepLink?: string;
  unionId?: string;
  username?: string;
  videoCount?: number;
};

export function getTikTokOAuthConfig():
  | { ok: true; config: TikTokOAuthConfig }
  | { ok: false; issues: string[] } {
  const appEnv = process.env.TIKTOK_APP_ENV?.trim();
  const clientKey = process.env.TIKTOK_CLIENT_KEY?.trim();
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET?.trim();
  const redirectUri = process.env.TIKTOK_REDIRECT_URI?.trim();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();

  const issues: string[] = [];

  if (appEnv !== "sandbox") {
    issues.push("TIKTOK_APP_ENV must be set to sandbox for TAD-045.");
  }

  if (!clientKey) {
    issues.push("TIKTOK_CLIENT_KEY is missing.");
  }

  if (!clientSecret) {
    issues.push("TIKTOK_CLIENT_SECRET is missing.");
  }

  if (!redirectUri || !isValidAbsoluteUrl(redirectUri)) {
    issues.push("TIKTOK_REDIRECT_URI must be an absolute callback URL.");
  }

  if (!appUrl || !isValidAbsoluteUrl(appUrl)) {
    issues.push("NEXT_PUBLIC_APP_URL must be an absolute app URL.");
  }

  if (issues.length > 0) {
    return { ok: false, issues };
  }

  return {
    ok: true,
    config: {
      appEnv: "sandbox",
      clientKey: clientKey!,
      clientSecret: clientSecret!,
      redirectUri: redirectUri!,
      appUrl: appUrl!,
    },
  };
}

export function buildTikTokAuthorizationUrl(
  config: TikTokOAuthConfig,
  state: string,
  codeChallenge: string
) {
  const url = new URL(TIKTOK_AUTHORIZATION_URL);

  url.searchParams.set("client_key", config.clientKey);
  url.searchParams.set("code_challenge", codeChallenge);
  url.searchParams.set("code_challenge_method", "S256");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", TIKTOK_OAUTH_SCOPES.join(","));
  url.searchParams.set("redirect_uri", config.redirectUri);
  url.searchParams.set("state", state);

  return url;
}

export function generateTikTokPkcePair() {
  const codeVerifier = randomBytes(64).toString("base64url");
  const codeChallenge = createHash("sha256")
    .update(codeVerifier)
    .digest("hex");

  return { codeChallenge, codeVerifier };
}

export async function exchangeTikTokAuthorizationCode({
  code,
  codeVerifier,
  config,
}: {
  code: string;
  codeVerifier: string;
  config: TikTokOAuthConfig;
}): Promise<
  | { ok: true; token: TikTokTokenSuccess }
  | { ok: false; failure: TikTokTokenFailure }
> {
  const body = new URLSearchParams({
    client_key: config.clientKey,
    client_secret: config.clientSecret,
    code,
    code_verifier: codeVerifier,
    grant_type: "authorization_code",
    redirect_uri: config.redirectUri,
  });

  const response = await fetch(TIKTOK_TOKEN_URL, {
    method: "POST",
    headers: {
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
    cache: "no-store",
  });

  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok || !isTikTokTokenSuccess(payload)) {
    const failurePayload = isTikTokTokenError(payload) ? payload : null;

    return {
      ok: false,
      failure: {
        status: response.status,
        error: failurePayload?.error ?? "token_exchange_failed",
        errorDescription:
          failurePayload?.error_description ??
          "TikTok did not return a valid token response.",
      },
    };
  }

  return { ok: true, token: payload };
}

export async function fetchTikTokUserProfile({
  accessToken,
  scope,
}: {
  accessToken: string;
  scope: string;
}): Promise<
  | { ok: true; profile: TikTokUserProfile }
  | { ok: false; failure: TikTokTokenFailure }
> {
  const fields = getUserInfoFields(scope);
  const url = new URL(TIKTOK_USER_INFO_URL);

  url.searchParams.set("fields", fields.join(","));

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });
  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok || !isTikTokUserInfoSuccess(payload)) {
    const errorPayload = isTikTokApiError(payload) ? payload.error : null;

    return {
      ok: false,
      failure: {
        status: response.status,
        error: errorPayload?.code ?? "user_info_failed",
        errorDescription:
          errorPayload?.message ??
          "TikTok did not return valid user profile information.",
      },
    };
  }

  return { ok: true, profile: mapTikTokUserProfile(payload.data.user) };
}

export function shouldUseSecureCookie(redirectUri: string) {
  return redirectUri.startsWith("https://");
}

function getUserInfoFields(scope: string) {
  const grantedScopes = new Set(
    scope
      .split(/[,\s]+/)
      .map((value) => value.trim())
      .filter(Boolean)
  );
  const fields = ["open_id", "union_id", "avatar_url", "display_name"];

  if (grantedScopes.has("user.info.profile")) {
    fields.push("username", "profile_deep_link", "is_verified");
  }

  if (grantedScopes.has("user.info.stats")) {
    fields.push(
      "follower_count",
      "following_count",
      "likes_count",
      "video_count"
    );
  }

  return fields;
}

function isValidAbsoluteUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isTikTokTokenSuccess(value: unknown): value is TikTokTokenSuccess {
  if (!value || typeof value !== "object") {
    return false;
  }

  const token = value as Record<string, unknown>;

  return (
    typeof token.access_token === "string" &&
    typeof token.expires_in === "number" &&
    typeof token.open_id === "string" &&
    typeof token.refresh_expires_in === "number" &&
    typeof token.refresh_token === "string" &&
    typeof token.scope === "string" &&
    typeof token.token_type === "string"
  );
}

function isTikTokTokenError(
  value: unknown
): value is { error: string; error_description?: string } {
  if (!value || typeof value !== "object") {
    return false;
  }

  const error = value as Record<string, unknown>;

  return (
    typeof error.error === "string" &&
    (typeof error.error_description === "string" ||
      typeof error.error_description === "undefined")
  );
}

function isTikTokUserInfoSuccess(
  value: unknown
): value is { data: { user: Record<string, unknown> } } {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Record<string, unknown>;
  const data = payload.data as Record<string, unknown> | undefined;
  const user = data?.user;

  return Boolean(
    user &&
      typeof user === "object" &&
      typeof (user as Record<string, unknown>).open_id === "string"
  );
}

function isTikTokApiError(
  value: unknown
): value is { error: { code?: string; message?: string } } {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Record<string, unknown>;
  const error = payload.error;

  return Boolean(error && typeof error === "object");
}

function mapTikTokUserProfile(user: Record<string, unknown>): TikTokUserProfile {
  return {
    avatarUrl: optionalString(user.avatar_url),
    displayName: optionalString(user.display_name),
    followerCount: optionalNumber(user.follower_count),
    followingCount: optionalNumber(user.following_count),
    isVerified: optionalBoolean(user.is_verified),
    likesCount: optionalNumber(user.likes_count),
    openId: user.open_id as string,
    profileDeepLink: optionalString(user.profile_deep_link),
    unionId: optionalString(user.union_id),
    username: optionalString(user.username),
    videoCount: optionalNumber(user.video_count),
  };
}

function optionalBoolean(value: unknown) {
  return typeof value === "boolean" ? value : undefined;
}

function optionalNumber(value: unknown) {
  return typeof value === "number" ? value : undefined;
}

function optionalString(value: unknown) {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}
