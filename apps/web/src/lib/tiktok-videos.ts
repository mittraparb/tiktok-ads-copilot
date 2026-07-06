import "server-only";

import { prisma } from "@/lib/prisma";
import type { TikTokDisplayVideo } from "@/lib/pre-boost";

export type SyncedTikTokVideoLibrary = {
  account?: {
    displayName?: string;
    lastSyncedAt?: string;
    openId: string;
  };
  source: "synced" | "mock";
  videos: TikTokDisplayVideo[];
};

export async function getSyncedTikTokVideoLibrary(
  openId?: string
): Promise<SyncedTikTokVideoLibrary> {
  if (!openId) {
    return {
      source: "mock",
      videos: [],
    };
  }

  const account = await prisma.tikTokAccount.findUnique({
    where: {
      openId,
    },
    select: {
      displayName: true,
      lastSyncedAt: true,
      openId: true,
      videos: {
        orderBy: {
          createTime: "desc",
        },
        select: {
          commentCount: true,
          coverImageUrl: true,
          createTime: true,
          duration: true,
          likeCount: true,
          shareCount: true,
          shareUrl: true,
          tikTokVideoId: true,
          title: true,
          videoDescription: true,
          viewCount: true,
        },
      },
    },
  });

  if (!account || account.videos.length === 0) {
    return {
      account: account
        ? {
            displayName: account.displayName ?? undefined,
            lastSyncedAt: account.lastSyncedAt?.toISOString(),
            openId: account.openId,
          }
        : undefined,
      source: "mock",
      videos: [],
    };
  }

  return {
    account: {
      displayName: account.displayName ?? undefined,
      lastSyncedAt: account.lastSyncedAt?.toISOString(),
      openId: account.openId,
    },
    source: "synced",
    videos: account.videos.map((video) => ({
      comment_count: video.commentCount,
      cover_image_url: video.coverImageUrl ?? "",
      create_time: Math.floor(video.createTime.getTime() / 1000),
      duration: video.duration ?? 0,
      id: video.tikTokVideoId,
      like_count: video.likeCount,
      share_count: video.shareCount,
      share_url: video.shareUrl ?? "",
      title:
        video.title ??
        video.videoDescription?.slice(0, 72) ??
        "Untitled TikTok video",
      video_description: video.videoDescription ?? "",
      view_count: Number(video.viewCount),
    })),
  };
}
