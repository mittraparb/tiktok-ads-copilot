import "server-only";

import { prisma } from "@/lib/prisma";
import {
  fetchTikTokVideoListFirstPage,
  TIKTOK_VIDEO_LIST_MAX_COUNT,
  type TikTokDisplayApiVideo,
} from "@/lib/tiktok-display-api";

export type TikTokVideoSyncResult =
  | {
      ok: true;
      cursor?: number;
      deletedStaleCount: number;
      hasMore: boolean;
      maxCount: number;
      skippedCount: number;
      syncedAt: Date;
      syncedCount: number;
      videos: Awaited<ReturnType<typeof upsertTikTokVideos>>;
    }
  | {
      ok: false;
      failure: {
        error: string;
        errorDescription: string;
        status: number;
      };
    };

export async function syncTikTokVideosForAccount({
  accessToken,
  accountId,
}: {
  accessToken: string;
  accountId: string;
}): Promise<TikTokVideoSyncResult> {
  const videoListResult = await fetchTikTokVideoListFirstPage({ accessToken });

  if (!videoListResult.ok) {
    return videoListResult;
  }

  const syncStartedAt = new Date();
  const upsertedVideos = await upsertTikTokVideos({
    accountId,
    syncedAt: syncStartedAt,
    videos: videoListResult.videos,
  });
  const syncedIds = upsertedVideos.map((video) => video.tikTokVideoId);
  const deletedStaleCount = videoListResult.hasMore
    ? 0
    : await deleteStaleVideos({ accountId, syncedIds });

  await prisma.tikTokAccount.update({
    where: {
      id: accountId,
    },
    data: {
      lastSyncedAt: syncStartedAt,
    },
  });

  return {
    ok: true,
    cursor: videoListResult.cursor,
    deletedStaleCount,
    hasMore: videoListResult.hasMore,
    maxCount: TIKTOK_VIDEO_LIST_MAX_COUNT,
    skippedCount: videoListResult.videos.length - upsertedVideos.length,
    syncedAt: syncStartedAt,
    syncedCount: upsertedVideos.length,
    videos: upsertedVideos,
  };
}

export function toSafeTikTokVideoResponse(
  videos: Awaited<ReturnType<typeof upsertTikTokVideos>>
) {
  return videos.map((video) => ({
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
  }));
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

async function deleteStaleVideos({
  accountId,
  syncedIds,
}: {
  accountId: string;
  syncedIds: string[];
}) {
  const staleRows = await prisma.tikTokVideo.deleteMany({
    where: {
      tikTokAccountId: accountId,
      tikTokVideoId: {
        notIn: syncedIds,
      },
    },
  });

  return staleRows.count;
}
