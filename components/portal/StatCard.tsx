import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string | number
  trend?: number
  className?: string
}

export function StatCard({ label, value, trend, className }: StatCardProps) {
  return (
    <div className={cn("bg-navy-900 border border-navy-700 rounded-xl p-6", className)}>
      <p className="text-sm text-warmWhite/60 mb-1">{label}</p>
      <p className="text-3xl font-display font-bold text-warmWhite">{value}</p>
      {trend !== undefined && (
        <div className="flex items-center gap-1 mt-2">
          {trend >= 0 ? (
            <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
            </svg>
          )}
          <span className={cn("text-sm font-medium", trend >= 0 ? "text-green-400" : "text-red-400")}>
            {trend > 0 ? "+" : ""}{trend}%
          </span>
        </div>
      )}
    </div>
  )
}
