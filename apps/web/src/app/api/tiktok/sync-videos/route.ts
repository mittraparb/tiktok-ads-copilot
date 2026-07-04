import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import {
  fetchTikTokVideoListFirstPage,
  TIKTOK_VIDEO_LIST_MAX_COUNT,
  type TikTokDisplayApiVideo,
} from "@/lib/tiktok-display-api";
import {
  decryptSecret,
  getTokenEncryptionConfig,
} from "@/lib/token-encryption";

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

  const videoListResult = await fetchTikTokVideoListFirstPage({ accessToken });

  if (!videoListResult.ok) {
    return NextResponse.json(
      {
        error: videoListResult.failure.error,
        message: videoListResult.failure.errorDescription,
        status: videoListResult.failure.status,
      },
      { status: 502 }
    );
  }

  const syncStartedAt = new Date();
  const upsertedVideos = await upsertTikTokVideos({
    accountId: tokenResult.account.id,
    syncedAt: syncStartedAt,
    videos: videoListResult.videos,
  });

  await prisma.tikTokAccount.update({
    where: {
      id: tokenResult.account.id,
    },
    data: {
      lastSyncedAt: syncStartedAt,
    },
  });

  return NextResponse.json({
    hasMore: videoListResult.hasMore,
    maxCount: TIKTOK_VIDEO_LIST_MAX_COUNT,
    nextCursor: videoListResult.cursor,
    skippedCount: videoListResult.videos.length - upsertedVideos.length,
    syncedAt: syncStartedAt.toISOString(),
    syncedCount: upsertedVideos.length,
    videos: upsertedVideos.map((video) => ({
      id: video.tikTokVideoId,
      comment_count: video.commentCount,
      cover_image_url: video.coverImageUrl,
      create_time: Math.floor(video.createTime.getTime() / 1000),
      duration: video.duration,
      like_count: video.likeCount,
      share_count: video.shareCount,
      share_url: video.shareUrl,
      title: video.title,
      video_description: video.videoDescription,
      view_count: Number(video.viewCount),
    })),
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

async function upsertTikTokVideos({
  accountId,
  syncedAt,
  videos,
}: {
  accountId: string;
  syncedAt: Date;
  videos: TikTokDisplayApiVideo[];
}) {
  const validVideos = videos.filter((video) => video.id && video.create_time);

  return Promise.all(
    validVideos.map((video) =>
      prisma.tikTokVideo.upsert({
        where: {
          tikTokAccountId_tikTokVideoId: {
            tikTokAccountId: accountId,
            tikTokVideoId: video.id,
          },
        },
        update: {
          commentCount: video.comment_count ?? 0,
          coverImageUrl: video.cover_image_url,
          duration: video.duration,
          lastSyncedAt: syncedAt,
          likeCount: video.like_count ?? 0,
          shareCount: video.share_count ?? 0,
          shareUrl: video.share_url,
          title: video.title,
          videoDescription: video.video_description,
          viewCount: BigInt(video.view_count ?? 0),
        },
        create: {
          commentCount: video.comment_count ?? 0,
          coverImageUrl: video.cover_image_url,
          createTime: new Date(video.create_time * 1000),
          duration: video.duration,
          lastSyncedAt: syncedAt,
          likeCount: video.like_count ?? 0,
          shareCount: video.share_count ?? 0,
          shareUrl: video.share_url,
          tikTokAccountId: accountId,
          tikTokVideoId: video.id,
          title: video.title,
          videoDescription: video.video_description,
          viewCount: BigInt(video.view_count ?? 0),
        },
      })
    )
  );
}
