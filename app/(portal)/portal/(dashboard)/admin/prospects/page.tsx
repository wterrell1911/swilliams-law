"use client"

import { useEffect, useState } from "react"
import { EmptyState } from "@/components/portal/EmptyState"
import { CardSkeleton } from "@/components/portal/LoadingSkeleton"
import { cn } from "@/lib/utils"
import type { Prospect, ProspectStatus, ProspectServices } from "@/lib/types/portal"
import { 
  PROSPECT_STATUS_LABELS, 
  PROSPECT_STATUS_COLORS,
  SERVICE_PRICING,
  WEBSITE_PAGE_PRICE,
  calculateProspectValue
} from "@/lib/types/portal"

const PIPELINE_COLUMNS: ProspectStatus[] = ["lead", "contacted", "audit_sent", "demo_built", "meeting_scheduled", "proposal_sent"]
const CLOSED_COLUMNS: ProspectStatus[] = ["won", "lost"]

function getProspectMonthly(p: Prospect): number {
  if (p.services) {
    return calculateProspectValue(p.services).monthly
  }
  return p.estimated_value || 0
}

function getProspectSetup(p: Prospect): number {
  if (p.services) {
    return calculateProspectValue(p.services).setup
  }
  return 0
}

export default function AdminProspectsPage() {
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<"kanban" | "table">("kanban")
  const [updating, setUpdating] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProspect, setEditingProspect] = useState<Prospect | null>(null)

  useEffect(() => {
    fetchProspects()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchProspects() {
    try {
      const res = await fetch("/api/portal/prospects")
      const json = await res.json()
      if (json.data) setProspects(json.data as Prospect[])
    } catch (error) {
      console.error("Error fetching prospects:", error)
    }
    setLoading(false)
  }

  async function changeStatus(id: string, status: ProspectStatus) {
    setUpdating(id)
    const res = await fetch("/api/portal/prospects", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, last_contact: new Date().toISOString() }),
    })
    if (res.ok) {
      setProspects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status, last_contact: new Date().toISOString() } : p))
      )
    }
    setUpdating(null)
  }

  async function saveProspect(prospect: Partial<Prospect>) {
    const isNew = !prospect.id
    const method = isNew ? "POST" : "PATCH"
    
    const res = await fetch("/api/portal/prospects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(prospect),
    })
    
    if (res.ok) {
      const data = await res.json()
      if (isNew) {
        setProspects((prev) => [data, ...prev])
      } else {
        setProspects((prev) => prev.map((p) => (p.id === prospect.id ? { ...p, ...prospect } : p)))
      }
      setShowAddModal(false)
      setEditingProspect(null)
    }
  }

  async function deleteProspect(id: string) {
    if (!confirm("Delete this prospect?")) return
    
    const res = await fetch("/api/portal/prospects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    
    if (res.ok) {
      setProspects((prev) => prev.filter((p) => p.id !== id))
    }
  }

  const pipelineProspects = prospects.filter((p) => PIPELINE_COLUMNS.includes(p.status))
  const closedProspects = prospects.filter((p) => CLOSED_COLUMNS.includes(p.status))

  const pipelineMonthly = pipelineProspects.reduce((sum, p) => sum + getProspectMonthly(p), 0)
  const pipelineSetup = pipelineProspects.reduce((sum, p) => sum + getProspectSetup(p), 0)
  const wonMonthly = closedProspects.filter((p) => p.status === "won").reduce((sum, p) => sum + getProspectMonthly(p), 0)

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-display font-bold text-warmWhite mb-6">Sales Pipeline</h1>
        <div className="grid grid-cols-6 gap-4">
          {PIPELINE_COLUMNS.map((c) => <CardSkeleton key={c} />)}
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-warmWhite">Sales Pipeline</h1>
          <p className="text-sm text-warmWhite/50 mt-1">
            {pipelineProspects.length} active · <span className="text-gold-500">${pipelineMonthly.toLocaleString()}/mo</span> pipeline
            {pipelineSetup > 0 && <span className="text-warmWhite/40"> + ${pipelineSetup.toLocaleString()} setup</span>}
            {wonMonthly > 0 && <span> · <span className="text-emerald-400">${wonMonthly.toLocaleString()}/mo</span> won</span>}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 text-sm font-medium bg-gold-500 text-navy-950 rounded-lg hover:bg-gold-400 transition-colors"
          >
            + Add Prospect
          </button>
          <div className="flex gap-1 bg-navy-900 rounded-lg p-1">
            <button
              onClick={() => setView("kanban")}
              className={cn("px-3 py-1.5 text-sm rounded-md transition-colors", view === "kanban" ? "bg-navy-700 text-warmWhite" : "text-warmWhite/50")}
            >
              Kanban
            </button>
            <button
              onClick={() => setView("table")}
              className={cn("px-3 py-1.5 text-sm rounded-md transition-colors", view === "table" ? "bg-navy-700 text-warmWhite" : "text-warmWhite/50")}
            >
              Table
            </button>
          </div>
        </div>
      </div>

      {view === "kanban" ? (
        <>
          {/* Active Pipeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            {PIPELINE_COLUMNS.map((status) => {
              const items = prospects.filter((p) => p.status === status)
              const columnMonthly = items.reduce((sum, p) => sum + getProspectMonthly(p), 0)
              return (
                <div key={status} className="bg-navy-900/50 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className={cn("text-xs font-medium px-2 py-1 rounded-full", PROSPECT_STATUS_COLORS[status])}>
                      {PROSPECT_STATUS_LABELS[status]}
                    </span>
                    <span className="text-xs text-warmWhite/40">{items.length}</span>
                  </div>
                  {columnMonthly > 0 && (
                    <p className="text-xs text-gold-500/70 px-1 mb-2">${columnMonthly.toLocaleString()}/mo</p>
                  )}
                  <div className="space-y-2">
                    {items.map((p) => (
                      <ProspectCard
                        key={p.id}
                        prospect={p}
                        onStatusChange={changeStatus}
                        onEdit={() => setEditingProspect(p)}
                        onDelete={() => deleteProspect(p.id)}
                        updating={updating === p.id}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Closed (Won/Lost) */}
          {closedProspects.length > 0 && (
            <>
              <h2 className="text-lg font-medium text-warmWhite/70 mb-3">Closed</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CLOSED_COLUMNS.map((status) => {
                  const items = prospects.filter((p) => p.status === status)
                  if (items.length === 0) return null
                  return (
                    <div key={status} className="bg-navy-900/30 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-3 px-1">
                        <span className={cn("text-xs font-medium px-2 py-1 rounded-full", PROSPECT_STATUS_COLORS[status])}>
                          {PROSPECT_STATUS_LABELS[status]}
                        </span>
                        <span className="text-xs text-warmWhite/40">{items.length}</span>
                      </div>
                      <div className="space-y-2">
                        {items.map((p) => (
                          <ProspectCard
                            key={p.id}
                            prospect={p}
                            onStatusChange={changeStatus}
                            onEdit={() => setEditingProspect(p)}
                            onDelete={() => deleteProspect(p.id)}
                            updating={updating === p.id}
                            compact
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="bg-navy-900 border border-navy-700 rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-navy-700">
                <th className="text-left p-3 text-warmWhite/50 font-medium">Firm</th>
                <th className="text-left p-3 text-warmWhite/50 font-medium">Contact</th>
                <th className="text-left p-3 text-warmWhite/50 font-medium">Services</th>
                <th className="text-left p-3 text-warmWhite/50 font-medium">Status</th>
                <th className="text-left p-3 text-warmWhite/50 font-medium">Monthly</th>
                <th className="text-left p-3 text-warmWhite/50 font-medium">Setup</th>
                <th className="text-left p-3 text-warmWhite/50 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800">
              {prospects.length === 0 ? (
                <tr><td colSpan={7} className="p-8 text-center text-warmWhite/40">No prospects yet</td></tr>
              ) : prospects.map((p) => {
                const monthly = getProspectMonthly(p)
                const setup = getProspectSetup(p)
                return (
                  <tr key={p.id} className="hover:bg-navy-800/30">
                    <td className="p-3">
                      <div className="text-warmWhite font-medium">{p.firm_name}</div>
                      {p.website && <a href={`https://${p.website}`} target="_blank" rel="noopener noreferrer" className="text-xs text-gold-500 hover:underline">{p.website}</a>}
                    </td>
                    <td className="p-3">
                      <div className="text-warmWhite/80">{p.contact_name || "—"}</div>
                      {p.email && <div className="text-xs text-warmWhite/40">{p.email}</div>}
                    </td>
                    <td className="p-3">
                      <ServiceBadges services={p.services} />
                    </td>
                    <td className="p-3">
                      <select
                        value={p.status}
                        onChange={(e) => changeStatus(p.id, e.target.value as ProspectStatus)}
                        disabled={updating === p.id}
                        className="text-xs bg-navy-800 border border-navy-600 text-warmWhite rounded px-2 py-1 focus:outline-none"
                      >
                        {[...PIPELINE_COLUMNS, ...CLOSED_COLUMNS].map((s) => (
                          <option key={s} value={s}>{PROSPECT_STATUS_LABELS[s]}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3 text-gold-500">{monthly > 0 ? `$${monthly.toLocaleString()}` : "—"}</td>
                    <td className="p-3 text-warmWhite/50">{setup > 0 ? `$${setup.toLocaleString()}` : "—"}</td>
                    <td className="p-3">
                      <button onClick={() => setEditingProspect(p)} className="text-gold-500 hover:text-gold-400 text-xs mr-2">Edit</button>
                      <button onClick={() => deleteProspect(p.id)} className="text-red-400 hover:text-red-300 text-xs">Delete</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {prospects.length === 0 && <EmptyState title="No prospects" description="Add your first prospect to start tracking your pipeline." />}

      {/* Add/Edit Modal */}
      {(showAddModal || editingProspect) && (
        <ProspectModal
          prospect={editingProspect}
          onSave={saveProspect}
          onClose={() => { setShowAddModal(false); setEditingProspect(null) }}
        />
      )}
    </div>
  )
}

function ServiceBadges({ services }: { services: ProspectServices | null }) {
  if (!services) return <span className="text-warmWhite/30 text-xs">No services</span>
  
  const badges = []
  if (services.full_stack) badges.push({ label: "Full Stack", color: "bg-gold-500/20 text-gold-400" })
  if (services.marketing_geo) badges.push({ label: "Mktg+GEO", color: "bg-purple-500/20 text-purple-300" })
  if (services.marketing) badges.push({ label: "Marketing", color: "bg-blue-500/20 text-blue-300" })
  if (services.automation) badges.push({ label: "Automation", color: "bg-cyan-500/20 text-cyan-300" })
  if (services.ai_concierge) badges.push({ label: "Concierge", color: "bg-pink-500/20 text-pink-300" })
  if (services.ai_pocket) badges.push({ label: "AI Pocket", color: "bg-orange-500/20 text-orange-300" })
  if (services.website) {
    const pages = services.website_pages || 0
    badges.push({ label: pages > 0 ? `Website +${pages}pg` : "Website", color: "bg-emerald-500/20 text-emerald-300" })
  }
  
  if (badges.length === 0) return <span className="text-warmWhite/30 text-xs">No services</span>
  
  return (
    <div className="flex flex-wrap gap-1">
      {badges.map((b) => (
        <span key={b.label} className={cn("text-[10px] px-1.5 py-0.5 rounded", b.color)}>
          {b.label}
        </span>
      ))}
    </div>
  )
}

interface ProspectCardProps {
  prospect: Prospect
  onStatusChange: (id: string, status: ProspectStatus) => void
  onEdit: () => void
  onDelete: () => void
  updating: boolean
  compact?: boolean
}

function ProspectCard({ prospect: p, onStatusChange, onEdit, onDelete, updating, compact }: ProspectCardProps) {
  const monthly = getProspectMonthly(p)
  const setup = getProspectSetup(p)
  
  return (
    <div className="bg-navy-900 border border-navy-700 rounded-lg p-3 group">
      <div className="flex items-start justify-between mb-1">
        <p className="text-sm font-medium text-warmWhite line-clamp-1">{p.firm_name}</p>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <button onClick={onEdit} className="text-warmWhite/40 hover:text-gold-500 text-xs">✏️</button>
          <button onClick={onDelete} className="text-warmWhite/40 hover:text-red-400 text-xs">🗑️</button>
        </div>
      </div>
      {p.contact_name && <p className="text-xs text-warmWhite/50 mb-1">{p.contact_name}</p>}
      {!compact && (
        <>
          {monthly > 0 && (
            <p className="text-xs text-gold-500 mb-1">
              ${monthly.toLocaleString()}/mo
              {setup > 0 && <span className="text-warmWhite/40"> + ${setup.toLocaleString()}</span>}
            </p>
          )}
          <ServiceBadges services={p.services} />
          {p.demo_url && (
            <a href={p.demo_url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-400 hover:underline block mt-1">
              View Demo →
            </a>
          )}
          {p.notes && <p className="text-xs text-warmWhite/40 mt-2 line-clamp-2">{p.notes}</p>}
          <div className="flex items-center justify-between mt-2">
            {p.last_contact && (
              <span className="text-[10px] text-warmWhite/30">
                Last: {new Date(p.last_contact).toLocaleDateString()}
              </span>
            )}
            <select
              value={p.status}
              onChange={(e) => onStatusChange(p.id, e.target.value as ProspectStatus)}
              disabled={updating}
              className="text-[11px] bg-navy-800 border border-navy-600 text-warmWhite rounded px-1.5 py-0.5 focus:outline-none ml-auto"
            >
              {[...PIPELINE_COLUMNS, ...CLOSED_COLUMNS].map((s) => (
                <option key={s} value={s}>{PROSPECT_STATUS_LABELS[s]}</option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  )
}

interface ProspectModalProps {
  prospect: Prospect | null
  onSave: (prospect: Partial<Prospect>) => void
  onClose: () => void
}

function ProspectModal({ prospect, onSave, onClose }: ProspectModalProps) {
  const [form, setForm] = useState<Partial<Prospect>>(prospect || {
    firm_name: "",
    contact_name: "",
    email: "",
    phone: "",
    website: "",
    status: "lead",
    source: "",
    notes: "",
    services: null,
    demo_url: "",
  })

  const [services, setServices] = useState<ProspectServices>(prospect?.services || {})

  const { monthly, setup } = calculateProspectValue(services)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Determine if any services are selected
    const hasServices = services.full_stack || services.marketing_geo || services.marketing || services.automation || services.ai_concierge || services.ai_pocket || services.website
    onSave({
      ...form,
      services: hasServices ? services : null,
      estimated_value: monthly, // Keep legacy field in sync
    })
  }

  const toggleService = (key: keyof ProspectServices) => {
    if (key === "website_pages") return
    setServices({ ...services, [key]: !services[key] })
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-navy-900 border border-navy-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-navy-700">
          <h2 className="text-lg font-display font-bold text-warmWhite">
            {prospect ? "Edit Prospect" : "Add Prospect"}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm text-warmWhite/70 mb-1">Firm Name *</label>
            <input
              type="text"
              value={form.firm_name || ""}
              onChange={(e) => setForm({ ...form, firm_name: e.target.value })}
              required
              className="w-full h-10 px-3 text-sm rounded-lg bg-navy-800 border border-navy-700 text-warmWhite focus:outline-none focus:ring-1 focus:ring-gold-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-warmWhite/70 mb-1">Contact Name</label>
              <input
                type="text"
                value={form.contact_name || ""}
                onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
                className="w-full h-10 px-3 text-sm rounded-lg bg-navy-800 border border-navy-700 text-warmWhite focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
            </div>
            <div>
              <label className="block text-sm text-warmWhite/70 mb-1">Email</label>
              <input
                type="email"
                value={form.email || ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full h-10 px-3 text-sm rounded-lg bg-navy-800 border border-navy-700 text-warmWhite focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-warmWhite/70 mb-1">Phone</label>
              <input
                type="tel"
                value={form.phone || ""}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full h-10 px-3 text-sm rounded-lg bg-navy-800 border border-navy-700 text-warmWhite focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
            </div>
            <div>
              <label className="block text-sm text-warmWhite/70 mb-1">Website</label>
              <input
                type="text"
                value={form.website || ""}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                placeholder="example.com"
                className="w-full h-10 px-3 text-sm rounded-lg bg-navy-800 border border-navy-700 text-warmWhite focus:outline-none focus:ring-1 focus:ring-gold-500"
              />
            </div>
          </div>

          {/* Services Selection */}
          <div className="bg-navy-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-warmWhite">Services Being Pitched</label>
              {(monthly > 0 || setup > 0) && (
                <div className="text-right">
                  {monthly > 0 && <span className="text-gold-500 font-medium">${monthly.toLocaleString()}/mo</span>}
                  {setup > 0 && <span className="text-warmWhite/50 text-sm ml-2">{monthly > 0 ? "+ " : ""}${setup.toLocaleString()} setup</span>}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {/* Full Stack */}
              <label className={cn(
                "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                services.full_stack ? "bg-gold-500/10 border-gold-500/50" : "bg-navy-900 border-navy-700 hover:border-navy-600"
              )}>
                <input
                  type="checkbox"
                  checked={services.full_stack || false}
                  onChange={() => toggleService("full_stack")}
                  className="sr-only"
                />
                <div className={cn("w-4 h-4 rounded border flex items-center justify-center", services.full_stack ? "bg-gold-500 border-gold-500" : "border-navy-500")}>
                  {services.full_stack && <span className="text-navy-950 text-xs">✓</span>}
                </div>
                <div>
                  <p className="text-sm text-warmWhite">{SERVICE_PRICING.full_stack.label}</p>
                  <p className="text-xs text-warmWhite/50">${SERVICE_PRICING.full_stack.monthly.toLocaleString()}/mo + ${SERVICE_PRICING.full_stack.setup.toLocaleString()}</p>
                </div>
              </label>

              {/* Marketing + GEO */}
              <label className={cn(
                "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                services.marketing_geo ? "bg-purple-500/10 border-purple-500/50" : "bg-navy-900 border-navy-700 hover:border-navy-600"
              )}>
                <input
                  type="checkbox"
                  checked={services.marketing_geo || false}
                  onChange={() => toggleService("marketing_geo")}
                  className="sr-only"
                />
                <div className={cn("w-4 h-4 rounded border flex items-center justify-center", services.marketing_geo ? "bg-purple-500 border-purple-500" : "border-navy-500")}>
                  {services.marketing_geo && <span className="text-white text-xs">✓</span>}
                </div>
                <div>
                  <p className="text-sm text-warmWhite">{SERVICE_PRICING.marketing_geo.label}</p>
                  <p className="text-xs text-warmWhite/50">${SERVICE_PRICING.marketing_geo.monthly.toLocaleString()}/mo</p>
                </div>
              </label>

              {/* Marketing */}
              <label className={cn(
                "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                services.marketing ? "bg-blue-500/10 border-blue-500/50" : "bg-navy-900 border-navy-700 hover:border-navy-600"
              )}>
                <input
                  type="checkbox"
                  checked={services.marketing || false}
                  onChange={() => toggleService("marketing")}
                  className="sr-only"
                />
                <div className={cn("w-4 h-4 rounded border flex items-center justify-center", services.marketing ? "bg-blue-500 border-blue-500" : "border-navy-500")}>
                  {services.marketing && <span className="text-white text-xs">✓</span>}
                </div>
                <div>
                  <p className="text-sm text-warmWhite">{SERVICE_PRICING.marketing.label}</p>
                  <p className="text-xs text-warmWhite/50">${SERVICE_PRICING.marketing.monthly.toLocaleString()}/mo</p>
                </div>
              </label>

              {/* Automation */}
              <label className={cn(
                "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                services.automation ? "bg-cyan-500/10 border-cyan-500/50" : "bg-navy-900 border-navy-700 hover:border-navy-600"
              )}>
                <input
                  type="checkbox"
                  checked={services.automation || false}
                  onChange={() => toggleService("automation")}
                  className="sr-only"
                />
                <div className={cn("w-4 h-4 rounded border flex items-center justify-center", services.automation ? "bg-cyan-500 border-cyan-500" : "border-navy-500")}>
                  {services.automation && <span className="text-white text-xs">✓</span>}
                </div>
                <div>
                  <p className="text-sm text-warmWhite">{SERVICE_PRICING.automation.label}</p>
                  <p className="text-xs text-warmWhite/50">${SERVICE_PRICING.automation.monthly.toLocaleString()}/mo + ${SERVICE_PRICING.automation.setup.toLocaleString()}</p>
                </div>
              </label>

              {/* AI Concierge */}
              <label className={cn(
                "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                services.ai_concierge ? "bg-pink-500/10 border-pink-500/50" : "bg-navy-900 border-navy-700 hover:border-navy-600"
              )}>
                <input
                  type="checkbox"
                  checked={services.ai_concierge || false}
                  onChange={() => toggleService("ai_concierge")}
                  className="sr-only"
                />
                <div className={cn("w-4 h-4 rounded border flex items-center justify-center", services.ai_concierge ? "bg-pink-500 border-pink-500" : "border-navy-500")}>
                  {services.ai_concierge && <span className="text-white text-xs">✓</span>}
                </div>
                <div>
                  <p className="text-sm text-warmWhite">{SERVICE_PRICING.ai_concierge.label}</p>
                  <p className="text-xs text-warmWhite/50">${SERVICE_PRICING.ai_concierge.monthly.toLocaleString()}/mo + ${SERVICE_PRICING.ai_concierge.setup.toLocaleString()}</p>
                </div>
              </label>

              {/* AI In Your Pocket */}
              <label className={cn(
                "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                services.ai_pocket ? "bg-orange-500/10 border-orange-500/50" : "bg-navy-900 border-navy-700 hover:border-navy-600"
              )}>
                <input
                  type="checkbox"
                  checked={services.ai_pocket || false}
                  onChange={() => toggleService("ai_pocket")}
                  className="sr-only"
                />
                <div className={cn("w-4 h-4 rounded border flex items-center justify-center", services.ai_pocket ? "bg-orange-500 border-orange-500" : "border-navy-500")}>
                  {services.ai_pocket && <span className="text-white text-xs">✓</span>}
                </div>
                <div>
                  <p className="text-sm text-warmWhite">{SERVICE_PRICING.ai_pocket.label}</p>
                  <p className="text-xs text-warmWhite/50">${SERVICE_PRICING.ai_pocket.setup.toLocaleString()} one-time</p>
                </div>
              </label>

              {/* Website */}
              <label className={cn(
                "flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors",
                services.website ? "bg-emerald-500/10 border-emerald-500/50" : "bg-navy-900 border-navy-700 hover:border-navy-600"
              )}>
                <input
                  type="checkbox"
                  checked={services.website || false}
                  onChange={() => toggleService("website")}
                  className="sr-only"
                />
                <div className={cn("w-4 h-4 rounded border flex items-center justify-center", services.website ? "bg-emerald-500 border-emerald-500" : "border-navy-500")}>
                  {services.website && <span className="text-white text-xs">✓</span>}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-warmWhite">{SERVICE_PRICING.website.label}</p>
                  <p className="text-xs text-warmWhite/50">${SERVICE_PRICING.website.setup.toLocaleString()} + ${WEBSITE_PAGE_PRICE.toLocaleString()}/extra page</p>
                </div>
                {services.website && (
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-warmWhite/60">Extra pages:</label>
                    <input
                      type="number"
                      min="0"
                      value={services.website_pages || 0}
                      onChange={(e) => setServices({ ...services, website_pages: parseInt(e.target.value) || 0 })}
                      className="w-16 h-8 px-2 text-sm rounded bg-navy-800 border border-navy-600 text-warmWhite focus:outline-none"
                    />
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-warmWhite/70 mb-1">Status</label>
              <select
                value={form.status || "lead"}
                onChange={(e) => setForm({ ...form, status: e.target.value as ProspectStatus })}
                className="w-full h-10 px-3 text-sm rounded-lg bg-navy-800 border border-navy-700 text-warmWhite focus:outline-none focus:ring-1 focus:ring-gold-500"
              >
                {[...PIPELINE_COLUMNS, ...CLOSED_COLUMNS].map((s) => (
                  <option key={s} value={s}>{PROSPECT_STATUS_LABELS[s]}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-warmWhite/70 mb-1">Source</label>
              <select
                value={form.source || ""}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
                className="w-full h-10 px-3 text-sm rounded-lg bg-navy-800 border border-navy-700 text-warmWhite focus:outline-none focus:ring-1 focus:ring-gold-500"
              >
                <option value="">Select source...</option>
                <option value="referral">Referral</option>
                <option value="website">Website</option>
                <option value="linkedin">LinkedIn</option>
                <option value="cold_outreach">Cold Outreach</option>
                <option value="conference">Conference</option>
                <option value="target_list">Target List</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-warmWhite/70 mb-1">Demo URL</label>
            <input
              type="url"
              value={form.demo_url || ""}
              onChange={(e) => setForm({ ...form, demo_url: e.target.value })}
              placeholder="https://demo.yourfirm.com"
              className="w-full h-10 px-3 text-sm rounded-lg bg-navy-800 border border-navy-700 text-warmWhite focus:outline-none focus:ring-1 focus:ring-gold-500"
            />
          </div>

          <div>
            <label className="block text-sm text-warmWhite/70 mb-1">Notes</label>
            <textarea
              value={form.notes || ""}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 text-sm rounded-lg bg-navy-800 border border-navy-700 text-warmWhite focus:outline-none focus:ring-1 focus:ring-gold-500 resize-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-warmWhite/70 hover:text-warmWhite transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium bg-gold-500 text-navy-950 rounded-lg hover:bg-gold-400 transition-colors"
            >
              {prospect ? "Save Changes" : "Add Prospect"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
