import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  CircleAlert,
  MessageCircle,
  Share2,
  Sparkles,
  ThumbsUp,
  Video,
} from "lucide-react";

import { AppShell } from "@/components/dashboard/app-shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { monthlyBenchmark, tiktokDisplayVideos } from "@/lib/mock-data";
import {
  analyzePreBoostVideo,
  type PreBoostAnalysis,
  type PreBoostRecommendation,
  type TikTokDisplayVideo,
} from "@/lib/pre-boost";
import {
  TIKTOK_CONNECTED_COOKIE,
  TIKTOK_CONNECTED_PROFILE_COOKIE,
  type TikTokUserProfile,
} from "@/lib/tiktok-oauth";
import { getSyncedTikTokVideoLibrary } from "@/lib/tiktok-videos";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

type VideoDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type LibrarySource = "mock" | "synced";

const numberFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const percentFormatter = new Intl.NumberFormat("en", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const wholeFormatter = new Intl.NumberFormat("en", {
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export default async function VideoDetailPage({ params }: VideoDetailPageProps) {
  const { id } = await params;
  const { source, videos } = await getVideoLibrary();
  const video = videos.find((item) => item.id === decodeURIComponent(id));

  if (!video) {
    notFound();
  }

  const analysis = analyzePreBoostVideo(video, monthlyBenchmark);
  const creativeNotes = getCreativeNotes(video, analysis);

  return (
    <AppShell>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/videos"
          className="inline-flex h-9 w-fit items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Videos
        </Link>
        <div className="text-xs font-medium text-zinc-500">
          Formula: {analysis.formulaVersion}
        </div>
      </div>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="rounded-lg border-0 bg-white shadow-sm ring-zinc-200">
          <CardContent>
            <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
              <VideoCover source={source} video={video} />

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <PreBoostBadge recommendation={analysis.recommendation} />
                  <TrendBadge analysis={analysis} />
                  <span
                    className={cn(
                      "inline-flex h-6 items-center rounded-md px-2 text-xs font-semibold",
                      source === "synced"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-cyan-50 text-cyan-700"
                    )}
                  >
                    {source === "synced" ? "Synced row" : "Mock fallback"}
                  </span>
                </div>

                <h1 className="mt-4 text-3xl font-semibold leading-tight text-zinc-950 sm:text-4xl">
                  {video.title}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
                  {video.video_description || "No caption was provided."}
                </p>

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-500">
                  <span>{formatPostDate(video.create_time)}</span>
                  <span>{formatAge(analysis.postAgeHours)}</span>
                  <span>{video.duration}s video</span>
                  {video.share_url ? (
                    <a
                      href={video.share_url}
                      className="inline-flex items-center gap-1 font-semibold text-cyan-700 hover:text-cyan-900"
                      rel="noreferrer"
                      target="_blank"
                    >
                      Open TikTok URL
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                  ) : null}
                </div>

                <div className="mt-6 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                  <MetricCard
                    icon={Video}
                    label="Views"
                    value={numberFormatter.format(video.view_count)}
                  />
                  <MetricCard
                    icon={ThumbsUp}
                    label="Likes"
                    value={numberFormatter.format(video.like_count)}
                  />
                  <MetricCard
                    icon={MessageCircle}
                    label="Comments"
                    value={numberFormatter.format(video.comment_count)}
                  />
                  <MetricCard
                    icon={Share2}
                    label="Shares"
                    value={numberFormatter.format(video.share_count)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <ScoreCard analysis={analysis} />
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Card className="rounded-lg border-0 bg-white shadow-sm ring-zinc-200">
          <CardHeader>
            <CardTitle>Score Breakdown</CardTitle>
            <CardDescription>
              Display API signals compared with {monthlyBenchmark.currentMonthLabel}.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 lg:grid-cols-2">
              <SignalRow
                benchmark={monthlyBenchmark.averageEngagementRate}
                label="Engagement rate"
                value={analysis.engagementRate}
                valueLabel={percentFormatter.format(analysis.engagementRate)}
              />
              <SignalRow
                benchmark={monthlyBenchmark.averageShareRate}
                label="Share rate"
                value={analysis.shareRate}
                valueLabel={percentFormatter.format(analysis.shareRate)}
              />
              <SignalRow
                benchmark={monthlyBenchmark.averageCommentRate}
                label="Comment rate"
                value={analysis.commentRate}
                valueLabel={percentFormatter.format(analysis.commentRate)}
              />
              <SignalRow
                benchmark={monthlyBenchmark.averageViewVelocity}
                label="View velocity"
                value={analysis.viewVelocity}
                valueLabel={`${wholeFormatter.format(analysis.viewVelocity)}/hr`}
              />
              <SignalRow
                benchmark={24}
                higherIsBetter={false}
                label="Post age"
                value={analysis.postAgeHours}
                valueLabel={formatAge(analysis.postAgeHours)}
              />
              <CreativeCompleteness video={video} />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-0 bg-zinc-950 text-white shadow-sm ring-zinc-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarClock className="size-4 text-cyan-300" aria-hidden="true" />
              Monthly Trend
            </CardTitle>
            <CardDescription className="text-zinc-300">
              Channel benchmark used by the Pre-Boost formula.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <BenchmarkStat
                label="Avg engagement"
                value={percentFormatter.format(
                  monthlyBenchmark.averageEngagementRate
                )}
              />
              <BenchmarkStat
                label="Avg share rate"
                value={percentFormatter.format(monthlyBenchmark.averageShareRate)}
              />
              <BenchmarkStat
                label="Avg comment rate"
                value={percentFormatter.format(
                  monthlyBenchmark.averageCommentRate
                )}
              />
              <BenchmarkStat
                label="Avg velocity"
                value={`${wholeFormatter.format(
                  monthlyBenchmark.averageViewVelocity
                )}/hr`}
              />
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <InsightList
          icon={CheckCircle2}
          items={analysis.reasons}
          title="Reasons"
          emptyText="Available signals are still developing."
          tone="positive"
        />
        <InsightList
          icon={CircleAlert}
          items={analysis.risks}
          title="Risks"
          emptyText="No major risk from available Display API signals."
          tone="risk"
        />
      </section>

      <Card className="rounded-lg border-0 bg-white shadow-sm ring-zinc-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="size-4 text-cyan-700" aria-hidden="true" />
            Creative Notes
          </CardTitle>
          <CardDescription>
            Notes from the title, caption, duration, and engagement mix.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {creativeNotes.map((note) => (
              <div
                key={note}
                className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm leading-6 text-zinc-700"
              >
                {note}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}

async function getVideoLibrary(): Promise<{
  source: LibrarySource;
  videos: TikTokDisplayVideo[];
}> {
  const cookieStore = await cookies();
  const isConnected = cookieStore.get(TIKTOK_CONNECTED_COOKIE)?.value === "1";
  const profile = parseProfileCookie(
    cookieStore.get(TIKTOK_CONNECTED_PROFILE_COOKIE)?.value
  );
  const syncedLibrary = await getSyncedTikTokVideoLibrary(
    isConnected && profile ? profile.openId : undefined
  );

  if (syncedLibrary.source === "synced" && syncedLibrary.videos.length > 0) {
    return {
      source: "synced",
      videos: syncedLibrary.videos,
    };
  }

  return {
    source: "mock",
    videos: tiktokDisplayVideos,
  };
}

function ScoreCard({ analysis }: { analysis: PreBoostAnalysis }) {
  return (
    <Card className="rounded-lg border-0 bg-white shadow-sm ring-zinc-200">
      <CardHeader>
        <CardTitle>Pre-Boost Score</CardTitle>
        <CardDescription>Decision support before testing ad budget.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2">
          <span className="text-6xl font-semibold leading-none text-zinc-950">
            {analysis.preBoostScore}
          </span>
          <span className="pb-2 text-sm font-medium text-zinc-500">/100</span>
        </div>
        <Progress value={analysis.preBoostScore} className="mt-5" />
        <div className="mt-5 grid gap-3">
          <DecisionStat
            label="Recommendation"
            value={getRecommendationLabel(analysis.recommendation)}
          />
          <DecisionStat
            label="Suggested budget"
            value={`${analysis.suggestedBudget} THB test tier`}
          />
          <DecisionStat
            label="Trend delta"
            value={formatSignedPercent(analysis.trendDeltaPercent)}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function VideoCover({
  source,
  video,
}: {
  source: LibrarySource;
  video: TikTokDisplayVideo;
}) {
  const coverUrl = video.cover_image_url.trim();
  const canShowCover = source === "synced" && coverUrl.startsWith("http");

  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
      <div className="absolute inset-0 flex flex-col justify-between bg-[linear-gradient(145deg,#111827,#155e75_48%,#f43f5e)] p-4 text-white">
        <div className="text-xs font-semibold">
          {canShowCover ? "Video cover" : source === "synced" ? "Cover unavailable" : "Mock cover"}
        </div>
        <div>
          <Sparkles className="mb-2 size-5" aria-hidden="true" />
          <div className="line-clamp-4 text-lg font-semibold leading-6">
            {video.title}
          </div>
        </div>
      </div>

      {canShowCover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={coverUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      ) : null}
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Video;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
      <div className="flex items-center justify-between gap-2">
        <div className="text-xs font-medium text-zinc-500">{label}</div>
        <Icon className="size-4 text-zinc-400" aria-hidden="true" />
      </div>
      <div className="mt-2 text-lg font-semibold tabular-nums text-zinc-950">
        {value}
      </div>
    </div>
  );
}

function SignalRow({
  benchmark,
  higherIsBetter = true,
  label,
  value,
  valueLabel,
}: {
  benchmark: number;
  higherIsBetter?: boolean;
  label: string;
  value: number;
  valueLabel: string;
}) {
  const ratio = benchmark > 0 ? value / benchmark : 0;
  const progressValue = higherIsBetter
    ? Math.min(ratio * 72, 100)
    : Math.max(100 - ratio * 38, 8);
  const isStrong = higherIsBetter ? value >= benchmark : value <= benchmark;

  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-zinc-950">{label}</div>
          <div className="mt-1 text-xs text-zinc-500">
            Benchmark {formatBenchmarkValue(label, benchmark)}
          </div>
        </div>
        <span
          className={cn(
            "inline-flex h-6 shrink-0 items-center rounded-md px-2 text-xs font-semibold",
            isStrong
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          )}
        >
          {isStrong ? "Strong" : "Watch"}
        </span>
      </div>
      <div className="mt-4 flex items-end justify-between gap-3">
        <div className="text-2xl font-semibold tabular-nums text-zinc-950">
          {valueLabel}
        </div>
        <div className="pb-1 text-xs text-zinc-500">{formatRatio(ratio)}</div>
      </div>
      <Progress value={progressValue} className="mt-3" />
    </div>
  );
}

function CreativeCompleteness({ video }: { video: TikTokDisplayVideo }) {
  const titleReady = video.title.length >= 16;
  const captionReady = video.video_description.length >= 42;
  const completeness = (Number(titleReady) + Number(captionReady)) * 50;

  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-zinc-950">
            Creative context
          </div>
          <div className="mt-1 text-xs text-zinc-500">
            Title and caption completeness
          </div>
        </div>
        <span
          className={cn(
            "inline-flex h-6 shrink-0 items-center rounded-md px-2 text-xs font-semibold",
            completeness === 100
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          )}
        >
          {completeness === 100 ? "Ready" : "Needs copy"}
        </span>
      </div>
      <div className="mt-4 text-2xl font-semibold tabular-nums text-zinc-950">
        {completeness}%
      </div>
      <Progress value={completeness} className="mt-3" />
    </div>
  );
}

function DecisionStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2">
      <div className="text-xs font-medium text-zinc-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-zinc-950">{value}</div>
    </div>
  );
}

function BenchmarkStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
      <div className="text-xs font-medium text-zinc-400">{label}</div>
      <div className="mt-1 text-lg font-semibold text-white">{value}</div>
    </div>
  );
}

function InsightList({
  emptyText,
  icon: Icon,
  items,
  title,
  tone,
}: {
  emptyText: string;
  icon: typeof CheckCircle2;
  items: string[];
  title: string;
  tone: "positive" | "risk";
}) {
  const visibleItems = items.length > 0 ? items : [emptyText];

  return (
    <Card className="rounded-lg border-0 bg-white shadow-sm ring-zinc-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon
            className={cn(
              "size-4",
              tone === "positive" ? "text-emerald-600" : "text-amber-600"
            )}
            aria-hidden="true"
          />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {visibleItems.map((item) => (
            <div
              key={item}
              className={cn(
                "rounded-lg border px-3 py-2 text-sm leading-6",
                tone === "positive"
                  ? "border-emerald-100 bg-emerald-50 text-emerald-800"
                  : "border-amber-100 bg-amber-50 text-amber-800"
              )}
            >
              {item}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PreBoostBadge({
  recommendation,
}: {
  recommendation: PreBoostRecommendation;
}) {
  const styles: Record<PreBoostRecommendation, string> = {
    BOOST_TEST: "border-emerald-200 bg-emerald-50 text-emerald-700",
    WAIT: "border-amber-200 bg-amber-50 text-amber-700",
    FIX_CREATIVE: "border-sky-200 bg-sky-50 text-sky-700",
    DO_NOT_BOOST: "border-rose-200 bg-rose-50 text-rose-700",
  };

  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-md border px-2.5 text-xs font-semibold",
        styles[recommendation]
      )}
    >
      {recommendation}
    </span>
  );
}

function TrendBadge({ analysis }: { analysis: PreBoostAnalysis }) {
  const aboveTrend = analysis.trendDeltaPercent >= 0;

  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1 rounded-md px-2 text-xs font-semibold",
        aboveTrend ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-600"
      )}
    >
      {aboveTrend ? (
        <ArrowUp className="size-3" aria-hidden="true" />
      ) : (
        <ArrowDown className="size-3" aria-hidden="true" />
      )}
      {aboveTrend
        ? `${formatSignedPercent(analysis.trendDeltaPercent)} vs trend`
        : "Below trend"}
    </span>
  );
}

function getCreativeNotes(
  video: TikTokDisplayVideo,
  analysis: PreBoostAnalysis
) {
  const notes: string[] = [];

  notes.push(
    video.title.length >= 16
      ? "The title gives enough context for a viewer to understand the angle before boosting."
      : "The title is short; clarify the hook before putting budget behind it."
  );

  notes.push(
    video.video_description.length >= 42
      ? "The caption has enough detail to explain the premise without relying on unavailable metrics."
      : "The caption is thin; add the main payoff or decision point before a paid test."
  );

  notes.push(
    video.duration <= 45
      ? "Duration is compact enough for a small test budget."
      : "Duration is longer than the safest short-form test range, so watch early engagement carefully."
  );

  notes.push(
    analysis.shareRate >= monthlyBenchmark.averageShareRate
      ? "Share behavior is supporting the creative angle."
      : "Share behavior is not yet proving the angle travels beyond the first audience."
  );

  return notes;
}

function getRecommendationLabel(recommendation: PreBoostRecommendation) {
  const labels: Record<PreBoostRecommendation, string> = {
    BOOST_TEST: "Test with budget",
    WAIT: "Wait for more signal",
    FIX_CREATIVE: "Fix creative first",
    DO_NOT_BOOST: "Do not boost",
  };

  return labels[recommendation];
}

function formatBenchmarkValue(label: string, value: number) {
  if (label === "View velocity") {
    return `${wholeFormatter.format(value)}/hr`;
  }

  if (label === "Post age") {
    return `${wholeFormatter.format(value)}h`;
  }

  return percentFormatter.format(value);
}

function formatRatio(ratio: number) {
  if (!Number.isFinite(ratio)) {
    return "No benchmark";
  }

  return `${ratio.toFixed(1)}x benchmark`;
}

function formatSignedPercent(value: number) {
  const rounded = Math.round(value);

  return `${rounded >= 0 ? "+" : ""}${rounded}%`;
}

function formatPostDate(createTime: number) {
  return dateFormatter.format(new Date(createTime * 1000));
}

function formatAge(hours: number) {
  if (hours < 24) {
    return `${Math.round(hours)}h old`;
  }

  return `${Math.round(hours / 24)}d old`;
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
