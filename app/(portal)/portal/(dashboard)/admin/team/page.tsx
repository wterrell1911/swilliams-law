"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { StatusBadge } from "@/components/portal/StatusBadge"
import { TypeBadge } from "@/components/portal/TypeBadge"
import { CardSkeleton } from "@/components/portal/LoadingSkeleton"
import { cn } from "@/lib/utils"
import type { DeliverableWithClient } from "@/lib/types/portal"

interface TeamMember {
  name: string
  deliverables: DeliverableWithClient[]
  active: number
  overdue: number
}

export default function AdminTeamPage() {
  const supabase = createClient()
  const [deliverables, setDeliverables] = useState<DeliverableWithClient[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from("deliverables")
        .select("*, profiles(firm_name, contact_name, email)")
        .not("assigned_to", "is", null)
        .order("due_date", { ascending: true })
      if (data) setDeliverables(data as DeliverableWithClient[])
      setLoading(false)
    }
    fetchData()
  }, [supabase])

  const now = new Date()
  const teamMap = deliverables.reduce<Record<string, TeamMember>>((acc, d) => {
    const name = d.assigned_to || "Unassigned"
    if (!acc[name]) {
      acc[name] = { name, deliverables: [], active: 0, overdue: 0 }
    }
    acc[name].deliverables.push(d)
    if (!["published", "rejected"].includes(d.status)) {
      acc[name].active++
      if (d.due_date && new Date(d.due_date) < now) {
        acc[name].overdue++
      }
    }
    return acc
  }, {})

  const team = Object.values(teamMap).sort((a, b) => b.active - a.active)

  function capacityColor(active: number): string {
    if (active <= 4) return "bg-green-500"
    if (active <= 7) return "bg-gold-500"
    return "bg-red-500"
  }

  function capacityLabel(active: number): string {
    if (active <= 4) return "Good"
    if (active <= 7) return "Busy"
    return "Overloaded"
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-display font-bold text-warmWhite mb-6">Team Workload</h1>
        <div className="grid gap-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-display font-bold text-warmWhite mb-6">Team Workload</h1>

      {team.length === 0 ? (
        <div className="text-center py-16 text-warmWhite/40">
          <p>No assigned deliverables yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {team.map((member) => (
            <div key={member.name} className="bg-navy-900 border border-navy-700 rounded-xl">
              <div className="p-4 border-b border-navy-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-navy-700 flex items-center justify-center text-sm font-bold text-warmWhite">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-warmWhite">{member.name}</p>
                    <p className="text-xs text-warmWhite/40">
                      {member.active} active
                      {member.overdue > 0 && <span className="text-red-400 ml-2">{member.overdue} overdue</span>}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", capacityColor(member.active))} />
                  <span className="text-xs text-warmWhite/50">{capacityLabel(member.active)}</span>
                </div>
              </div>
              <div className="divide-y divide-navy-800">
                {member.deliverables
                  .filter((d) => !["published", "rejected"].includes(d.status))
                  .map((d) => {
                    const isOverdue = d.due_date && new Date(d.due_date) < now
                    return (
                      <div key={d.id} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm text-warmWhite truncate">{d.title}</p>
                          <p className="text-xs text-warmWhite/40">{d.profiles?.firm_name}</p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <TypeBadge type={d.type} />
                          {d.due_date && (
                            <span className={cn("text-xs", isOverdue ? "text-red-400" : "text-warmWhite/40")}>
                              {new Date(d.due_date).toLocaleDateString()}
                            </span>
                          )}
                          <StatusBadge status={d.status} />
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
