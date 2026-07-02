"use client";

import {
  ArrowDown,
  ArrowUp,
  CalendarClock,
  CheckCircle2,
  Gauge,
  Search,
  Sparkles,
  TrendingUp,
  type LucideIcon,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/dashboard/app-shell";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  connectedTikTokAccount,
  monthlyBenchmark,
  tiktokDisplayVideos,
} from "@/lib/mock-data";
import {
  analyzePreBoostVideo,
  type PreBoostAnalysis,
  type PreBoostRecommendation,
  type TikTokDisplayVideo,
} from "@/lib/pre-boost";
import { cn } from "@/lib/utils";

type SortKey =
  | "newest"
  | "views"
  | "engagement"
  | "share"
  | "score"
  | "aboveTrend";

type VideoRow = {
  video: TikTokDisplayVideo;
  analysis: PreBoostAnalysis;
};

const filterOptions: Array<"ALL" | PreBoostRecommendation> = [
  "ALL",
  "BOOST_TEST",
  "WAIT",
  "FIX_CREATIVE",
  "DO_NOT_BOOST",
];

const sortOptions: Array<{ value: SortKey; label: string }> = [
  { value: "newest", label: "Newest" },
  { value: "views", label: "Views" },
  { value: "engagement", label: "Engagement rate" },
  { value: "share", label: "Share rate" },
  { value: "score", label: "Pre-Boost Score" },
  { value: "aboveTrend", label: "Above trend" },
];

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

export default function VideosPage() {
  const [search, setSearch] = useState("");
  const [recommendation, setRecommendation] = useState<
    "ALL" | PreBoostRecommendation
  >("ALL");
  const [sortBy, setSortBy] = useState<SortKey>("score");

  const analyzedVideos = useMemo<VideoRow[]>(
    () =>
      tiktokDisplayVideos.map((video) => ({
        video,
        analysis: analyzePreBoostVideo(video, monthlyBenchmark),
      })),
    []
  );

  const filteredVideos = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return analyzedVideos
      .filter(({ video, analysis }) => {
        const matchesSearch =
          searchTerm.length === 0 ||
          video.title.toLowerCase().includes(searchTerm) ||
          video.video_description.toLowerCase().includes(searchTerm);
        const matchesRecommendation =
          recommendation === "ALL" || analysis.recommendation === recommendation;

        return matchesSearch && matchesRecommendation;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return b.video.create_time - a.video.create_time;
        }

        if (sortBy === "views") {
          return b.video.view_count - a.video.view_count;
        }

        if (sortBy === "engagement") {
          return b.analysis.engagementRate - a.analysis.engagementRate;
        }

        if (sortBy === "share") {
          return b.analysis.shareRate - a.analysis.shareRate;
        }

        if (sortBy === "aboveTrend") {
          return b.analysis.trendDeltaPercent - a.analysis.trendDeltaPercent;
        }

        return b.analysis.preBoostScore - a.analysis.preBoostScore;
      });
  }, [analyzedVideos, recommendation, search, sortBy]);

  const summary = useMemo(() => {
    const totalScore = analyzedVideos.reduce(
      (sum, item) => sum + item.analysis.preBoostScore,
      0
    );
    const bestVideo = [...analyzedVideos].sort(
      (a, b) => b.analysis.preBoostScore - a.analysis.preBoostScore
    )[0];
    const aboveTrendCount = analyzedVideos.filter(
      (item) => item.analysis.trendDeltaPercent > 0
    ).length;
    const budgetTestCount = analyzedVideos.filter(
      (item) => item.analysis.recommendation === "BOOST_TEST"
    ).length;

    return {
      averageScore: Math.round(totalScore / analyzedVideos.length),
      bestVideo,
      aboveTrendCount,
      budgetTestCount,
    };
  }, [analyzedVideos]);

  return (
    <AppShell>
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="max-w-3xl">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-zinc-500">
            <span className="h-2 w-2 rounded-full bg-cyan-500" />
            Pre-Boost Analyzer mock library
          </div>
          <h1 className="text-3xl font-semibold text-zinc-950 sm:text-4xl">
            Video Library
          </h1>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            เลือกคลิปเพื่อดู Pre-Boost Score ก่อนลองยิงแอด
          </p>
        </div>

        <Card className="rounded-lg border-0 bg-white shadow-sm ring-zinc-200">
          <CardContent>
            <div className="flex items-start gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-zinc-950 text-sm font-semibold text-white">
                {connectedTikTokAccount.avatarInitials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-zinc-500">
                  Connected account
                </div>
                <div className="mt-0.5 truncate font-semibold text-zinc-950">
                  {connectedTikTokAccount.displayName}
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-zinc-500">
                  <span>{connectedTikTokAccount.totalVideos} videos</span>
                  <span>{formatSyncDate(connectedTikTokAccount.lastSyncedAt)}</span>
                </div>
                <div className="mt-3 rounded-md border border-dashed border-zinc-300 bg-zinc-50 px-2.5 py-1.5 text-xs font-medium text-zinc-600">
                  Mock data only / TikTok API not connected yet
                </div>
                <Link
                  href="/api/tiktok/connect"
                  className="mt-3 inline-flex h-8 items-center justify-center rounded-lg bg-zinc-950 px-3 text-xs font-semibold text-white transition-colors hover:bg-zinc-800"
                >
                  Connect TikTok Sandbox
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <SummaryCard
          label="Total videos"
          value={analyzedVideos.length.toString()}
          helper="Display API-shaped mock rows"
          icon={Video}
        />
        <SummaryCard
          label="Average Pre-Boost Score"
          value={summary.averageScore.toString()}
          helper={`Monthly avg ${monthlyBenchmark.averagePreBoostScore}`}
          icon={Gauge}
        />
        <SummaryCard
          label="Best video this month"
          value={summary.bestVideo.video.title}
          helper={`Score ${summary.bestVideo.analysis.preBoostScore}`}
          icon={TrendingUp}
          compact
        />
        <SummaryCard
          label="Videos above monthly trend"
          value={summary.aboveTrendCount.toString()}
          helper="Compared with channel benchmark"
          icon={ArrowUp}
        />
        <SummaryCard
          label="Recommended to test budget"
          value={summary.budgetTestCount.toString()}
          helper="เหมาะสำหรับทดลองงบ"
          icon={CheckCircle2}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)]">
        <Card className="rounded-lg border-0 bg-zinc-950 text-white shadow-sm ring-zinc-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarClock className="size-4 text-cyan-300" aria-hidden="true" />
              {monthlyBenchmark.currentMonthLabel} monthly trend
            </CardTitle>
            <CardDescription className="text-zinc-300">
              Each video is compared against this channel&apos;s monthly trend.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              <BenchmarkStat
                label="Avg engagement rate"
                value={percentFormatter.format(
                  monthlyBenchmark.averageEngagementRate
                )}
              />
              <BenchmarkStat
                label="Avg like rate"
                value={percentFormatter.format(monthlyBenchmark.averageLikeRate)}
              />
              <BenchmarkStat
                label="Avg comment rate"
                value={percentFormatter.format(
                  monthlyBenchmark.averageCommentRate
                )}
              />
              <BenchmarkStat
                label="Avg share rate"
                value={percentFormatter.format(monthlyBenchmark.averageShareRate)}
              />
              <BenchmarkStat
                label="Avg view velocity"
                value={`${wholeFormatter.format(
                  monthlyBenchmark.averageViewVelocity
                )}/hr`}
              />
              <BenchmarkStat
                label="Avg score"
                value={monthlyBenchmark.averagePreBoostScore.toString()}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-0 bg-white shadow-sm ring-zinc-200">
          <CardHeader>
            <CardTitle>Filters and sorting</CardTitle>
            <CardDescription>
              Client-side controls for the mock video library.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="relative block">
              <Search
                className="pointer-events-none absolute left-2.5 top-2 size-4 text-zinc-400"
                aria-hidden="true"
              />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search title or caption"
                className="pl-8"
              />
            </label>

            <div>
              <div className="mb-2 text-xs font-medium text-zinc-500">
                Recommendation
              </div>
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setRecommendation(option)}
                    className={cn(
                      "h-8 rounded-lg border px-2.5 text-xs font-semibold transition-colors",
                      recommendation === option
                        ? "border-zinc-950 bg-zinc-950 text-white"
                        : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                    )}
                  >
                    {option === "ALL" ? "All" : option}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs font-medium text-zinc-500">Sort by</div>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSortBy(option.value)}
                    className={cn(
                      "h-8 rounded-lg border px-2.5 text-xs font-semibold transition-colors",
                      sortBy === option.value
                        ? "border-cyan-700 bg-cyan-700 text-white"
                        : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-950">Videos</h2>
            <p className="text-sm text-zinc-500">
              {filteredVideos.length} videos match the current view.
            </p>
          </div>
          <div className="text-xs font-medium text-zinc-500">
            Formula: preboost-v1-display-api-mock
          </div>
        </div>

        <div className="grid gap-3">
          {filteredVideos.map((item, index) => (
            <VideoCard key={item.video.id} item={item} rank={index + 1} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function SummaryCard({
  label,
  value,
  helper,
  icon: Icon,
  compact,
}: {
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
  compact?: boolean;
}) {
  return (
    <Card className="rounded-lg border-0 bg-white shadow-sm ring-zinc-200">
      <CardHeader className="pb-1">
        <CardDescription>{label}</CardDescription>
        <CardAction>
          <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
            <Icon className="size-4" aria-hidden="true" />
          </div>
        </CardAction>
        <CardTitle
          className={cn(
            "font-semibold text-zinc-950",
            compact ? "line-clamp-2 text-sm leading-5" : "text-2xl"
          )}
        >
          {value}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-zinc-500">{helper}</div>
      </CardContent>
    </Card>
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

function VideoCard({ item, rank }: { item: VideoRow; rank: number }) {
  const { video, analysis } = item;
  const trendText = getTrendText(analysis, rank);

  return (
    <Card className="rounded-lg border-0 bg-white shadow-sm ring-zinc-200">
      <CardContent>
        <div className="grid gap-4 lg:grid-cols-[132px_minmax(0,1fr)_220px]">
          <div className="aspect-[3/4] overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
            <div className="flex h-full flex-col justify-between bg-[linear-gradient(145deg,#111827,#155e75_48%,#f43f5e)] p-3 text-white">
              <div className="text-xs font-semibold">Mock cover</div>
              <div>
                <Sparkles className="mb-2 size-4" aria-hidden="true" />
                <div className="line-clamp-3 text-sm font-semibold leading-5">
                  {video.title}
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <PreBoostBadge recommendation={analysis.recommendation} />
              <span
                className={cn(
                  "inline-flex h-6 items-center gap-1 rounded-md px-2 text-xs font-semibold",
                  analysis.trendDeltaPercent >= 0
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-zinc-100 text-zinc-600"
                )}
              >
                {analysis.trendDeltaPercent >= 0 ? (
                  <ArrowUp className="size-3" aria-hidden="true" />
                ) : (
                  <ArrowDown className="size-3" aria-hidden="true" />
                )}
                {trendText}
              </span>
            </div>

            <h3 className="mt-3 text-lg font-semibold text-zinc-950">
              {video.title}
            </h3>
            <p className="mt-1 line-clamp-2 max-w-3xl text-sm leading-6 text-zinc-600">
              {video.video_description}
            </p>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-500">
              <span>{formatPostDate(video.create_time)}</span>
              <span>{formatAge(analysis.postAgeHours)}</span>
              <span>{video.duration}s</span>
              <a
                href={video.share_url}
                className="font-medium text-cyan-700 hover:text-cyan-900"
              >
                Mock share URL
              </a>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              <Metric label="Views" value={numberFormatter.format(video.view_count)} />
              <Metric label="Likes" value={numberFormatter.format(video.like_count)} />
              <Metric
                label="Comments"
                value={numberFormatter.format(video.comment_count)}
              />
              <Metric label="Shares" value={numberFormatter.format(video.share_count)} />
            </div>

            <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
              <Metric
                label="Engagement"
                value={percentFormatter.format(analysis.engagementRate)}
              />
              <Metric label="Like rate" value={percentFormatter.format(analysis.likeRate)} />
              <Metric
                label="Comment rate"
                value={percentFormatter.format(analysis.commentRate)}
              />
              <Metric
                label="Share rate"
                value={percentFormatter.format(analysis.shareRate)}
              />
              <Metric
                label="Velocity"
                value={`${wholeFormatter.format(analysis.viewVelocity)}/hr`}
              />
            </div>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
            <div className="text-xs font-medium uppercase text-zinc-500">
              Pre-Boost Score
            </div>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-5xl font-semibold leading-none text-zinc-950">
                {analysis.preBoostScore}
              </span>
              <span className="pb-1 text-sm font-medium text-zinc-500">/100</span>
            </div>
            <Progress value={analysis.preBoostScore} className="mt-4" />
            <div className="mt-4 rounded-md bg-white px-3 py-2 text-sm font-semibold text-zinc-950">
              {analysis.suggestedBudget} THB test tier
            </div>
            <div className="mt-3 space-y-2 text-xs leading-5 text-zinc-600">
              <div>
                <span className="font-semibold text-zinc-800">Reason: </span>
                {analysis.reasons[0] ?? "Signals are still developing."}
              </div>
              <div>
                <span className="font-semibold text-zinc-800">Risk: </span>
                {analysis.risks[0] ?? "No major risk from available mock signals."}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2">
      <div className="text-xs font-medium text-zinc-500">{label}</div>
      <div className="mt-1 text-sm font-semibold tabular-nums text-zinc-950">
        {value}
      </div>
    </div>
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

function getTrendText(analysis: PreBoostAnalysis, rank: number) {
  if (analysis.preBoostScore >= 84 && rank <= 2) {
    return "Top 15% this month";
  }

  if (analysis.trendDeltaPercent >= 0) {
    return `+${Math.round(
      analysis.trendDeltaPercent
    )}% above monthly engagement trend`;
  }

  return "Below channel average";
}

function formatSyncDate(value: string) {
  return `Synced ${dateFormatter.format(new Date(value))}`;
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
