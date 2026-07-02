import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  CircleDollarSign,
  Eye,
  Gauge,
  PauseCircle,
  TrendingUp,
} from "lucide-react";

import { AppShell } from "@/components/dashboard/app-shell";
import { RecommendationBadge } from "@/components/dashboard/recommendation-badge";
import { SpendViewsChart } from "@/components/dashboard/spend-views-chart";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  campaigns,
  dailyPerformance,
  dashboardMetrics,
  primaryRecommendation,
  videos,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const numberFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const bahtFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0,
});

const metricIcons = [CircleDollarSign, Eye, Gauge, CheckCircle2];

export default function DashboardPage() {
  const activeCampaign = campaigns[0];
  const pauseCandidate = videos.find((video) => video.recommendation === "PAUSE");

  return (
    <AppShell>
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Mock campaign signals
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Ad Boost Decision Dashboard
          </h1>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            Decision support for creator ads based on mock spend, view quality, and conversion signals.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm shadow-sm">
          <div className="text-xs font-medium text-zinc-500">Active campaign</div>
          <div className="mt-1 font-semibold text-zinc-950">{activeCampaign.name}</div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric, index) => {
          const Icon = metricIcons[index];

          return (
            <Card key={metric.label} className="rounded-lg border-0 bg-white shadow-sm ring-zinc-200">
              <CardHeader className="pb-1">
                <CardDescription>{metric.label}</CardDescription>
                <CardAction>
                  <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">
                    <Icon className="size-4" aria-hidden="true" />
                  </div>
                </CardAction>
                <CardTitle className="text-2xl font-semibold tracking-tight">
                  {metric.value}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <span className="font-semibold text-emerald-600">{metric.delta}</span>
                  <span>{metric.detail}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)]">
        <Card className="rounded-lg border-0 bg-zinc-950 text-white shadow-sm ring-zinc-900">
          <CardHeader className="gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <RecommendationBadge
                status={primaryRecommendation.recommendation}
                className="border-emerald-400/30 bg-emerald-400/15 text-emerald-100"
              />
              <span className="text-xs font-medium text-zinc-400">Best action today</span>
            </div>
            <div>
              <CardTitle className="max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
                Boost “{primaryRecommendation.title}”
              </CardTitle>
              <CardDescription className="mt-2 max-w-2xl text-sm leading-6 text-zinc-300">
                {primaryRecommendation.reason}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-[220px_1fr]">
              <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <div className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-400">
                  Boost Score
                </div>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-6xl font-semibold leading-none tracking-tight">
                    {primaryRecommendation.boostScore}
                  </span>
                  <span className="pb-2 text-sm font-medium text-zinc-400">/100</span>
                </div>
                <Progress
                  value={primaryRecommendation.boostScore}
                  className="mt-5 [&_[data-slot=progress-indicator]]:bg-emerald-400 [&_[data-slot=progress-track]]:bg-white/10"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <DecisionStat
                  label="Next budget tier"
                  value={primaryRecommendation.budgetTier}
                  tone="positive"
                  className="sm:col-span-2"
                />
                <DecisionStat
                  label="CTR"
                  value={`${primaryRecommendation.ctr}%`}
                  helper="Click intent"
                />
                <DecisionStat
                  label="CPA"
                  value={bahtFormatter.format(primaryRecommendation.cpa)}
                  helper="Mock signal"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-0 bg-white shadow-sm ring-zinc-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PauseCircle className="size-4 text-rose-500" aria-hidden="true" />
              Pause candidate
            </CardTitle>
            <CardDescription>Video with the clearest negative signal.</CardDescription>
          </CardHeader>
          <CardContent>
            {pauseCandidate ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-zinc-950">
                      {pauseCandidate.title}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500">{pauseCandidate.creator}</p>
                  </div>
                  <RecommendationBadge status={pauseCandidate.recommendation} />
                </div>
                <p className="text-sm leading-6 text-zinc-600">{pauseCandidate.reason}</p>
                <div className="grid grid-cols-3 gap-2">
                  <MiniStat label="Score" value={pauseCandidate.boostScore.toString()} />
                  <MiniStat label="Hold" value={`${pauseCandidate.holdRate}%`} />
                  <MiniStat label="CPA" value={bahtFormatter.format(pauseCandidate.cpa)} />
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,0.92fr)_minmax(420px,1.08fr)]">
        <Card className="rounded-lg border-0 bg-white shadow-sm ring-zinc-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="size-4 text-cyan-600" aria-hidden="true" />
              Spend vs views
            </CardTitle>
            <CardDescription>Simple mock trend for the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <SpendViewsChart data={dailyPerformance} />
          </CardContent>
        </Card>

        <Card className="rounded-lg border-0 bg-white shadow-sm ring-zinc-200">
          <CardHeader>
            <CardTitle>Top videos</CardTitle>
            <CardDescription>Sorted by Boost Score and readiness to act.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="min-w-[220px]">Video</TableHead>
                  <TableHead>Recommendation</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead className="text-right">CPA</TableHead>
                  <TableHead className="min-w-[160px]">Budget tier</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {videos.map((video) => (
                  <TableRow key={video.id}>
                    <TableCell>
                      <div className="font-medium text-zinc-950">{video.title}</div>
                      <div className="mt-1 text-xs text-zinc-500">
                        {video.creator} · {video.hook}
                      </div>
                    </TableCell>
                    <TableCell>
                      <RecommendationBadge status={video.recommendation} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex min-w-24 items-center justify-end gap-2">
                        <div className="h-1.5 w-14 overflow-hidden rounded-full bg-zinc-100">
                          <div
                            className={cn(
                              "h-full rounded-full",
                              video.recommendation === "BOOST" && "bg-emerald-500",
                              video.recommendation === "WAIT" && "bg-amber-500",
                              video.recommendation === "PAUSE" && "bg-rose-500",
                              video.recommendation === "FIX_CREATIVE" && "bg-sky-500"
                            )}
                            style={{ width: `${video.boostScore}%` }}
                          />
                        </div>
                        <span className="font-semibold tabular-nums">{video.boostScore}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {numberFormatter.format(video.views)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {bahtFormatter.format(video.cpa)}
                    </TableCell>
                    <TableCell className="text-sm text-zinc-600">{video.budgetTier}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </AppShell>
  );
}

function DecisionStat({
  label,
  value,
  helper,
  tone,
  className,
}: {
  label: string;
  value: string;
  helper?: string;
  tone?: "positive";
  className?: string;
}) {
  return (
    <div className={cn("rounded-lg border border-white/10 bg-white/[0.04] p-4", className)}>
      <div className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-400">{label}</div>
      <div className="mt-3 flex items-start gap-2">
        {tone === "positive" ? (
          <ArrowUpRight className="mt-1 size-4 text-emerald-300" aria-hidden="true" />
        ) : (
          <ArrowDownRight className="mt-1 size-4 text-zinc-500" aria-hidden="true" />
        )}
        <div>
          <div className="text-lg font-semibold leading-6 text-white">{value}</div>
          {helper ? <div className="mt-1 text-xs text-zinc-400">{helper}</div> : null}
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3">
      <div className="text-xs font-medium text-zinc-500">{label}</div>
      <div className="mt-1 text-sm font-semibold tabular-nums text-zinc-950">{value}</div>
    </div>
  );
}
