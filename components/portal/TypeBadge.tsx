import { cn } from "@/lib/utils"
import type { DeliverableType } from "@/lib/types/portal"
import { DELIVERABLE_TYPE_LABELS } from "@/lib/types/portal"

const typeIcons: Record<DeliverableType, string> = {
  blog_post: "B",
  social_post: "S",
  video: "V",
  newsletter: "N",
  seo_update: "SEO",
  reputation: "R",
  other: "O",
}

interface TypeBadgeProps {
  type: DeliverableType
  className?: string
}

export function TypeBadge({ type, className }: TypeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium text-warmWhite/60",
        className
      )}
    >
      <span className="w-5 h-5 rounded bg-navy-700 flex items-center justify-center text-[10px] font-bold text-warmWhite/80">
        {typeIcons[type]}
      </span>
      {DELIVERABLE_TYPE_LABELS[type]}
    </span>
  )
}
