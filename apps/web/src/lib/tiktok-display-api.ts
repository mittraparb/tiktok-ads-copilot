import "server-only";

const TIKTOK_VIDEO_LIST_URL = "https://open.tiktokapis.com/v2/video/list/";
const VIDEO_LIST_FIELDS = [
  "id",
  "create_time",
  "cover_image_url",
  "share_url",
  "video_description",
  "duration",
  "title",
  "like_count",
  "comment_count",
  "share_count",
  "view_count",
] as const;

export const TIKTOK_VIDEO_LIST_MAX_COUNT = 20;

export type TikTokDisplayApiVideo = {
  id: string;
  create_time: number;
  cover_image_url?: string;
  share_url?: string;
  video_description?: string;
  duration?: number;
  title?: string;
  like_count?: number;
  comment_count?: number;
  share_count?: number;
  view_count?: number;
};

export type TikTokVideoListResult =
  | {
      ok: true;
      cursor?: number;
      hasMore: boolean;
      videos: TikTokDisplayApiVideo[];
    }
  | {
      ok: false;
      failure: {
        error: string;
        errorDescription: string;
        status: number;
      };
    };

export async function fetchTikTokVideoListFirstPage({
  accessToken,
}: {
  accessToken: string;
}): Promise<TikTokVideoListResult> {
  const url = new URL(TIKTOK_VIDEO_LIST_URL);

  url.searchParams.set("fields", VIDEO_LIST_FIELDS.join(","));

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      max_count: TIKTOK_VIDEO_LIST_MAX_COUNT,
    }),
    cache: "no-store",
  });
  const payload: unknown = await response.json().catch(() => null);

  if (!response.ok || !isTikTokVideoListSuccess(payload)) {
    const errorPayload = isTikTokApiError(payload) ? payload.error : null;

    return {
      ok: false,
      failure: {
        error: errorPayload?.code ?? "video_list_failed",
        errorDescription:
          errorPayload?.message ??
          "TikTok did not return a valid video list response.",
        status: response.status,
      },
    };
  }

  return {
    ok: true,
    cursor: optionalNumber(payload.data.cursor),
    hasMore: payload.data.has_more,
    videos: payload.data.videos.filter(isTikTokDisplayApiVideo),
  };
}

function isTikTokVideoListSuccess(
  value: unknown
): value is {
  data: {
    cursor?: unknown;
    has_more: boolean;
    videos: unknown[];
  };
} {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Record<string, unknown>;
  const data = payload.data as Record<string, unknown> | undefined;

  return Boolean(
    data &&
      Array.isArray(data.videos) &&
      typeof data.has_more === "boolean"
  );
}

function isTikTokDisplayApiVideo(
  value: unknown
): value is TikTokDisplayApiVideo {
  if (!value || typeof value !== "object") {
    return false;
  }

  const video = value as Record<string, unknown>;

  return typeof video.id === "string" && typeof video.create_time === "number";
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

function optionalNumber(value: unknown) {
  return typeof value === "number" ? value : undefined;
}
