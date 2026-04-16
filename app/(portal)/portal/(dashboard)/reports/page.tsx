"use client"

import { useEffect, useState } from "react"
import { StatCard } from "@/components/portal/StatCard"
import { EmptyState } from "@/components/portal/EmptyState"
import { CardSkeleton } from "@/components/portal/LoadingSkeleton"
import type { Report } from "@/lib/types/portal"

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/portal/reports")
        const json = await res.json()
        if (json.data) setReports(json.data as Report[])
      } catch (error) {
        console.error("Error fetching reports:", error)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-display font-bold text-warmWhite mb-6">Reports</h1>
        <div className="grid gap-6">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-warmWhite mb-6">Reports</h1>

      {reports.length === 0 ? (
        <EmptyState
          title="No reports yet"
          description="Monthly performance reports will appear here."
        />
      ) : (
        <div className="space-y-6">
          {reports.map((report) => (
            <div key={report.id} className="bg-navy-900 border border-navy-700 rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-display font-semibold text-warmWhite">
                    {report.title || new Date(report.month).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                  </h2>
                  {report.summary && (
                    <p className="text-warmWhite/60 text-sm mt-1">{report.summary}</p>
                  )}
                </div>
                {report.dropbox_path && (
                  <a
                    href={report.dropbox_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 text-sm bg-gold-500 text-navy-950 font-semibold rounded-lg hover:bg-gold-400 transition-colors"
                  >
                    View Report
                  </a>
                )}
              </div>

              {report.metrics && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {report.metrics.traffic !== undefined && (
                    <StatCard
                      label="Website Traffic"
                      value={report.metrics.traffic.toLocaleString()}
                      trend={report.metrics.traffic_change}
                    />
                  )}
                  {report.metrics.leads !== undefined && (
                    <StatCard
                      label="New Leads"
                      value={report.metrics.leads}
                      trend={report.metrics.leads_change}
                    />
                  )}
                  {report.metrics.rankings !== undefined && (
                    <StatCard
                      label="Keyword Rankings"
                      value={report.metrics.rankings}
                      trend={report.metrics.rankings_change}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
