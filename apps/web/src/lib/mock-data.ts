import type { MonthlyBenchmark, TikTokDisplayVideo } from "@/lib/pre-boost";

export type RecommendationStatus = "BOOST" | "WAIT" | "PAUSE" | "FIX_CREATIVE";

export type Campaign = {
  id: string;
  name: string;
  objective: string;
  budget: number;
  spend: number;
  views: number;
  conversions: number;
  cpa: number;
  status: "Active" | "Review";
};

export type Video = {
  id: string;
  title: string;
  campaignId: string;
  creator: string;
  hook: string;
  spend: number;
  views: number;
  holdRate: number;
  ctr: number;
  cpa: number;
  boostScore: number;
  budgetTier: string;
  recommendation: RecommendationStatus;
  reason: string;
};

export type DailyPerformance = {
  date: string;
  spend: number;
  views: number;
};

export type Recommendation = {
  videoId: string;
  status: RecommendationStatus;
  summary: string;
  nextBudgetTier: string;
};

export const recommendationLabels: Record<RecommendationStatus, string> = {
  BOOST: "ควรยิงต่อ",
  WAIT: "รอดูข้อมูลเพิ่ม",
  PAUSE: "ควรหยุดก่อน",
  FIX_CREATIVE: "ควรแก้ creative ก่อนยิง",
};

export const campaigns: Campaign[] = [
  {
    id: "cmp-001",
    name: "7.7 Creator Spark",
    objective: "Sales lift",
    budget: 36000,
    spend: 21840,
    views: 482000,
    conversions: 426,
    cpa: 51.3,
    status: "Active",
  },
  {
    id: "cmp-002",
    name: "Skincare Trial Pack",
    objective: "Add to cart",
    budget: 24000,
    spend: 17620,
    views: 318000,
    conversions: 281,
    cpa: 62.7,
    status: "Review",
  },
];

export const videos: Video[] = [
  {
    id: "vid-001",
    title: "Morning routine with instant skin prep",
    campaignId: "cmp-001",
    creator: "Nicha Studio",
    hook: "3-sec product reveal",
    spend: 6420,
    views: 156200,
    holdRate: 41.8,
    ctr: 2.9,
    cpa: 42.4,
    boostScore: 92,
    budgetTier: "Scale test: ฿1,500/day",
    recommendation: "BOOST",
    reason: "Strong early hold rate, efficient CPA, and stable CTR across the last 3 days.",
  },
  {
    id: "vid-002",
    title: "Creator review: texture close-up",
    campaignId: "cmp-001",
    creator: "Beam Beauty",
    hook: "Close-up swatch",
    spend: 5120,
    views: 104900,
    holdRate: 32.4,
    ctr: 1.8,
    cpa: 58.1,
    boostScore: 74,
    budgetTier: "Hold: ฿800/day",
    recommendation: "WAIT",
    reason: "Promising reach, but conversion quality needs one more day of signal before scaling.",
  },
  {
    id: "vid-003",
    title: "Before-after in natural light",
    campaignId: "cmp-002",
    creator: "Mali Makes",
    hook: "Before-after split",
    spend: 3880,
    views: 51700,
    holdRate: 18.9,
    ctr: 0.9,
    cpa: 119.2,
    boostScore: 31,
    budgetTier: "Stop spend",
    recommendation: "PAUSE",
    reason: "Low hold rate and weak click intent are pushing CPA above the current account range.",
  },
  {
    id: "vid-004",
    title: "POV: office touch-up test",
    campaignId: "cmp-002",
    creator: "Prae Daily",
    hook: "POV setup",
    spend: 2460,
    views: 63400,
    holdRate: 24.6,
    ctr: 1.2,
    cpa: 88.5,
    boostScore: 48,
    budgetTier: "Creative fix first",
    recommendation: "FIX_CREATIVE",
    reason: "View quality is acceptable, but the opening hook is not creating enough click intent.",
  },
];

export const dailyPerformance: DailyPerformance[] = [
  { date: "Jun 25", spend: 2100, views: 42100 },
  { date: "Jun 26", spend: 2600, views: 48600 },
  { date: "Jun 27", spend: 2850, views: 55200 },
  { date: "Jun 28", spend: 3150, views: 68100 },
  { date: "Jun 29", spend: 3450, views: 73600 },
  { date: "Jun 30", spend: 3720, views: 81200 },
  { date: "Jul 01", spend: 3950, views: 90300 },
];

export const recommendations: Recommendation[] = videos.map((video) => ({
  videoId: video.id,
  status: video.recommendation,
  summary: video.reason,
  nextBudgetTier: video.budgetTier,
}));

export const dashboardMetrics = [
  {
    label: "Mock ad spend",
    value: "฿39.5K",
    delta: "+12.4%",
    detail: "last 7 days",
  },
  {
    label: "Views generated",
    value: "800K",
    delta: "+18.7%",
    detail: "paid creator traffic",
  },
  {
    label: "Avg. CPA",
    value: "฿56.8",
    delta: "-9.1%",
    detail: "mock conversion signal",
  },
  {
    label: "Videos to act on",
    value: "2",
    delta: "1 boost / 1 pause",
    detail: "needs decision today",
  },
];

export const primaryRecommendation = videos.find(
  (video) => video.recommendation === "BOOST"
) ?? videos[0];

export const connectedTikTokAccount = {
  displayName: "แก้มตุงพุงโต",
  avatarInitials: "กต",
  totalVideos: 8,
  lastSyncedAt: "2026-07-02T08:40:00+07:00",
};

export const monthlyBenchmark: MonthlyBenchmark = {
  currentMonthLabel: "July 2026",
  averageEngagementRate: 0.062,
  averageLikeRate: 0.049,
  averageCommentRate: 0.0062,
  averageShareRate: 0.0068,
  averageViewVelocity: 870,
  averagePreBoostScore: 63,
};

export const tiktokDisplayVideos: TikTokDisplayVideo[] = [
  {
    id: "743100000000000001",
    create_time: 1782869400,
    cover_image_url: "mock://covers/ev-road-trip-savings",
    share_url: "https://www.tiktok.com/@mock/video/743100000000000001",
    video_description:
      "ลองขับ EV ไปชลบุรีหนึ่งวัน ค่าไฟเทียบค่าน้ำมัน และจุดที่มือใหม่ควรรู้ก่อนออกทริป",
    duration: 42,
    title: "ขับ EV ไปชลบุรี ใช้งบจริงเท่าไหร่",
    like_count: 8720,
    comment_count: 1040,
    share_count: 1320,
    view_count: 118400,
  },
  {
    id: "743100000000000002",
    create_time: 1782945000,
    cover_image_url: "mock://covers/buffet-hook-test",
    share_url: "https://www.tiktok.com/@mock/video/743100000000000002",
    video_description:
      "บุฟเฟต์ร้านประจำที่คนถามเยอะ เทียบจานคุ้มกับจานที่ควรข้ามแบบไม่อวย",
    duration: 36,
    title: "บุฟเฟต์จานไหนคุ้ม จานไหนควรข้าม",
    like_count: 5340,
    comment_count: 610,
    share_count: 720,
    view_count: 84200,
  },
  {
    id: "743100000000000003",
    create_time: 1782910800,
    cover_image_url: "mock://covers/home-charger-checklist",
    share_url: "https://www.tiktok.com/@mock/video/743100000000000003",
    video_description:
      "เช็กลิสต์ก่อนติดตั้งที่ชาร์จบ้านสำหรับคนใช้ EV มือใหม่ มีจุดไหนต้องถามช่างก่อนจ่ายเงิน",
    duration: 51,
    title: "ก่อนติดที่ชาร์จบ้าน ต้องเช็กอะไร",
    like_count: 2410,
    comment_count: 510,
    share_count: 660,
    view_count: 36700,
  },
  {
    id: "743100000000000004",
    create_time: 1782817200,
    cover_image_url: "mock://covers/snack-review-fast",
    share_url: "https://www.tiktok.com/@mock/video/743100000000000004",
    video_description:
      "ลองขนมใหม่ในเซเว่นแบบเร็วๆ รสชาติ ราคา และเหมาะกับใคร",
    duration: 21,
    title: "ขนมใหม่ในเซเว่น อันนี้ควรลองไหม",
    like_count: 1980,
    comment_count: 120,
    share_count: 92,
    view_count: 51200,
  },
  {
    id: "743100000000000005",
    create_time: 1782951600,
    cover_image_url: "mock://covers/new-post-low-signal",
    share_url: "https://www.tiktok.com/@mock/video/743100000000000005",
    video_description:
      "พาไปดูมุมถ่ายรูปคาเฟ่เปิดใหม่พร้อมเมนูที่น่าลอง",
    duration: 29,
    title: "คาเฟ่เปิดใหม่ มุมไหนถ่ายสวย",
    like_count: 186,
    comment_count: 18,
    share_count: 11,
    view_count: 3100,
  },
  {
    id: "743100000000000006",
    create_time: 1782702000,
    cover_image_url: "mock://covers/charging-station-map",
    share_url: "https://www.tiktok.com/@mock/video/743100000000000006",
    video_description:
      "รวมจุดชาร์จที่จอดง่ายสำหรับทริปครอบครัว พร้อมข้อควรระวังช่วงวันหยุด",
    duration: 47,
    title: "แผนที่จุดชาร์จสำหรับทริปครอบครัว",
    like_count: 4120,
    comment_count: 390,
    share_count: 1040,
    view_count: 76300,
  },
  {
    id: "743100000000000007",
    create_time: 1782631800,
    cover_image_url: "mock://covers/restaurant-before-after",
    share_url: "https://www.tiktok.com/@mock/video/743100000000000007",
    video_description:
      "ร้านอาหารที่คนแนะนำเยอะ ลองจริงทั้งเมนูฮิตและเมนูที่คนไม่ค่อยสั่ง",
    duration: 58,
    title: "ร้านดังที่คนบอกว่าต้องมา",
    like_count: 820,
    comment_count: 64,
    share_count: 41,
    view_count: 28600,
  },
  {
    id: "743100000000000008",
    create_time: 1782921600,
    cover_image_url: "mock://covers/ev-cost-breakdown",
    share_url: "https://www.tiktok.com/@mock/video/743100000000000008",
    video_description:
      "แตกค่าใช้จ่าย EV แบบรายเดือนสำหรับคนกำลังตัดสินใจ เปรียบเทียบจากการใช้งานจริง",
    duration: 44,
    title: "ใช้ EV หนึ่งเดือน จ่ายอะไรบ้าง",
    like_count: 3960,
    comment_count: 760,
    share_count: 880,
    view_count: 54800,
  },
];
