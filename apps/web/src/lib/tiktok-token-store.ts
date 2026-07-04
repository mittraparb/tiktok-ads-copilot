import "server-only";

import { prisma } from "@/lib/prisma";
import {
  encryptSecret,
  getTokenEncryptionConfig,
} from "@/lib/token-encryption";
import type { TikTokTokenSuccess, TikTokUserProfile } from "@/lib/tiktok-oauth";

const SANDBOX_USER_EMAIL = "sandbox@tiktok-ads-copilot.local";
const SANDBOX_USER_NAME = "TikTok Sandbox User";

export type TokenPersistenceResult =
  | {
      ok: true;
      expiresAt: Date;
      refreshExpiresAt: Date;
    }
  | { ok: false; issues: string[] };

export async function persistTikTokOAuthSession({
  grantedScope,
  profile,
  token,
}: {
  grantedScope: string;
  profile: TikTokUserProfile;
  token: TikTokTokenSuccess;
}): Promise<TokenPersistenceResult> {
  const config = getTokenPersistenceConfig();

  if (!config.ok) {
    return config;
  }

  const now = Date.now();
  const expiresAt = new Date(now + token.expires_in * 1000);
  const refreshExpiresAt = new Date(now + token.refresh_expires_in * 1000);
  const encryptedAccessToken = encryptSecret(token.access_token, config.key);
  const encryptedRefreshToken = encryptSecret(token.refresh_token, config.key);

  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.upsert({
        where: {
          email: SANDBOX_USER_EMAIL,
        },
        update: {
          name: SANDBOX_USER_NAME,
        },
        create: {
          email: SANDBOX_USER_EMAIL,
          name: SANDBOX_USER_NAME,
        },
        select: {
          id: true,
        },
      });

      const account = await tx.tikTokAccount.upsert({
        where: {
          openId: profile.openId,
        },
        update: {
          avatarUrl: profile.avatarUrl,
          displayName: profile.displayName,
          unionId: profile.unionId,
        },
        create: {
          avatarUrl: profile.avatarUrl,
          displayName: profile.displayName,
          openId: profile.openId,
          unionId: profile.unionId,
          userId: user.id,
        },
        select: {
          id: true,
        },
      });

      await tx.tikTokToken.upsert({
        where: {
          tikTokAccountId: account.id,
        },
        update: {
          encryptedAccessToken,
          encryptedRefreshToken,
          expiresAt,
          refreshExpiresAt,
          scope: grantedScope,
          tokenType: token.token_type,
        },
        create: {
          encryptedAccessToken,
          encryptedRefreshToken,
          expiresAt,
          refreshExpiresAt,
          scope: grantedScope,
          tikTokAccountId: account.id,
          tokenType: token.token_type,
        },
      });
    });

    return {
      ok: true,
      expiresAt,
      refreshExpiresAt,
    };
  } catch {
    return {
      ok: false,
      issues: [
        "Token persistence failed. Confirm DATABASE_URL points to a migrated PostgreSQL database.",
      ],
    };
  }
}

function getTokenPersistenceConfig():
  | { ok: true; key: Buffer }
  | { ok: false; issues: string[] } {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  const encryptionConfig = getTokenEncryptionConfig();
  const issues: string[] = [];

  if (!databaseUrl) {
    issues.push("DATABASE_URL is missing.");
  }

  if (!encryptionConfig.ok) {
    issues.push(...encryptionConfig.issues);
    return { ok: false, issues };
  }

  if (issues.length > 0) {
    return { ok: false, issues };
  }

  return { ok: true, key: encryptionConfig.key };
}
