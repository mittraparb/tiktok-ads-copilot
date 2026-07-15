import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import {
  decryptSecret,
  getTokenEncryptionConfig,
} from "@/lib/token-encryption";
import {
  syncTikTokVideosForAccount,
  toSafeTikTokVideoResponse,
} from "@/lib/tiktok-video-sync";

export const dynamic = "force-dynamic";

export async function POST() {
  const tokenResult = await getLatestPersistedTikTokToken();

  if (!tokenResult.ok) {
    return NextResponse.json(
      {
        error: "tiktok_token_unavailable",
        message: tokenResult.message,
      },
      { status: tokenResult.status }
    );
  }

  const encryptionConfig = getTokenEncryptionConfig();

  if (!encryptionConfig.ok) {
    return NextResponse.json(
      {
        error: "token_encryption_not_configured",
        message: encryptionConfig.issues.join(" "),
      },
      { status: 500 }
    );
  }

  if (!tokenResult.token.scope.split(/[,\s]+/).includes("video.list")) {
    return NextResponse.json(
      {
        error: "missing_video_list_scope",
        message: "The persisted TikTok token does not include video.list.",
      },
      { status: 403 }
    );
  }

  if (tokenResult.token.expiresAt.getTime() <= Date.now()) {
    return NextResponse.json(
      {
        error: "tiktok_token_expired",
        message: "Reconnect TikTok before syncing videos.",
      },
      { status: 401 }
    );
  }

  let accessToken: string;

  try {
    accessToken = decryptSecret(
      tokenResult.token.encryptedAccessToken,
      encryptionConfig.key
    );
  } catch {
    return NextResponse.json(
      {
        error: "token_decryption_failed",
        message: "The persisted TikTok access token could not be decrypted.",
      },
      { status: 500 }
    );
  }

  const videoSyncResult = await syncTikTokVideosForAccount({
    accessToken,
    accountId: tokenResult.account.id,
  });

  if (!videoSyncResult.ok) {
    return NextResponse.json(
      {
        error: videoSyncResult.failure.error,
        message: videoSyncResult.failure.errorDescription,
        status: videoSyncResult.failure.status,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    deletedStaleCount: videoSyncResult.deletedStaleCount,
    hasMore: videoSyncResult.hasMore,
    maxCount: videoSyncResult.maxCount,
    nextCursor: videoSyncResult.cursor,
    skippedCount: videoSyncResult.skippedCount,
    syncedAt: videoSyncResult.syncedAt.toISOString(),
    syncedCount: videoSyncResult.syncedCount,
    videos: toSafeTikTokVideoResponse(videoSyncResult.videos),
  });
}

async function getLatestPersistedTikTokToken(): Promise<
  | {
      ok: true;
      account: { id: string };
      token: {
        encryptedAccessToken: string;
        expiresAt: Date;
        scope: string;
      };
    }
  | { ok: false; message: string; status: number }
> {
  const token = await prisma.tikTokToken.findFirst({
    orderBy: {
      updatedAt: "desc",
    },
    select: {
      encryptedAccessToken: true,
      expiresAt: true,
      scope: true,
      tikTokAccount: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!token) {
    return {
      ok: false,
      message: "Connect TikTok before syncing videos.",
      status: 401,
    };
  }

  return {
    ok: true,
    account: token.tikTokAccount,
    token,
  };
}
