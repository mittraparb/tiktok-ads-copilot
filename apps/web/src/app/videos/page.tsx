import { cookies } from "next/headers";

import { VideosClientPage, type TikTokConnectionStatus } from "./videos-client-page";
import { tiktokDisplayVideos } from "@/lib/mock-data";
import { getSyncedTikTokVideoLibrary } from "@/lib/tiktok-videos";
import {
  TIKTOK_CONNECTED_COOKIE,
  TIKTOK_CONNECTED_EXPIRES_AT_COOKIE,
  TIKTOK_CONNECTED_PROFILE_COOKIE,
  TIKTOK_CONNECTED_SCOPES_COOKIE,
  type TikTokUserProfile,
} from "@/lib/tiktok-oauth";

export const dynamic = "force-dynamic";

export default async function VideosPage() {
  const cookieStore = await cookies();
  const isConnected = cookieStore.get(TIKTOK_CONNECTED_COOKIE)?.value === "1";
  const scopes = cookieStore.get(TIKTOK_CONNECTED_SCOPES_COOKIE)?.value;
  const expiresAt = cookieStore.get(TIKTOK_CONNECTED_EXPIRES_AT_COOKIE)?.value;
  const profile = parseProfileCookie(
    cookieStore.get(TIKTOK_CONNECTED_PROFILE_COOKIE)?.value
  );
  const hasCompleteConnection = isConnected && Boolean(profile);
  const syncedLibrary = await getSyncedTikTokVideoLibrary(
    hasCompleteConnection ? profile?.openId : undefined
  );
  const libraryVideos =
    syncedLibrary.source === "synced" && syncedLibrary.videos.length > 0
      ? syncedLibrary.videos
      : tiktokDisplayVideos;
  const librarySource = syncedLibrary.source === "synced" ? "synced" : "mock";

  const connectionStatus: TikTokConnectionStatus = {
    expiresAt: hasCompleteConnection ? expiresAt : undefined,
    isConnected: hasCompleteConnection,
    needsReconnect: isConnected && !profile,
    profile: hasCompleteConnection ? profile : undefined,
    scopes: hasCompleteConnection ? scopes : undefined,
  };

  return (
    <VideosClientPage
      connectionStatus={connectionStatus}
      librarySource={librarySource}
      lastSyncedAt={syncedLibrary.account?.lastSyncedAt}
      videos={libraryVideos}
    />
  );
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
