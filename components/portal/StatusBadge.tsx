import { cn } from "@/lib/utils"
import type { DeliverableStatus } from "@/lib/types/portal"
import { DELIVERABLE_STATUS_LABELS } from "@/lib/types/portal"

const statusColors: Record<DeliverableStatus, string> = {
  draft: "bg-navy-700 text-warmWhite/70",
  in_review: "bg-gold-500/15 text-gold-400",
  approved: "bg-green-500/15 text-green-400",
  scheduled: "bg-electric-500/15 text-electric-400",
  published: "bg-electric-500/20 text-electric-400",
  rejected: "bg-red-500/15 text-red-400",
}

interface StatusBadgeProps {
  status: DeliverableStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        statusColors[status],
        className
      )}
    >
      {DELIVERABLE_STATUS_LABELS[status]}
    </span>
  )
}
