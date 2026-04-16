"use client"

import { useEffect, useState } from "react"
import { EmptyState } from "@/components/portal/EmptyState"
import { CardSkeleton } from "@/components/portal/LoadingSkeleton"
import { cn } from "@/lib/utils"
import type { Audit, Prospect } from "@/lib/types/portal"

/**
 * SEO Intelligence Report - v2.0
 * 
 * NEW METHODOLOGY:
 * - Each metric is scored -10 to +10 (vs market average)
 * - Overall score is 0-100 where 50 = market average
 * - Formula: Overall = 50 + (Weighted Sum × 5)
 * 
 * Weights:
 * - SEO: 20%
 * - GEO: 15%
 * - Content: 20%
 * - Social: 10%
 * - Reputation: 20%
 * - Video: 5%
 * - Leads: 10%
 */

interface MetricScore {
  raw?: number          // Original 0-100 score
  marketAvg?: number    // Market average for comparison
  position: number      // -10 to +10 vs market
  weight: number        // Weight for overall calculation
  analysis?: string     // Explanation text
}

interface IntelligenceMetrics {
  seo: MetricScore
  geo: MetricScore
  content: MetricScore
  social: MetricScore
  reputation: MetricScore
  video: MetricScore
  leads: MetricScore
}

interface CompetitorData {
  rank: number
  name: string
  score: number
  keyStrength?: string
}

interface CompetitorsInfo {
  city?: string
  state?: string
  practiceArea?: string
  marketAverage?: number
  topFive?: CompetitorData[]
  doingWell?: string[]
  needsImprovement?: { issue: string; competitorExample?: string }[]
  barrierToEntry?: string
}

interface AuditRecommendations {
  metrics?: IntelligenceMetrics
  competitors?: CompetitorsInfo
  findings?: {
    strengths?: string[]
    improvements?: string[]
  }
  // Legacy fields
  scores?: Record<string, number>
}

interface AuditData extends Omit<Audit, 'recommendations'> {
  issues?: string[]
  strengths?: string[]
  priority_fixes?: string[]
  recommendations?: AuditRecommendations | null
}

export default function AdminAuditsPage() {
  const [audits, setAudits] = useState<AuditData[]>([])
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAudit, setSelectedAudit] = useState<AuditData | null>(null)
  const [showNewAudit, setShowNewAudit] = useState(false)
  const [sending, setSending] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [auditsRes, prospectsRes] = await Promise.all([
        fetch("/api/portal/audits").then(r => r.json()),
        fetch("/api/portal/prospects").then(r => r.json()),
      ])
      if (auditsRes.data) setAudits(auditsRes.data)
      if (prospectsRes.data) setProspects(prospectsRes.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
    setLoading(false)
  }

  async function saveAudit(audit: Partial<Audit>) {
    try {
      const res = await fetch("/api/portal/audits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(audit),
      })
      if (res.ok) {
        const data = await res.json()
        setAudits(prev => [data, ...prev])
        setShowNewAudit(false)
      }
    } catch (error) {
      console.error("Error saving audit:", error)
    }
  }

  async function sendAuditEmail(audit: AuditData, email: string) {
    setSending(true)
    try {
      const res = await fetch("/api/portal/audits/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auditId: audit.id, email }),
      })
      if (res.ok) {
        setEmailSent(true)
        setTimeout(() => setEmailSent(false), 3000)
      }
    } catch (error) {
      console.error("Error sending audit:", error)
    }
    setSending(false)
  }

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-display font-bold text-warmWhite mb-6">SEO Intelligence Reports</h1>
        <div className="grid md:grid-cols-2 gap-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-warmWhite">SEO Intelligence Reports</h1>
          <p className="text-sm text-warmWhite/50 mt-1">
            {audits.length} report{audits.length !== 1 ? 's' : ''} • Benchmarked against local markets
          </p>
        </div>
        <button
          onClick={() => setShowNewAudit(true)}
          className="px-4 py-2 text-sm font-medium bg-gold-500 text-navy-950 rounded-lg hover:bg-gold-400 transition-colors"
        >
          + New Report
        </button>
      </div>

      {audits.length === 0 ? (
        <EmptyState
          title="No intelligence reports yet"
          description="Run SEO audits on prospects to benchmark them against their local competition."
        />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {audits.map((audit) => (
            <AuditCard
              key={audit.id}
              audit={audit}
              onClick={() => setSelectedAudit(audit)}
            />
          ))}
        </div>
      )}

      {selectedAudit && (
        <AuditDetailModal
          audit={selectedAudit}
          prospects={prospects}
          onClose={() => setSelectedAudit(null)}
          onSendEmail={sendAuditEmail}
          sending={sending}
          emailSent={emailSent}
        />
      )}

      {showNewAudit && (
        <NewAuditModal
          prospects={prospects}
          onSave={saveAudit}
          onClose={() => setShowNewAudit(false)}
        />
      )}
    </div>
  )
}

/* ============================================
   AUDIT CARD (Grid Item)
   ============================================ */
function AuditCard({ audit, onClick }: { audit: AuditData; onClick: () => void }) {
  const overallScore = calculateOverallScore(audit)
  const status = getMarketPositionStatus(overallScore)

  return (
    <div
      onClick={onClick}
      className="group bg-navy-900/80 border border-navy-700 rounded-2xl p-5 hover:border-gold-500/50 hover:bg-navy-900 transition-all cursor-pointer"
    >
      {/* Top Row: Overall Score */}
      <div className="flex items-center justify-between mb-4">
        <OverallScoreCircle score={overallScore} size="md" />
        <div className={cn(
          "px-2.5 py-1 rounded-full text-xs font-medium",
          status.bg, status.text
        )}>
          {status.label}
        </div>
      </div>

      {/* Firm Info */}
      <h3 className="font-semibold text-warmWhite text-lg mb-1 group-hover:text-gold-400 transition-colors">
        {audit.firm_name}
      </h3>
      {audit.website && (
        <p className="text-sm text-warmWhite/50 mb-3">{audit.website}</p>
      )}

      {/* Quick Summary */}
      <p className="text-sm text-warmWhite/60 line-clamp-2 mb-4">
        {getMarketPositionSummary(audit, overallScore)}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-navy-700">
        <span className="text-xs text-warmWhite/40">
          {new Date(audit.created_at).toLocaleDateString()}
        </span>
        <span className="text-xs text-gold-500 group-hover:text-gold-400">
          View Details →
        </span>
      </div>
    </div>
  )
}

/* ============================================
   OVERALL SCORE CIRCLE (0-100, 50 = market avg)
   ============================================ */
function OverallScoreCircle({ score, size = "md" }: { 
  score: number | null
  size?: "sm" | "md" | "lg"
}) {
  const colors = getOverallScoreColors(score)
  const sizeClasses = {
    sm: "w-12 h-12 text-lg",
    md: "w-16 h-16 text-xl",
    lg: "w-24 h-24 text-3xl"
  }
  const labelSizes = {
    sm: "text-[9px]",
    md: "text-[10px]",
    lg: "text-xs"
  }

  return (
    <div className="flex flex-col items-center">
      <div className={cn(
        "rounded-full flex items-center justify-center font-bold border-2",
        sizeClasses[size],
        colors.border,
        colors.bg,
        colors.text
      )}>
        {score ?? "—"}
      </div>
      <span className={cn("mt-1 text-warmWhite/50 uppercase tracking-wider", labelSizes[size])}>
        Overall
      </span>
    </div>
  )
}

/* ============================================
   POSITION BADGE (-10 to +10)
   ============================================ */
function PositionBadge({ position, showPlus = true }: { position: number; showPlus?: boolean }) {
  const isPositive = position > 0
  const isNeutral = position === 0
  const displayValue = showPlus && isPositive ? `+${position}` : String(position)
  
  return (
    <span className={cn(
      "inline-block px-2.5 py-1 rounded-full text-xs font-semibold min-w-[3rem] text-center",
      isPositive && "bg-emerald-500/20 text-emerald-400",
      isNeutral && "bg-warmWhite/10 text-warmWhite/60",
      !isPositive && !isNeutral && "bg-red-500/20 text-red-400"
    )}>
      {displayValue}
    </span>
  )
}

/* ============================================
   AUDIT DETAIL MODAL
   ============================================ */
function AuditDetailModal({ audit, prospects, onClose, onSendEmail, sending, emailSent }: {
  audit: AuditData
  prospects: Prospect[]
  onClose: () => void
  onSendEmail: (audit: AuditData, email: string) => void
  sending: boolean
  emailSent: boolean
}) {
  const [activeTab, setActiveTab] = useState<"overview" | "findings" | "plan" | "competitors" | "value">("overview")
  const [emailTo, setEmailTo] = useState("")
  const [showEmailForm, setShowEmailForm] = useState(false)

  const prospect = prospects.find(p => p.id === audit.prospect_id)
  const overallScore = calculateOverallScore(audit)
  const competitors = audit.recommendations?.competitors

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-navy-900 border border-navy-700 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-navy-800">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-warmWhite">{audit.firm_name}</h2>
              {audit.website && (
                <a 
                  href={`https://${audit.website}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-sm text-gold-500 hover:underline"
                >
                  {audit.website} ↗
                </a>
              )}
              {/* Location & Practice Area Badge */}
              {(competitors?.city || competitors?.practiceArea) && (
                <div className="mt-2">
                  <span className="inline-block px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                    📍 {competitors.city}{competitors.state ? `, ${competitors.state}` : ""}{competitors.city && competitors.practiceArea ? " | " : ""}{competitors.practiceArea}
                  </span>
                </div>
              )}
            </div>
            
            {/* Overall Score */}
            <OverallScoreCircle score={overallScore} size="lg" />
          </div>

          {/* Market Position Indicator */}
          <div className="mt-4 p-3 bg-navy-800/50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-warmWhite/50">Market Position</span>
              <span className={cn(
                "text-sm font-semibold",
                overallScore && overallScore >= 50 ? "text-emerald-400" : "text-amber-400"
              )}>
                {getMarketPositionLabel(overallScore)}
              </span>
            </div>
            <div className="mt-2 h-2 bg-navy-700 rounded-full relative">
              {/* Center marker (50 = market average) */}
              <div className="absolute left-1/2 top-0 w-0.5 h-2 bg-warmWhite/30 -translate-x-1/2" />
              {/* Score indicator */}
              {overallScore !== null && (
                <div 
                  className={cn(
                    "absolute top-0 w-2 h-2 rounded-full -translate-x-1/2",
                    overallScore >= 50 ? "bg-emerald-400" : "bg-amber-400"
                  )}
                  style={{ left: `${overallScore}%` }}
                />
              )}
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-warmWhite/30">At Risk</span>
              <span className="text-[10px] text-warmWhite/30">Market Avg</span>
              <span className="text-[10px] text-warmWhite/30">Leader</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => setShowEmailForm(!showEmailForm)}
              className="px-4 py-2 text-sm font-medium bg-gold-500 text-navy-950 rounded-lg hover:bg-gold-400 transition-colors"
            >
              📧 Send to Client
            </button>
            <button 
              onClick={onClose}
              className="px-4 py-2 text-sm text-warmWhite/60 hover:text-warmWhite"
            >
              Close
            </button>
          </div>

          {/* Email Form */}
          {showEmailForm && (
            <div className="mt-4 p-4 bg-navy-800/50 rounded-xl">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                  placeholder={prospect?.email || "client@example.com"}
                  className="flex-1 h-10 px-3 text-sm rounded-lg bg-navy-900 border border-navy-600 text-warmWhite"
                />
                <button
                  onClick={() => onSendEmail(audit, emailTo || prospect?.email || "")}
                  disabled={sending || (!emailTo && !prospect?.email)}
                  className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 disabled:opacity-50"
                >
                  {sending ? "..." : emailSent ? "✓ Sent" : "Send"}
                </button>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-1 mt-4 bg-navy-800/50 p-1 rounded-lg">
            {[
              { id: "overview", label: "Overview" },
              { id: "findings", label: "Findings" },
              { id: "plan", label: "Action Plan" },
              { id: "competitors", label: "Competitors" },
              { id: "value", label: "Our Services" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  activeTab === tab.id
                    ? "bg-navy-700 text-warmWhite"
                    : "text-warmWhite/50 hover:text-warmWhite"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "overview" && <OverviewTab audit={audit} />}
          {activeTab === "findings" && <FindingsTab audit={audit} />}
          {activeTab === "plan" && <ActionPlanTab audit={audit} />}
          {activeTab === "competitors" && <CompetitorsTab audit={audit} />}
          {activeTab === "value" && <ValueTab audit={audit} />}
        </div>
      </div>
    </div>
  )
}

/* ============================================
   TAB: OVERVIEW - NEW METHODOLOGY
   ============================================ */
function OverviewTab({ audit }: { audit: AuditData }) {
  const overallScore = calculateOverallScore(audit)
  const metrics = getMetricsBreakdown(audit)
  
  // Identify winning and losing areas
  const winning = metrics.filter(m => m.position > 0).sort((a, b) => b.position - a.position)
  const losing = metrics.filter(m => m.position < 0).sort((a, b) => a.position - b.position)
  const neutral = metrics.filter(m => m.position === 0)
  
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-gold-500/10 border border-gold-500/30 rounded-xl p-5">
        <p className="text-warmWhite/80 leading-relaxed">
          {getMarketPositionSummary(audit, overallScore)}
        </p>
      </div>

      {/* Market Position Breakdown */}
      <div className="bg-navy-800/50 rounded-xl p-5">
        <h4 className="text-sm font-semibold text-warmWhite mb-4">Market Position by Category</h4>
        <p className="text-xs text-warmWhite/50 mb-4">
          0 = market average • Positive = ahead • Negative = behind
        </p>
        
        <div className="space-y-3">
          {metrics.map((metric) => (
            <div key={metric.id} className="flex items-center gap-3">
              <div className="w-28 text-sm text-warmWhite/70">{metric.name}</div>
              <PositionBadge position={metric.position} />
              <div className="flex-1">
                {/* Bar visualization */}
                <div className="h-2 bg-navy-700 rounded-full relative">
                  {/* Center line */}
                  <div className="absolute left-1/2 top-0 w-px h-2 bg-warmWhite/20" />
                  {/* Position bar */}
                  {metric.position !== 0 && (
                    <div 
                      className={cn(
                        "absolute top-0 h-2 rounded-full",
                        metric.position > 0 ? "bg-emerald-500 left-1/2" : "bg-red-500 right-1/2"
                      )}
                      style={{ 
                        width: `${Math.abs(metric.position) * 5}%`,
                        ...(metric.position < 0 && { right: '50%', left: 'auto' })
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Winning vs Losing Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
          <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
            ✓ Winning
          </h4>
          {winning.length > 0 ? (
            <ul className="space-y-1.5">
              {winning.map(m => (
                <li key={m.id} className="text-sm text-warmWhite/70 flex justify-between">
                  <span>{m.name}</span>
                  <span className="text-emerald-400 font-medium">+{m.position}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-warmWhite/40">No areas above market</p>
          )}
        </div>
        
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-3">
            ✗ Needs Work
          </h4>
          {losing.length > 0 ? (
            <ul className="space-y-1.5">
              {losing.map(m => (
                <li key={m.id} className="text-sm text-warmWhite/70 flex justify-between">
                  <span>{m.name}</span>
                  <span className="text-red-400 font-medium">{m.position}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-warmWhite/40">No critical gaps</p>
          )}
        </div>
      </div>

      {/* What the Score Means */}
      <div className="bg-navy-800/50 rounded-xl p-5">
        <h4 className="text-sm font-semibold text-warmWhite mb-3">Understanding Your Score</h4>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-emerald-500" />
            <span className="text-warmWhite/60">85-100: Market Leader</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-emerald-500/60" />
            <span className="text-warmWhite/60">70-84: Above Market</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-amber-500" />
            <span className="text-warmWhite/60">50-69: At Market</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-red-500" />
            <span className="text-warmWhite/60">0-49: Below Market</span>
          </div>
        </div>
        <p className="text-xs text-warmWhite/40 mt-3">
          50 = market average. We benchmark you against the top 5 competitors in your city and practice area.
        </p>
      </div>
    </div>
  )
}

/* ============================================
   TAB: FINDINGS
   ============================================ */
function FindingsTab({ audit }: { audit: AuditData }) {
  const findings = audit.recommendations?.findings
  const metrics = getMetricsBreakdown(audit)
  
  // Generate findings from metrics if not explicitly provided
  const strengths = findings?.strengths || metrics
    .filter(m => m.position > 0)
    .map(m => m.analysis || `${m.name}: Performing above market average (+${m.position})`)
  
  const improvements = findings?.improvements || metrics
    .filter(m => m.position < 0)
    .map(m => m.analysis || `${m.name}: Below market average (${m.position})`)

  return (
    <div className="space-y-6">
      {/* Strengths */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-5">
        <h4 className="text-sm font-semibold text-emerald-400 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Where You&apos;re Winning
        </h4>
        {strengths.length > 0 ? (
          <ul className="space-y-2">
            {strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-warmWhite/70">
                <span className="text-emerald-400 mt-0.5">✓</span>
                {s}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-warmWhite/50">Analysis pending.</p>
        )}
      </div>

      {/* Areas for Improvement */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
        <h4 className="text-sm font-semibold text-red-400 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-400" />
          Where to Focus
        </h4>
        {improvements.length > 0 ? (
          <ul className="space-y-2">
            {improvements.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-warmWhite/70">
                <span className="text-red-400 mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-warmWhite/50">No critical gaps identified.</p>
        )}
      </div>
    </div>
  )
}

/* ============================================
   TAB: ACTION PLAN
   ============================================ */
function ActionPlanTab({ audit }: { audit: AuditData }) {
  const overallScore = calculateOverallScore(audit)
  const metrics = getMetricsBreakdown(audit)
  
  // Sort by most negative (biggest opportunity)
  const prioritized = [...metrics].sort((a, b) => a.position - b.position)
  
  // Generate action plan based on weakest areas
  const plan = generateActionPlan(prioritized, overallScore)

  return (
    <div className="space-y-4">
      {plan.map((phase, i) => (
        <div 
          key={i}
          className={cn("rounded-xl p-5 border", phase.colors)}
        >
          <h4 className={cn("text-sm font-semibold mb-3 flex items-center gap-2", phase.titleColor)}>
            {phase.icon} {phase.title}
          </h4>
          <ul className="space-y-2">
            {phase.items.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-sm text-warmWhite/70">
                <span className={cn("mt-1 w-5 h-5 rounded-full text-xs flex items-center justify-center font-medium", phase.numberBg)}>
                  {j + 1}
                </span>
                <div>
                  <span className="font-medium text-warmWhite">{item.action}</span>
                  {item.metric && (
                    <span className="text-warmWhite/50"> — targeting {item.metric}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/* ============================================
   TAB: COMPETITORS
   ============================================ */
function CompetitorsTab({ audit }: { audit: AuditData }) {
  const competitors = audit.recommendations?.competitors
  const overallScore = calculateOverallScore(audit) || 0
  
  const city = competitors?.city || "Your City"
  const state = competitors?.state || ""
  const practiceArea = competitors?.practiceArea || "Your Practice Area"
  const marketAverage = competitors?.marketAverage || 74
  
  const topFive: CompetitorData[] = competitors?.topFive || [
    { rank: 1, name: "Top Competitor #1", score: 85, keyStrength: "Strong domain authority" },
    { rank: 2, name: "Top Competitor #2", score: 80, keyStrength: "Excellent review volume" },
    { rank: 3, name: "Top Competitor #3", score: 75, keyStrength: "Active content strategy" },
    { rank: 4, name: "Top Competitor #4", score: 72, keyStrength: "Good local SEO" },
    { rank: 5, name: "Top Competitor #5", score: 70, keyStrength: "Basic optimization" },
  ]
  
  // Calculate where client would rank
  const clientRank = topFive.filter(c => overallScore >= c.score).length + 1
  const inTopFive = clientRank <= 5
  const gapToFive = topFive[4] ? Math.max(0, topFive[4].score - overallScore) : 0

  return (
    <div className="space-y-6">
      {/* Market Position Header */}
      <div className="bg-navy-800/50 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-semibold text-warmWhite">Your Market Position</h4>
            <p className="text-xs text-warmWhite/50 mt-1">
              📍 {city}{state ? `, ${state}` : ""} | {practiceArea}
            </p>
          </div>
          <div className={cn(
            "px-3 py-1.5 rounded-full text-sm font-medium",
            inTopFive ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
          )}>
            {inTopFive ? `#${clientRank}` : "Below Top 5"}
          </div>
        </div>
        
        {!inTopFive && gapToFive > 0 && (
          <p className="text-sm text-warmWhite/60">
            You need <span className="text-gold-400 font-semibold">+{gapToFive} points</span> to crack the top 5
          </p>
        )}
      </div>

      {/* Competitor Rankings Table */}
      <div className="bg-navy-800/50 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-navy-700">
              <th className="px-5 py-3 text-left text-xs font-medium text-warmWhite/50 uppercase tracking-wider">Rank</th>
              <th className="px-5 py-3 text-left text-xs font-medium text-warmWhite/50 uppercase tracking-wider">Firm</th>
              <th className="px-5 py-3 text-right text-xs font-medium text-warmWhite/50 uppercase tracking-wider">Score</th>
            </tr>
          </thead>
          <tbody>
            {topFive.map((competitor) => (
              <tr key={competitor.rank} className="border-b border-navy-700/50">
                <td className="px-5 py-3">
                  <span className="w-6 h-6 rounded-full bg-navy-700 flex items-center justify-center text-xs text-warmWhite/70">
                    {competitor.rank}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="text-sm text-warmWhite">{competitor.name}</div>
                  {competitor.keyStrength && (
                    <div className="text-xs text-warmWhite/40">{competitor.keyStrength}</div>
                  )}
                </td>
                <td className="px-5 py-3 text-right">
                  <span className="text-sm font-semibold text-warmWhite">{competitor.score}</span>
                </td>
              </tr>
            ))}
            {/* Client row */}
            <tr className="bg-gold-500/10">
              <td className="px-5 py-3">
                <span className="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center text-xs text-navy-950 font-bold">
                  {inTopFive ? clientRank : "—"}
                </span>
              </td>
              <td className="px-5 py-3">
                <div className="text-sm text-gold-400 font-semibold">{audit.firm_name} (You)</div>
              </td>
              <td className="px-5 py-3 text-right">
                <span className="text-sm font-bold text-gold-400">{overallScore}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* What They're Doing */}
      {competitors?.doingWell && competitors.doingWell.length > 0 && (
        <div className="bg-navy-800/50 rounded-xl p-5">
          <h4 className="text-sm font-semibold text-warmWhite mb-3">What Top Competitors Do Well</h4>
          <ul className="space-y-2">
            {competitors.doingWell.map((item, i) => (
              <li key={i} className="text-sm text-warmWhite/60 flex items-start gap-2">
                <span className="text-emerald-400">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/* ============================================
   TAB: OUR SERVICES (Value Prop)
   ============================================ */
function ValueTab({ audit }: { audit: AuditData }) {
  const roadmap = getPersonalizedRoadmap(audit)
  
  return (
    <div className="space-y-6">
      {/* Personalized Header */}
      <div className="bg-navy-800/50 rounded-xl p-5">
        <h4 className="text-sm font-semibold text-warmWhite mb-2">
          Your Custom Growth Plan
        </h4>
        <p className="text-sm text-warmWhite/60">
          Based on your Intelligence Report, here&apos;s exactly what we&apos;ll do for <span className="text-gold-400">{audit.firm_name}</span> each month:
        </p>
      </div>

      {/* Month-by-Month Roadmap */}
      {roadmap.map((month, i) => (
        <div key={i} className="bg-gold-500/10 border border-gold-500/30 rounded-xl p-5">
          <h4 className="text-sm font-semibold text-gold-400 mb-4 flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-gold-500 text-navy-950 flex items-center justify-center text-xs font-bold">
              {i + 1}
            </span>
            {month.title}
          </h4>
          <div className="space-y-3">
            {month.tasks.map((task, j) => (
              <div key={j} className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 flex-shrink-0" />
                <div>
                  <p className="font-medium text-warmWhite text-sm">{task.name}</p>
                  <p className="text-xs text-warmWhite/60">{task.detail}</p>
                </div>
              </div>
            ))}
          </div>
          {month.outcome && (
            <div className="mt-4 pt-3 border-t border-gold-500/20">
              <p className="text-xs text-gold-400">
                <strong>Expected Outcome:</strong> {month.outcome}
              </p>
            </div>
          )}
        </div>
      ))}

      {/* Ongoing */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5">
        <h4 className="text-sm font-semibold text-emerald-400 mb-3">Ongoing (Every Month)</h4>
        <div className="grid grid-cols-2 gap-3 text-sm text-warmWhite/70">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span> Performance monitoring
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span> Ranking tracking
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span> Monthly report + call
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">✓</span> Strategy adjustments
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <a 
          // TODO: Phase 3 — read booking link from firmConfig
          href="/contact"
          className="inline-block px-6 py-3 bg-gold-500 text-navy-950 font-semibold rounded-lg hover:bg-gold-400 transition-colors"
        >
          Schedule a Free Consultation
        </a>
      </div>
    </div>
  )
}

/* ============================================
   NEW AUDIT MODAL
   ============================================ */
function NewAuditModal({ prospects, onSave, onClose }: {
  prospects: Prospect[]
  onSave: (audit: Partial<Audit>) => void
  onClose: () => void
}) {
  const [form, setForm] = useState<Partial<Audit>>({
    firm_name: "",
    website: "",
    audit_type: "full",
    seo_score: undefined,
    geo_score: undefined,
    summary: "",
    full_report: "",
  })

  const handleProspectSelect = (prospectId: string) => {
    const prospect = prospects.find(p => p.id === prospectId)
    if (prospect) {
      setForm(prev => ({
        ...prev,
        prospect_id: prospectId,
        firm_name: prospect.firm_name,
        website: prospect.website || "",
      }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div 
        className="bg-navy-900 border border-navy-700 rounded-2xl w-full max-w-md"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-5 border-b border-navy-800">
          <h2 className="text-lg font-bold text-warmWhite">New Intelligence Report</h2>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(form) }} className="p-5 space-y-4">
          <div>
            <label className="block text-xs text-warmWhite/60 mb-1">Link to Prospect</label>
            <select
              onChange={(e) => handleProspectSelect(e.target.value)}
              className="w-full h-10 px-3 text-sm rounded-lg bg-navy-800 border border-navy-700 text-warmWhite"
            >
              <option value="">— Select —</option>
              {prospects.map(p => (
                <option key={p.id} value={p.id}>{p.firm_name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-warmWhite/60 mb-1">Firm Name *</label>
              <input
                type="text"
                value={form.firm_name || ""}
                onChange={(e) => setForm({ ...form, firm_name: e.target.value })}
                required
                className="w-full h-10 px-3 text-sm rounded-lg bg-navy-800 border border-navy-700 text-warmWhite"
              />
            </div>
            <div>
              <label className="block text-xs text-warmWhite/60 mb-1">Website</label>
              <input
                type="text"
                value={form.website || ""}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="w-full h-10 px-3 text-sm rounded-lg bg-navy-800 border border-navy-700 text-warmWhite"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-warmWhite/60 mb-1">Summary</label>
            <textarea
              value={form.summary || ""}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 text-sm rounded-lg bg-navy-800 border border-navy-700 text-warmWhite resize-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-warmWhite/60 hover:text-warmWhite">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium bg-gold-500 text-navy-950 rounded-lg hover:bg-gold-400">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ============================================
   HELPER FUNCTIONS - NEW METHODOLOGY
   ============================================ */

// Metric weights
const METRIC_WEIGHTS = {
  seo: 0.20,
  geo: 0.15,
  content: 0.20,
  social: 0.10,
  reputation: 0.20,
  video: 0.05,
  leads: 0.10,
}

// Calculate overall score from metrics (0-100 where 50 = market average)
function calculateOverallScore(audit: AuditData): number | null {
  const metrics = audit.recommendations?.metrics
  
  if (metrics) {
    // New methodology: use position scores
    const weightedSum = 
      (metrics.seo?.position || 0) * METRIC_WEIGHTS.seo +
      (metrics.geo?.position || 0) * METRIC_WEIGHTS.geo +
      (metrics.content?.position || 0) * METRIC_WEIGHTS.content +
      (metrics.social?.position || 0) * METRIC_WEIGHTS.social +
      (metrics.reputation?.position || 0) * METRIC_WEIGHTS.reputation +
      (metrics.video?.position || 0) * METRIC_WEIGHTS.video +
      (metrics.leads?.position || 0) * METRIC_WEIGHTS.leads
    
    // Convert to 0-100 scale where 50 = market average
    return Math.round(50 + (weightedSum * 5))
  }
  
  // Fallback: use old seo_score/geo_score as raw scores and assume they're around market
  if (audit.seo_score !== null || audit.geo_score !== null) {
    const avg = ((audit.seo_score || 0) + (audit.geo_score || 0)) / 2
    return Math.round(avg)
  }
  
  return null
}

// Get metrics breakdown for display
function getMetricsBreakdown(audit: AuditData): {
  id: string
  name: string
  position: number
  weight: number
  analysis?: string
}[] {
  const metrics = audit.recommendations?.metrics
  
  if (metrics) {
    return [
      { id: 'seo', name: 'SEO', position: metrics.seo?.position || 0, weight: METRIC_WEIGHTS.seo, analysis: metrics.seo?.analysis },
      { id: 'geo', name: 'AI Search (GEO)', position: metrics.geo?.position || 0, weight: METRIC_WEIGHTS.geo, analysis: metrics.geo?.analysis },
      { id: 'content', name: 'Content', position: metrics.content?.position || 0, weight: METRIC_WEIGHTS.content, analysis: metrics.content?.analysis },
      { id: 'social', name: 'Social Media', position: metrics.social?.position || 0, weight: METRIC_WEIGHTS.social, analysis: metrics.social?.analysis },
      { id: 'reputation', name: 'Reputation', position: metrics.reputation?.position || 0, weight: METRIC_WEIGHTS.reputation, analysis: metrics.reputation?.analysis },
      { id: 'video', name: 'Video', position: metrics.video?.position || 0, weight: METRIC_WEIGHTS.video, analysis: metrics.video?.analysis },
      { id: 'leads', name: 'Lead Capture', position: metrics.leads?.position || 0, weight: METRIC_WEIGHTS.leads, analysis: metrics.leads?.analysis },
    ]
  }
  
  // Fallback: convert old scores to position estimates
  const seoPos = audit.seo_score ? Math.round((audit.seo_score - 70) / 3) : 0
  const geoPos = audit.geo_score ? Math.round((audit.geo_score - 70) / 3) : 0
  
  return [
    { id: 'seo', name: 'SEO', position: Math.max(-10, Math.min(10, seoPos)), weight: METRIC_WEIGHTS.seo },
    { id: 'geo', name: 'AI Search (GEO)', position: Math.max(-10, Math.min(10, geoPos)), weight: METRIC_WEIGHTS.geo },
    { id: 'content', name: 'Content', position: 0, weight: METRIC_WEIGHTS.content },
    { id: 'social', name: 'Social Media', position: 0, weight: METRIC_WEIGHTS.social },
    { id: 'reputation', name: 'Reputation', position: 0, weight: METRIC_WEIGHTS.reputation },
    { id: 'video', name: 'Video', position: 0, weight: METRIC_WEIGHTS.video },
    { id: 'leads', name: 'Lead Capture', position: 0, weight: METRIC_WEIGHTS.leads },
  ]
}

// Get overall score colors
function getOverallScoreColors(score: number | null) {
  if (score === null) return { 
    text: "text-warmWhite/40", 
    bg: "bg-navy-800", 
    border: "border-navy-700" 
  }
  if (score >= 85) return { 
    text: "text-emerald-400", 
    bg: "bg-emerald-500/10", 
    border: "border-emerald-500/30" 
  }
  if (score >= 70) return { 
    text: "text-emerald-400", 
    bg: "bg-emerald-500/10", 
    border: "border-emerald-500/30" 
  }
  if (score >= 50) return { 
    text: "text-amber-400", 
    bg: "bg-amber-500/10", 
    border: "border-amber-500/30" 
  }
  return { 
    text: "text-red-400", 
    bg: "bg-red-500/10", 
    border: "border-red-500/30" 
  }
}

// Get market position status for card
function getMarketPositionStatus(score: number | null) {
  if (score === null) return { label: "Pending", bg: "bg-navy-700", text: "text-warmWhite/60" }
  if (score >= 85) return { label: "Market Leader", bg: "bg-emerald-500/20", text: "text-emerald-400" }
  if (score >= 70) return { label: "Above Market", bg: "bg-emerald-500/20", text: "text-emerald-400" }
  if (score >= 50) return { label: "At Market", bg: "bg-amber-500/20", text: "text-amber-400" }
  if (score >= 30) return { label: "Below Market", bg: "bg-orange-500/20", text: "text-orange-400" }
  return { label: "At Risk", bg: "bg-red-500/20", text: "text-red-400" }
}

// Get market position label
function getMarketPositionLabel(score: number | null): string {
  if (score === null) return "Pending"
  if (score >= 85) return "Market Leader"
  if (score >= 70) return "Above Market"
  if (score >= 50) return "At Market"
  if (score >= 30) return "Below Market"
  return "At Risk"
}

// Get summary text based on market position
function getMarketPositionSummary(audit: AuditData, score: number | null): string {
  if (audit.summary) return audit.summary
  
  if (score === null) return "Audit pending analysis."
  
  const metrics = getMetricsBreakdown(audit)
  const winning = metrics.filter(m => m.position > 0).map(m => m.name)
  const losing = metrics.filter(m => m.position < 0).map(m => m.name)
  
  if (score >= 85) {
    return `You're a market leader in ${audit.recommendations?.competitors?.city || 'your city'}. ${winning.length > 0 ? `Strong performance in ${winning.slice(0, 2).join(' and ')}.` : ''} Focus on maintaining your position and expanding into new opportunities.`
  }
  if (score >= 70) {
    return `You're above market average. ${winning.length > 0 ? `Winning on ${winning.slice(0, 2).join(' and ')}.` : ''} ${losing.length > 0 ? `Improve ${losing[0]} to move into market leadership.` : ''}`
  }
  if (score >= 50) {
    return `You're competitive but not standing out. ${winning.length > 0 ? `${winning[0]} is your strongest area.` : ''} ${losing.length > 0 ? `Focus on ${losing.slice(0, 2).join(' and ')} to differentiate from competitors.` : ''}`
  }
  if (score >= 30) {
    return `You're falling behind competitors. ${losing.length > 0 ? `Priority gaps: ${losing.slice(0, 2).join(', ')}.` : ''} Focused improvements can close the gap within 90 days.`
  }
  return `Significant gaps exist. ${losing.length > 0 ? `Critical areas: ${losing.slice(0, 3).join(', ')}.` : ''} A structured improvement plan is essential.`
}

// Generate action plan based on weak areas
function generateActionPlan(prioritizedMetrics: { id: string; name: string; position: number }[], overallScore: number | null) {
  const weakest = prioritizedMetrics.filter(m => m.position < 0)
  
  return [
    {
      title: "Month 1: Foundation & Quick Wins",
      icon: "🔧",
      colors: "bg-red-500/10 border-red-500/20",
      titleColor: "text-red-400",
      numberBg: "bg-red-500/20 text-red-400",
      items: [
        { action: "Technical audit and critical fixes", metric: weakest[0]?.name },
        { action: "Google Business Profile optimization", metric: "Local SEO" },
        { action: "Schema markup implementation", metric: "GEO" },
      ]
    },
    {
      title: "Month 2: Content & Visibility",
      icon: "📝",
      colors: "bg-amber-500/10 border-amber-500/20",
      titleColor: "text-amber-400",
      numberBg: "bg-amber-500/20 text-amber-400",
      items: [
        { action: "Practice area page expansion", metric: "Content" },
        { action: "FAQ sections for AI visibility", metric: "GEO" },
        { action: weakest[1] ? `Address ${weakest[1].name} gap` : "Competitor analysis", metric: weakest[1]?.name },
      ]
    },
    {
      title: "Month 3: Authority & Growth",
      icon: "📈",
      colors: "bg-emerald-500/10 border-emerald-500/20",
      titleColor: "text-emerald-400",
      numberBg: "bg-emerald-500/20 text-emerald-400",
      items: [
        { action: "Review generation campaign", metric: "Reputation" },
        { action: "Citation building (legal directories)", metric: "SEO" },
        { action: "Performance tracking setup", metric: undefined },
      ]
    }
  ]
}

// Personalized roadmap (reused from original)
interface RoadmapMonth {
  title: string
  tasks: { name: string; detail: string }[]
  outcome?: string
}

function getPersonalizedRoadmap(audit: AuditData): RoadmapMonth[] {
  const overallScore = calculateOverallScore(audit)
  const metrics = getMetricsBreakdown(audit)
  const weakest = metrics.filter(m => m.position < 0).sort((a, b) => a.position - b.position)
  
  // Low score - build foundation
  if (overallScore !== null && overallScore < 40) {
    return [
      {
        title: "Month 1: Foundation",
        tasks: [
          { name: "Technical Audit", detail: "Fix critical issues blocking search visibility" },
          { name: "Google Business Profile", detail: "Claim and fully optimize your listing" },
          { name: "Basic On-Page SEO", detail: "Optimize titles, headers, and meta descriptions" },
        ],
        outcome: "Site becomes visible to search engines and AI assistants"
      },
      {
        title: "Month 2: Content & Structure",
        tasks: [
          { name: "Practice Area Pages", detail: "Create dedicated pages for each service" },
          { name: "Schema Implementation", detail: "Add structured data for rich results" },
          { name: "FAQ Development", detail: "Target common client questions" },
        ],
        outcome: "20-30 point score improvement"
      },
      {
        title: "Month 3: Authority Building",
        tasks: [
          { name: "Review Campaign", detail: "Systematic approach to earning Google reviews" },
          { name: "Citation Building", detail: "Submit to 20+ legal directories" },
          { name: "AI Optimization", detail: "Structure content for AI recommendations" },
        ],
        outcome: "Competitive foundation established"
      }
    ]
  }
  
  // Moderate score - targeted improvements
  if (overallScore !== null && overallScore < 70) {
    const focus1 = weakest[0]?.name || "Weakest Area"
    const focus2 = weakest[1]?.name || "Second Priority"
    
    return [
      {
        title: "Month 1: Targeted Fixes",
        tasks: [
          { name: `${focus1} Optimization`, detail: `Address your biggest gap vs competitors` },
          { name: "Technical Fine-Tuning", detail: "Core Web Vitals and speed optimization" },
          { name: "GBP Enhancement", detail: "Weekly posts, photos, and Q&A responses" },
        ],
        outcome: "10-15 point improvement in weakest areas"
      },
      {
        title: "Month 2: Content Push",
        tasks: [
          { name: `${focus2} Strategy`, detail: "Close the gap on your second priority area" },
          { name: "AI Visibility", detail: "Optimize for ChatGPT/Claude recommendations" },
          { name: "Internal Linking", detail: "Build hub-and-spoke content structure" },
        ],
        outcome: "Improved rankings and AI visibility"
      },
      {
        title: "Month 3: Competitive Edge",
        tasks: [
          { name: "Review Acceleration", detail: "Push for 5+ new reviews per month" },
          { name: "Content Differentiation", detail: "Create unique resources competitors lack" },
          { name: "Performance Analysis", detail: "Measure gains and plan next quarter" },
        ],
        outcome: "Above-market position established"
      }
    ]
  }
  
  // High score - optimization and expansion
  return [
    {
      title: "Month 1: Competitive Analysis",
      tasks: [
        { name: "Market Position Audit", detail: "Deep dive on top 5 competitors" },
        { name: "Opportunity Identification", detail: "Find gaps competitors are missing" },
        { name: "Technical Edge", detail: "Cutting-edge optimizations" },
      ],
      outcome: "Clear roadmap to market dominance"
    },
    {
      title: "Month 2: Differentiation",
      tasks: [
        { name: "Thought Leadership", detail: "Original content that sets you apart" },
        { name: "Advanced Schema", detail: "Rich results and AI optimization" },
        { name: "Conversion Optimization", detail: "Improve lead capture efficiency" },
      ],
      outcome: "Distinguished market position"
    },
    {
      title: "Month 3: Scale & Protect",
      tasks: [
        { name: "Reputation Monitoring", detail: "Set up alerts and response protocols" },
        { name: "New Market Testing", detail: "Pilot expansion opportunities" },
        { name: "Quarterly Strategy", detail: "Plan next phase based on data" },
      ],
      outcome: "Sustainable competitive advantage"
    }
  ]
}
