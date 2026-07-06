export type PreBoostRecommendation =
  | "BOOST_TEST"
  | "WAIT"
  | "FIX_CREATIVE"
  | "DO_NOT_BOOST";

export type TikTokDisplayVideo = {
  id: string;
  create_time: number;
  cover_image_url: string;
  share_url: string;
  video_description: string;
  duration: number;
  title: string;
  like_count: number;
  comment_count: number;
  share_count: number;
  view_count: number;
};

export type MonthlyBenchmark = {
  currentMonthLabel: string;
  averageEngagementRate: number;
  averageLikeRate: number;
  averageCommentRate: number;
  averageShareRate: number;
  averageViewVelocity: number;
  averagePreBoostScore: number;
};

export type PreBoostAnalysis = {
  likeRate: number;
  commentRate: number;
  shareRate: number;
  engagementRate: number;
  postAgeHours: number;
  viewVelocity: number;
  trendDeltaPercent: number;
  preBoostScore: number;
  recommendation: PreBoostRecommendation;
  suggestedBudget: 100 | 300 | 500;
  reasons: string[];
  risks: string[];
  formulaVersion: "preboost-v1-display-api";
};

const now = new Date("2026-07-02T09:00:00+07:00");

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function safeRate(value: number, total: number) {
  return total > 0 ? value / total : 0;
}

function ratioScore(value: number, benchmark: number, fullScoreRatio = 1.45) {
  if (benchmark <= 0) {
    return value > 0 ? 100 : 0;
  }

  return clamp((value / (benchmark * fullScoreRatio)) * 100, 0, 100);
}

export function analyzePreBoostVideo(
  video: TikTokDisplayVideo,
  benchmark: MonthlyBenchmark
): PreBoostAnalysis {
  const likeRate = safeRate(video.like_count, video.view_count);
  const commentRate = safeRate(video.comment_count, video.view_count);
  const shareRate = safeRate(video.share_count, video.view_count);
  const engagementRate = safeRate(
    video.like_count + video.comment_count + video.share_count,
    video.view_count
  );
  const postAgeHours = Math.max(
    (now.getTime() - video.create_time * 1000) / (1000 * 60 * 60),
    1
  );
  const viewVelocity = video.view_count / postAgeHours;
  const trendDeltaPercent =
    benchmark.averageEngagementRate > 0
      ? ((engagementRate - benchmark.averageEngagementRate) /
          benchmark.averageEngagementRate) *
        100
      : 0;

  const engagementScore = ratioScore(
    engagementRate,
    benchmark.averageEngagementRate
  );
  const shareScore = ratioScore(shareRate, benchmark.averageShareRate, 1.35);
  const commentScore = ratioScore(
    commentRate,
    benchmark.averageCommentRate,
    1.35
  );
  const velocityScore = ratioScore(
    viewVelocity,
    benchmark.averageViewVelocity,
    1.6
  );
  const freshnessScore = clamp(100 - postAgeHours / 3.2, 62, 100);
  const creativeScore =
    video.title.length >= 16 && video.video_description.length >= 42 ? 92 : 70;

  let preBoostScore = Math.round(
    engagementScore * 0.34 +
      shareScore * 0.18 +
      commentScore * 0.14 +
      velocityScore * 0.2 +
      freshnessScore * 0.08 +
      creativeScore * 0.06
  );

  if (video.view_count < 4000 && postAgeHours < 18) {
    preBoostScore = Math.min(preBoostScore, 68);
  }

  const aboveEngagementTrend = engagementRate >= benchmark.averageEngagementRate * 1.08;
  const aboveShareTrend = shareRate >= benchmark.averageShareRate * 1.08;
  const aboveCommentTrend = commentRate >= benchmark.averageCommentRate * 1.08;
  const highViewsWeakEngagement =
    video.view_count >= 25000 &&
    engagementRate < benchmark.averageEngagementRate * 0.88 &&
    shareRate < benchmark.averageShareRate;
  const weakAcrossSignals =
    video.view_count < 12000 &&
    engagementRate < benchmark.averageEngagementRate * 0.78 &&
    viewVelocity < benchmark.averageViewVelocity * 0.72;
  const stillTooNew = postAgeHours < 16 && video.view_count < 4500;

  let recommendation: PreBoostRecommendation = "WAIT";
  if (stillTooNew) {
    recommendation = "WAIT";
  } else if (weakAcrossSignals) {
    recommendation = "DO_NOT_BOOST";
  } else if (highViewsWeakEngagement) {
    recommendation = "FIX_CREATIVE";
  } else if (
    preBoostScore >= 74 &&
    aboveEngagementTrend &&
    (aboveShareTrend || aboveCommentTrend)
  ) {
    recommendation = "BOOST_TEST";
  } else if (preBoostScore < 42) {
    recommendation = "DO_NOT_BOOST";
  } else if (preBoostScore < 58 || highViewsWeakEngagement) {
    recommendation = "FIX_CREATIVE";
  }

  const suggestedBudget: 100 | 300 | 500 =
    recommendation === "BOOST_TEST"
      ? preBoostScore >= 86
        ? 500
        : 300
      : 100;

  const reasons: string[] = [];
  const risks: string[] = [];

  if (trendDeltaPercent >= 20) {
    reasons.push("Engagement is clearly above this channel's monthly trend.");
  } else if (trendDeltaPercent >= 0) {
    reasons.push("Engagement is slightly above the current monthly trend.");
  } else {
    risks.push("Engagement is below the channel's current monthly trend.");
  }

  if (aboveShareTrend) {
    reasons.push("Share rate is stronger than the monthly benchmark.");
  } else {
    risks.push("Share rate is not yet beating the monthly benchmark.");
  }

  if (aboveCommentTrend) {
    reasons.push("Comment rate shows useful audience response.");
  }

  if (stillTooNew) {
    risks.push("The post is still new and has limited signal.");
  }

  if (highViewsWeakEngagement) {
    risks.push("Views are high, but engagement quality is behind trend.");
  }

  if (weakAcrossSignals) {
    risks.push("Views, engagement, and velocity are all weak versus trend.");
  }

  return {
    likeRate,
    commentRate,
    shareRate,
    engagementRate,
    postAgeHours,
    viewVelocity,
    trendDeltaPercent,
    preBoostScore,
    recommendation,
    suggestedBudget,
    reasons,
    risks,
    formulaVersion: "preboost-v1-display-api",
  };
}
