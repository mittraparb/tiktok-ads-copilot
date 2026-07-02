import { Badge } from "@/components/ui/badge";
import { recommendationLabels, type RecommendationStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const badgeStyles: Record<RecommendationStatus, string> = {
  BOOST: "border-emerald-200 bg-emerald-50 text-emerald-700",
  WAIT: "border-amber-200 bg-amber-50 text-amber-700",
  PAUSE: "border-rose-200 bg-rose-50 text-rose-700",
  FIX_CREATIVE: "border-sky-200 bg-sky-50 text-sky-700",
};

export function RecommendationBadge({
  status,
  className,
}: {
  status: RecommendationStatus;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn("h-6 rounded-md px-2.5 font-semibold", badgeStyles[status], className)}
    >
      {status}
      <span className="font-medium text-current/75">{recommendationLabels[status]}</span>
    </Badge>
  );
}
