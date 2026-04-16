"use client"

import { useEffect, useState, useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import type {
  CrmClient,
  Lead,
  CrmTask,
  PackageTier,
  ClientStatus,
  CrmTaskCategory,
  CrmTaskStatus,
  LeadStatus,
  LeadSourceType,
} from "@/lib/types/portal"
import {
  CLIENT_STATUS_COLORS,
  CLIENT_STATUS_LABELS,
  PACKAGE_TIER_LABELS,
  PACKAGE_TIER_COLORS,
  LEAD_STATUS_COLORS,
  LEAD_STATUS_LABELS,
  LEAD_SOURCE_TYPE_LABELS,
  TASK_CATEGORY_COLORS,
  TASK_CATEGORY_LABELS,
  TASK_STATUS_LABELS,
} from "@/lib/types/portal"

type TabKey = "overview" | "leads" | "tasks" | "notes"

function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function getMonthStart(): string {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
}

function getLastMonthRange(): { start: string; end: string } {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const end = new Date(now.getFullYear(), now.getMonth(), 1)
  return { start: start.toISOString(), end: end.toISOString() }
}

export default function ClientDetailPage() {
  const params = useParams()
  const id = params.id as string
  const supabase = createClient()

  const [client, setClient] = useState<CrmClient | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [tasks, setTasks] = useState<CrmTask[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<TabKey>("overview")

  // Edit mode
  const [editing, setEditing] = useState(false)
  const [editForm, setEditForm] = useState<Partial<CrmClient>>({})
  const [saving, setSaving] = useState(false)

  // Notes
  const [notes, setNotes] = useState("")
  const [savingNotes, setSavingNotes] = useState(false)

  // Add task
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    category: "seo" as CrmTaskCategory,
    status: "todo" as CrmTaskStatus,
    due_date: "",
  })
  const [addingTask, setAddingTask] = useState(false)

  // Clipboard
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!id) return
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function fetchData() {
    setLoading(true)
    const [clientRes, leadsRes, tasksRes] = await Promise.all([
      supabase.from("clients").select("*").eq("id", id).single(),
      supabase
        .from("leads")
        .select("*")
        .eq("client_id", id)
        .order("timestamp", { ascending: false }),
      supabase
        .from("tasks")
        .select("*")
        .eq("client_id", id)
        .order("due_date", { ascending: true }),
    ])

    if (clientRes.data) {
      const c = clientRes.data as CrmClient
      setClient(c)
      setNotes(c.notes || "")
      setEditForm({
        firm_name: c.firm_name,
        attorney_name: c.attorney_name,
        email: c.email,
        phone: c.phone,
        website_url: c.website_url,
        package_tier: c.package_tier,
        monthly_rate: c.monthly_rate,
        status: c.status,
        start_date: c.start_date,
      })
    }
    if (leadsRes.data) setLeads(leadsRes.data as Lead[])
    if (tasksRes.data) setTasks(tasksRes.data as CrmTask[])

    setLoading(false)
  }

  // -- KPIs ---
  const monthStart = getMonthStart()
  const lastMonth = getLastMonthRange()

  const leadsThisMonth = useMemo(
    () => leads.filter((l) => l.timestamp >= monthStart).length,
    [leads, monthStart]
  )

  const leadsLastMonth = useMemo(
    () =>
      leads.filter(
        (l) => l.timestamp >= lastMonth.start && l.timestamp < lastMonth.end
      ).length,
    [leads, lastMonth]
  )

  const openTasks = useMemo(
    () => tasks.filter((t) => t.status !== "done").length,
    [tasks]
  )

  // -- Lead volume chart data (grouped by month) ---
  const leadChartData = useMemo(() => {
    const buckets: Record<string, number> = {}
    for (const lead of leads) {
      const d = new Date(lead.timestamp)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      buckets[key] = (buckets[key] || 0) + 1
    }
    return Object.entries(buckets)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-12)
      .map(([month, count]) => {
        const [y, m] = month.split("-")
        const label = new Date(Number(y), Number(m) - 1).toLocaleDateString(
          "en-US",
          { month: "short", year: "2-digit" }
        )
        return { month: label, leads: count }
      })
  }, [leads])

  // -- Handlers ---

  async function handleSaveEdit() {
    if (!client) return
    setSaving(true)
    const { error } = await supabase
      .from("clients")
      .update({
        firm_name: editForm.firm_name,
        attorney_name: editForm.attorney_name,
        email: editForm.email,
        phone: editForm.phone,
        website_url: editForm.website_url,
        package_tier: editForm.package_tier,
        monthly_rate: editForm.monthly_rate,
        status: editForm.status,
        start_date: editForm.start_date,
      })
      .eq("id", id)
    if (!error) {
      setClient({ ...client, ...editForm } as CrmClient)
      setEditing(false)
    }
    setSaving(false)
  }

  async function handleSaveNotes() {
    setSavingNotes(true)
    await supabase.from("clients").update({ notes }).eq("id", id)
    if (client) setClient({ ...client, notes })
    setSavingNotes(false)
  }

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault()
    setAddingTask(true)
    const { data, error } = await supabase
      .from("tasks")
      .insert({
        client_id: id,
        title: newTask.title,
        category: newTask.category,
        status: newTask.status,
        due_date: newTask.due_date || null,
        assigned_to: "admin",
      })
      .select()
      .single()
    if (!error && data) {
      setTasks([data as CrmTask, ...tasks])
      setNewTask({ title: "", category: "seo", status: "todo", due_date: "" })
      setShowAddTask(false)
    }
    setAddingTask(false)
  }

  function handleCopyApiKey() {
    if (!client?.api_key) return
    navigator.clipboard.writeText(client.api_key)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const inputClass =
    "w-full h-10 px-3 text-sm rounded-lg bg-navy-800 border border-navy-600 text-warmWhite placeholder:text-warmWhite/30 focus:outline-none focus:ring-1 focus:ring-gold-500"

  const tabs: { key: TabKey; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "leads", label: "Leads" },
    { key: "tasks", label: "Tasks" },
    { key: "notes", label: "Notes" },
  ]

  // -- Loading ---

  if (loading) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/portal/crm"
            className="text-warmWhite/60 hover:text-warmWhite transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <div className="h-8 w-64 bg-navy-800 rounded animate-pulse" />
        </div>
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-6 animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 bg-navy-800 rounded" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!client) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/portal/crm"
            className="text-warmWhite/60 hover:text-warmWhite transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <h1 className="text-2xl font-display font-bold text-warmWhite">
            Client Not Found
          </h1>
        </div>
        <p className="text-warmWhite/60 text-sm">
          No client exists with this ID.
        </p>
      </div>
    )
  }

  // -- Render ---

  return (
    <div>
      {/* ===== HEADER ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Link
            href="/portal/crm"
            className="text-warmWhite/60 hover:text-warmWhite transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-display font-bold text-warmWhite">
              {client.firm_name}
            </h1>
            <p className="text-sm text-warmWhite/50">
              {client.attorney_name || "No attorney listed"}
            </p>
          </div>
          <span
            className={cn(
              "px-2.5 py-0.5 text-xs font-medium rounded-full ml-2",
              CLIENT_STATUS_COLORS[client.status]
            )}
          >
            {CLIENT_STATUS_LABELS[client.status]}
          </span>
        </div>

        {/* Quick action links */}
        <div className="flex items-center gap-2 flex-wrap">
          {client.website_url && (
            <a
              href={client.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs font-medium bg-navy-800 border border-navy-600 text-warmWhite/80 hover:text-warmWhite hover:border-navy-500 rounded-lg transition-colors"
            >
              Open Website
            </a>
          )}
          <a
            href={
              client.ga4_property_id
                ? `https://analytics.google.com/analytics/web/#/p${client.ga4_property_id}/reports`
                : "https://analytics.google.com"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs font-medium bg-navy-800 border border-navy-600 text-warmWhite/80 hover:text-warmWhite hover:border-navy-500 rounded-lg transition-colors"
          >
            Open GA4
          </a>
          <a
            href={
              client.callrail_account_id
                ? `https://app.callrail.com/accounts/${client.callrail_account_id}`
                : "https://app.callrail.com"
            }
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs font-medium bg-navy-800 border border-navy-600 text-warmWhite/80 hover:text-warmWhite hover:border-navy-500 rounded-lg transition-colors"
          >
            Open CallRail
          </a>
        </div>
      </div>

      {/* ===== CLIENT INFO CARD ===== */}
      <div className="bg-navy-900 border border-navy-700 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-warmWhite">
            Client Information
          </h2>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="px-3 py-1.5 text-xs font-medium bg-navy-800 border border-navy-600 text-warmWhite/80 hover:text-warmWhite hover:border-navy-500 rounded-lg transition-colors"
            >
              Edit
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setEditing(false)}
                className="px-3 py-1.5 text-xs font-medium text-warmWhite/60 hover:text-warmWhite transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={saving}
                className="px-4 py-1.5 text-xs font-medium bg-gold-500 hover:bg-gold-400 text-navy-950 rounded-lg transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          )}
        </div>

        {editing ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-warmWhite/50 mb-1">
                Firm Name
              </label>
              <input
                type="text"
                value={editForm.firm_name || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, firm_name: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs text-warmWhite/50 mb-1">
                Attorney Name
              </label>
              <input
                type="text"
                value={editForm.attorney_name || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, attorney_name: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs text-warmWhite/50 mb-1">
                Email
              </label>
              <input
                type="email"
                value={editForm.email || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, email: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs text-warmWhite/50 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={editForm.phone || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, phone: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs text-warmWhite/50 mb-1">
                Website URL
              </label>
              <input
                type="url"
                value={editForm.website_url || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, website_url: e.target.value })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs text-warmWhite/50 mb-1">
                Package Tier
              </label>
              <select
                value={editForm.package_tier || "foundation"}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    package_tier: e.target.value as PackageTier,
                  })
                }
                className={inputClass}
              >
                <option value="foundation">Foundation</option>
                <option value="growth">Growth</option>
                <option value="scale">Scale</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-warmWhite/50 mb-1">
                Monthly Rate (cents)
              </label>
              <input
                type="number"
                value={editForm.monthly_rate || 0}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    monthly_rate: Number(e.target.value),
                  })
                }
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-xs text-warmWhite/50 mb-1">
                Status
              </label>
              <select
                value={editForm.status || "active"}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    status: e.target.value as ClientStatus,
                  })
                }
                className={inputClass}
              >
                <option value="prospect">Prospect</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="churned">Churned</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-warmWhite/50 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={editForm.start_date || ""}
                onChange={(e) =>
                  setEditForm({ ...editForm, start_date: e.target.value })
                }
                className={inputClass}
              />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            <div>
              <p className="text-xs text-warmWhite/50">Email</p>
              <p className="text-sm text-warmWhite">{client.email || "--"}</p>
            </div>
            <div>
              <p className="text-xs text-warmWhite/50">Phone</p>
              <p className="text-sm text-warmWhite">{client.phone || "--"}</p>
            </div>
            <div>
              <p className="text-xs text-warmWhite/50">Website</p>
              {client.website_url ? (
                <a
                  href={client.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gold-500 hover:text-gold-400 transition-colors"
                >
                  {client.website_url}
                </a>
              ) : (
                <p className="text-sm text-warmWhite">--</p>
              )}
            </div>
            <div>
              <p className="text-xs text-warmWhite/50">Package Tier</p>
              <span
                className={cn(
                  "inline-block px-2 py-0.5 text-xs font-medium rounded-full mt-0.5",
                  PACKAGE_TIER_COLORS[client.package_tier]
                )}
              >
                {PACKAGE_TIER_LABELS[client.package_tier]}
              </span>
            </div>
            <div>
              <p className="text-xs text-warmWhite/50">Monthly Rate</p>
              <p className="text-sm text-warmWhite">
                {formatCents(client.monthly_rate)}/mo
              </p>
            </div>
            <div>
              <p className="text-xs text-warmWhite/50">Start Date</p>
              <p className="text-sm text-warmWhite">
                {client.start_date ? formatDate(client.start_date) : "--"}
              </p>
            </div>
            <div>
              <p className="text-xs text-warmWhite/50">Status</p>
              <span
                className={cn(
                  "inline-block px-2 py-0.5 text-xs font-medium rounded-full mt-0.5",
                  CLIENT_STATUS_COLORS[client.status]
                )}
              >
                {CLIENT_STATUS_LABELS[client.status]}
              </span>
            </div>
          </div>
        )}

        {/* API Key Display */}
        <div className="mt-6 pt-4 border-t border-navy-700">
          <p className="text-xs text-warmWhite/50 mb-1">
            API Key (for lead ingestion)
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2 text-sm font-mono bg-navy-800 border border-navy-700 rounded-lg text-warmWhite/80 truncate">
              {client.api_key}
            </code>
            <button
              onClick={handleCopyApiKey}
              className="flex-shrink-0 px-3 py-2 text-xs font-medium bg-navy-800 border border-navy-600 text-warmWhite/80 hover:text-warmWhite hover:border-navy-500 rounded-lg transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>

      {/* ===== TABS ===== */}
      <div className="flex items-center gap-6 border-b border-navy-700 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "pb-3 text-sm font-medium transition-colors",
              activeTab === tab.key
                ? "border-b-2 border-gold-500 text-gold-500"
                : "text-warmWhite/60 hover:text-warmWhite"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ===== TAB CONTENT ===== */}

      {/* ---------- OVERVIEW TAB ---------- */}
      {activeTab === "overview" && (
        <div>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 text-center">
              <p className="text-2xl font-display font-bold text-warmWhite">
                {leadsThisMonth}
              </p>
              <p className="text-xs text-warmWhite/50 mt-1">Leads This Month</p>
            </div>
            <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 text-center">
              <p className="text-2xl font-display font-bold text-warmWhite">
                {leadsLastMonth}
              </p>
              <p className="text-xs text-warmWhite/50 mt-1">Leads Last Month</p>
            </div>
            <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 text-center">
              <p className="text-2xl font-display font-bold text-warmWhite">
                {leads.length}
              </p>
              <p className="text-xs text-warmWhite/50 mt-1">Total Leads</p>
            </div>
            <div className="bg-navy-900 border border-navy-700 rounded-xl p-4 text-center">
              <p className="text-2xl font-display font-bold text-warmWhite">
                {openTasks}
              </p>
              <p className="text-xs text-warmWhite/50 mt-1">Open Tasks</p>
            </div>
          </div>

          {/* Lead Volume Chart */}
          <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
            <h2 className="text-lg font-display font-semibold text-warmWhite mb-4">
              Lead Volume by Month
            </h2>
            {leadChartData.length === 0 ? (
              <p className="text-sm text-warmWhite/40 text-center py-8">
                No lead data to chart
              </p>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={leadChartData}
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                    <XAxis
                      dataKey="month"
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
                    />
                    <Line
                      type="monotone"
                      dataKey="leads"
                      stroke="#d4a843"
                      strokeWidth={2}
                      dot={{ r: 4, fill: "#d4a843" }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---------- LEADS TAB ---------- */}
      {activeTab === "leads" && (
        <div className="bg-navy-900 border border-navy-700 rounded-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-navy-700 text-warmWhite/60">
                  <th className="px-4 py-3 font-medium">Date</th>
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
                      colSpan={6}
                      className="px-4 py-8 text-center text-warmWhite/40"
                    >
                      No leads found for this client
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
      )}

      {/* ---------- TASKS TAB ---------- */}
      {activeTab === "tasks" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-warmWhite">
              Tasks ({tasks.length})
            </h2>
            <button
              onClick={() => setShowAddTask(!showAddTask)}
              className="px-4 py-2 text-sm font-medium bg-gold-500 hover:bg-gold-400 text-navy-950 rounded-lg transition-colors"
            >
              {showAddTask ? "Cancel" : "Add Task"}
            </button>
          </div>

          {/* Add Task Form */}
          {showAddTask && (
            <div className="bg-navy-900 border border-navy-700 rounded-xl p-6 mb-4">
              <form
                onSubmit={handleAddTask}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div className="sm:col-span-2">
                  <label className="block text-xs text-warmWhite/50 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    placeholder="Task title"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs text-warmWhite/50 mb-1">
                    Category
                  </label>
                  <select
                    value={newTask.category}
                    onChange={(e) =>
                      setNewTask({
                        ...newTask,
                        category: e.target.value as CrmTaskCategory,
                      })
                    }
                    className={inputClass}
                  >
                    <option value="seo">SEO</option>
                    <option value="content">Content</option>
                    <option value="gbp">GBP</option>
                    <option value="technical">Technical</option>
                    <option value="billing">Billing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-warmWhite/50 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={newTask.due_date}
                    onChange={(e) =>
                      setNewTask({ ...newTask, due_date: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={addingTask}
                    className="px-6 py-2 text-sm font-medium bg-gold-500 hover:bg-gold-400 text-navy-950 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {addingTask ? "Adding..." : "Add Task"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tasks List */}
          <div className="bg-navy-900 border border-navy-700 rounded-xl divide-y divide-navy-800">
            {tasks.length === 0 ? (
              <p className="p-6 text-sm text-warmWhite/40 text-center">
                No tasks for this client
              </p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="p-4 hover:bg-navy-800/50 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-warmWhite truncate">
                      {task.title}
                    </p>
                    {task.due_date && (
                      <p className="text-xs text-warmWhite/40 mt-0.5">
                        Due {formatDate(task.due_date)}
                      </p>
                    )}
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
                    <span
                      className={cn(
                        "px-2 py-0.5 text-xs font-medium rounded-full",
                        task.status === "done"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : task.status === "in_progress"
                            ? "bg-blue-500/20 text-blue-300"
                            : "bg-slate-500/20 text-slate-300"
                      )}
                    >
                      {TASK_STATUS_LABELS[task.status as CrmTaskStatus] ||
                        task.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ---------- NOTES TAB ---------- */}
      {activeTab === "notes" && (
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-warmWhite mb-3">
            Client Notes
          </h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={10}
            placeholder="Add notes about this client..."
            className="w-full px-4 py-3 text-sm rounded-lg bg-navy-800 border border-navy-600 text-warmWhite placeholder:text-warmWhite/30 focus:outline-none focus:ring-1 focus:ring-gold-500 resize-y"
          />
          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={handleSaveNotes}
              disabled={savingNotes}
              className="px-6 py-2 text-sm font-medium bg-gold-500 hover:bg-gold-400 text-navy-950 rounded-lg transition-colors disabled:opacity-50"
            >
              {savingNotes ? "Saving..." : "Save Notes"}
            </button>
            {notes !== (client.notes || "") && (
              <span className="text-xs text-warmWhite/40">Unsaved changes</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
