import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { tiktokDisplayVideos } from "@/lib/mock-data";
import { getSyncedTikTokVideoLibrary } from "@/lib/tiktok-videos";
import {
  TIKTOK_CONNECTED_COOKIE,
  TIKTOK_CONNECTED_PROFILE_COOKIE,
  type TikTokUserProfile,
} from "@/lib/tiktok-oauth";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  const isConnected = cookieStore.get(TIKTOK_CONNECTED_COOKIE)?.value === "1";
  const profile = parseProfileCookie(
    cookieStore.get(TIKTOK_CONNECTED_PROFILE_COOKIE)?.value
  );
  const library = await getSyncedTikTokVideoLibrary(
    isConnected ? profile?.openId : undefined
  );
  const videos =
    library.source === "synced" && library.videos.length > 0
      ? library.videos
      : tiktokDisplayVideos;

  return NextResponse.json({
    account: library.account
      ? {
          displayName: library.account.displayName,
          lastSyncedAt: library.account.lastSyncedAt,
        }
      : undefined,
    source: library.source,
    videos,
  });
}

function parseProfileCookie(value?: string): TikTokUserProfile | undefined {
  if (!value) {
    return undefined;
  }

  try {
    const profile = JSON.parse(value) as Partial<TikTokUserProfile>;

    if (typeof profile.openId !== "string") {
      return undefined;
    }

    return profile as TikTokUserProfile;
  } catch {
    return undefined;
  }
}
