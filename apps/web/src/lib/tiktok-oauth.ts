const TIKTOK_AUTHORIZATION_URL = "https://www.tiktok.com/v2/auth/authorize/";
const TIKTOK_TOKEN_URL = "https://open.tiktokapis.com/v2/oauth/token/";

export const TIKTOK_OAUTH_STATE_COOKIE = "tad_tiktok_oauth_state";
export const TIKTOK_CONNECTED_COOKIE = "tad_tiktok_connected";
export const TIKTOK_OAUTH_SCOPES = ["user.info.basic", "video.list"] as const;

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
  state: string
) {
  const url = new URL(TIKTOK_AUTHORIZATION_URL);

  url.searchParams.set("client_key", config.clientKey);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", TIKTOK_OAUTH_SCOPES.join(","));
  url.searchParams.set("redirect_uri", config.redirectUri);
  url.searchParams.set("state", state);

  return url;
}

export async function exchangeTikTokAuthorizationCode({
  code,
  config,
}: {
  code: string;
  config: TikTokOAuthConfig;
}): Promise<
  | { ok: true; token: TikTokTokenSuccess }
  | { ok: false; failure: TikTokTokenFailure }
> {
  const body = new URLSearchParams({
    client_key: config.clientKey,
    client_secret: config.clientSecret,
    code,
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

export function shouldUseSecureCookie(redirectUri: string) {
  return redirectUri.startsWith("https://");
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
