"use client"

import { useEffect, useState, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
import { StatCard } from "@/components/portal/StatCard"
import { StatCardSkeleton, CardSkeleton } from "@/components/portal/LoadingSkeleton"
import { cn } from "@/lib/utils"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import type {
  CrmClient,
  LeadWithClient,
  CrmTaskWithClient,
  LeadStatus,
  CrmTaskCategory,
} from "@/lib/types/portal"
import {
  LEAD_STATUS_COLORS,
  LEAD_STATUS_LABELS,
  LEAD_SOURCE_TYPE_LABELS,
  TASK_CATEGORY_COLORS,
  TASK_CATEGORY_LABELS,
} from "@/lib/types/portal"

const SOURCE_COLORS: Record<string, string> = {
  organic: "#22c55e",
  maps: "#3b82f6",
  paid: "#f59e0b",
  lsa: "#8b5cf6",
  direct: "#6b7280",
  referral: "#06b6d4",
}

const SOURCE_LABELS: Record<string, string> = {
  organic: "Organic",
  maps: "Maps",
  paid: "Paid",
  lsa: "LSA",
  direct: "Direct",
  referral: "Referral",
}

function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100)
}

function getMonthStart(): string {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
  return start.toISOString()
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function formatShortDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

export default function CrmDashboardPage() {
  const supabase = createClient()
  const [clients, setClients] = useState<CrmClient[]>([])
  const [leads, setLeads] = useState<LeadWithClient[]>([])
  const [monthLeadCount, setMonthLeadCount] = useState(0)
  const [tasks, setTasks] = useState<CrmTaskWithClient[]>([])
  const [overdueTasks, setOverdueTasks] = useState<CrmTaskWithClient[]>([])
  const [leadsBySource, setLeadsBySource] = useState<
    { source: string; count: number; fill: string }[]
  >([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const monthStart = getMonthStart()
      const today = new Date().toISOString().split("T")[0]

      const [clientsRes, leadsRes, monthLeadsRes, tasksRes, overdueTasksRes] =
        await Promise.all([
          // All clients (we filter active in-memory for count + revenue)
          supabase
            .from("clients")
            .select("*")
            .order("created_at", { ascending: false }),

          // Recent 10 leads with client info
          supabase
            .from("leads")
            .select("*, clients(firm_name, attorney_name)")
            .order("timestamp", { ascending: false })
            .limit(10),

          // Count of leads this month (just need the rows to count + group by source)
          supabase
            .from("leads")
            .select("id, marketing_source")
            .gte("timestamp", monthStart),

          // Open tasks (not done)
          supabase
            .from("tasks")
            .select("*, clients(firm_name)")
            .neq("status", "done")
            .order("due_date", { ascending: true }),

          // Overdue tasks specifically
          supabase
            .from("tasks")
            .select("*, clients(firm_name)")
            .neq("status", "done")
            .lt("due_date", today),
        ])

      if (clientsRes.data) setClients(clientsRes.data as CrmClient[])
      if (leadsRes.data) setLeads(leadsRes.data as LeadWithClient[])
      if (monthLeadsRes.data) setMonthLeadCount(monthLeadsRes.data.length)
      if (tasksRes.data) setTasks(tasksRes.data as CrmTaskWithClient[])

      // Store overdue tasks from the dedicated query in state
      if (overdueTasksRes.data) {
        setOverdueTasks(overdueTasksRes.data as CrmTaskWithClient[])
      }

      // Build leads-by-source chart data from month leads
      if (monthLeadsRes.data) {
        const sourceCounts: Record<string, number> = {}
        for (const lead of monthLeadsRes.data) {
          const src = (lead.marketing_source || "direct").toLowerCase()
          sourceCounts[src] = (sourceCounts[src] || 0) + 1
        }
        const chartData = Object.entries(sourceCounts).map(([source, count]) => ({
          source: SOURCE_LABELS[source] || source,
          count,
          fill: SOURCE_COLORS[source] || "#6b7280",
        }))
        setLeadsBySource(chartData)
      }

      setLoading(false)
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Derived KPIs
  const activeClients = useMemo(
    () => clients.filter((c) => c.status === "active"),
    [clients]
  )

  const monthlyRevenue = useMemo(
    () => activeClients.reduce((sum, c) => sum + (c.monthly_rate || 0), 0),
    [activeClients]
  )

  const openTaskCount = useMemo(
    () => tasks.length,
    [tasks]
  )

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-display font-bold text-warmWhite mb-6">
          CRM Dashboard
        </h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <h1 className="text-2xl font-display font-bold text-warmWhite mb-6">
        CRM Dashboard
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Active Clients" value={activeClients.length} />
        <StatCard label="Monthly Revenue" value={formatCents(monthlyRevenue)} />
        <StatCard label="Leads This Month" value={monthLeadCount} />
        <StatCard label="Open Tasks" value={openTaskCount} />
      </div>

      {/* Leads by Source Chart + Overdue Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Leads by Source Bar Chart */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
          <h2 className="text-lg font-display font-semibold text-warmWhite mb-4">
            Leads by Source
          </h2>
          {leadsBySource.length === 0 ? (
            <p className="text-sm text-warmWhite/40 text-center py-8">
              No leads this month
            </p>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={leadsBySource}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                  <XAxis
                    dataKey="source"
                    tick={{ fill: "#f5f0eb", fontSize: 12 }}
                    axisLine={{ stroke: "#2d4a6f" }}
                    tickLine={{ stroke: "#2d4a6f" }}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: "#f5f0eb", fontSize: 12 }}
                    axisLine={{ stroke: "#2d4a6f" }}
                    tickLine={{ stroke: "#2d4a6f" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0a1628",
                      border: "1px solid #2d4a6f",
                      borderRadius: "8px",
                      color: "#f5f0eb",
                      fontSize: "13px",
                    }}
                    labelStyle={{ color: "#f5f0eb" }}
                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Overdue Tasks */}
        <div className="bg-navy-900 border border-navy-700 rounded-xl">
          <div className="p-4 border-b border-navy-700">
            <h2 className="text-lg font-display font-semibold text-warmWhite flex items-center gap-2">
              Overdue Tasks
              {overdueTasks.length > 0 && (
                <span className="bg-red-500/15 text-red-400 text-xs px-2 py-0.5 rounded-full">
                  {overdueTasks.length}
                </span>
              )}
            </h2>
          </div>
          <div className="divide-y divide-navy-800 max-h-72 overflow-y-auto">
            {overdueTasks.length === 0 ? (
              <p className="p-4 text-sm text-warmWhite/40 text-center">
                No overdue tasks
              </p>
            ) : (
              overdueTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 hover:bg-navy-800/50 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-warmWhite truncate">
                      {task.title}
                    </p>
                    <p className="text-xs text-warmWhite/40 mt-0.5">
                      {task.clients?.firm_name || "Unassigned"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={cn(
                        "px-2 py-0.5 text-xs font-medium rounded-full",
                        TASK_CATEGORY_COLORS[task.category as CrmTaskCategory] ||
                          "bg-slate-500/20 text-slate-300"
                      )}
                    >
                      {TASK_CATEGORY_LABELS[task.category as CrmTaskCategory] ||
                        task.category}
                    </span>
                    <span className="text-xs text-red-400 whitespace-nowrap">
                      Due {task.due_date ? formatShortDate(task.due_date) : "N/A"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-navy-900 border border-navy-700 rounded-xl mb-8">
        <div className="p-4 border-b border-navy-700">
          <h2 className="text-lg font-display font-semibold text-warmWhite">
            Recent Leads
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-navy-700 text-warmWhite/60">
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800">
              {leads.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-warmWhite/40"
                  >
                    No leads found
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-navy-800/50 transition-colors"
                  >
                    <td className="px-4 py-4 text-warmWhite/70 whitespace-nowrap">
                      {formatDate(lead.timestamp)}
                    </td>
                    <td className="px-4 py-4 text-warmWhite font-medium whitespace-nowrap">
                      {lead.clients?.firm_name || "Unknown"}
                    </td>
                    <td className="px-4 py-4 text-warmWhite whitespace-nowrap">
                      {lead.name || "--"}
                    </td>
                    <td className="px-4 py-4 text-warmWhite/70 whitespace-nowrap">
                      {lead.phone || "--"}
                    </td>
                    <td className="px-4 py-4 text-warmWhite/70 whitespace-nowrap capitalize">
                      {lead.marketing_source || "--"}
                    </td>
                    <td className="px-4 py-4 text-warmWhite/70 whitespace-nowrap">
                      {LEAD_SOURCE_TYPE_LABELS[lead.source_type] ||
                        lead.source_type}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={cn(
                          "px-2 py-0.5 text-xs font-medium rounded-full",
                          LEAD_STATUS_COLORS[lead.status as LeadStatus] ||
                            "bg-slate-500/20 text-slate-300"
                        )}
                      >
                        {LEAD_STATUS_LABELS[lead.status as LeadStatus] ||
                          lead.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
