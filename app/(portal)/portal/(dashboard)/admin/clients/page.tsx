"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { EmptyState } from "@/components/portal/EmptyState"
import { CardSkeleton } from "@/components/portal/LoadingSkeleton"
import type { Profile } from "@/lib/types/portal"

export default function AdminClientsPage() {
  const supabase = createClient()
  const [clients, setClients] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [showAdd, setShowAdd] = useState(false)
  const [newClient, setNewClient] = useState({ firm_name: "", contact_name: "", email: "", phone: "", dropbox_folder: "" })
  const [addLoading, setAddLoading] = useState(false)
  const [addMessage, setAddMessage] = useState("")

  useEffect(() => {
    fetchClients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchClients() {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "client")
      .order("created_at", { ascending: false })
    if (data) setClients(data as Profile[])
    setLoading(false)
  }

  async function handleAddClient(e: React.FormEvent) {
    e.preventDefault()
    setAddLoading(true)
    setAddMessage("")

    const res = await fetch("/api/portal/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newClient),
    })

    const data = await res.json()
    if (data.success) {
      setAddMessage("Client created and invite sent!")
      setNewClient({ firm_name: "", contact_name: "", email: "", phone: "", dropbox_folder: "" })
      fetchClients()
      setTimeout(() => {
        setShowAdd(false)
        setAddMessage("")
      }, 2000)
    } else {
      setAddMessage(data.message || "Failed to create client")
    }
    setAddLoading(false)
  }

  const filtered = clients.filter((c) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      c.firm_name?.toLowerCase().includes(q) ||
      c.contact_name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q)
    )
  })

  const inputClass = "w-full h-10 px-3 text-sm rounded-lg bg-navy-800 border border-navy-600 text-warmWhite placeholder:text-warmWhite/30 focus:outline-none focus:ring-1 focus:ring-gold-500"

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-display font-bold text-warmWhite mb-6">Clients</h1>
        <div className="space-y-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-display font-bold text-warmWhite">Clients</h1>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-4 py-2 text-sm font-medium bg-gold-500 hover:bg-gold-400 text-navy-950 rounded-lg transition-colors w-fit"
        >
          {showAdd ? "Cancel" : "Add Client"}
        </button>
      </div>

      {/* Add client form */}
      {showAdd && (
        <div className="bg-navy-900 border border-navy-700 rounded-xl p-6 mb-6">
          <h2 className="text-sm font-semibold text-warmWhite mb-4">New Client</h2>
          <form onSubmit={handleAddClient} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Firm name" required value={newClient.firm_name} onChange={(e) => setNewClient({ ...newClient, firm_name: e.target.value })} className={inputClass} />
            <input type="text" placeholder="Contact name" required value={newClient.contact_name} onChange={(e) => setNewClient({ ...newClient, contact_name: e.target.value })} className={inputClass} />
            <input type="email" placeholder="Email" required value={newClient.email} onChange={(e) => setNewClient({ ...newClient, email: e.target.value })} className={inputClass} />
            <input type="tel" placeholder="Phone" value={newClient.phone} onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })} className={inputClass} />
            <input type="text" placeholder="Dropbox folder path (optional)" value={newClient.dropbox_folder} onChange={(e) => setNewClient({ ...newClient, dropbox_folder: e.target.value })} className={inputClass + " sm:col-span-2"} />
            <div className="sm:col-span-2 flex items-center gap-4">
              <button type="submit" disabled={addLoading} className="px-6 py-2 text-sm font-medium bg-gold-500 hover:bg-gold-400 text-navy-950 rounded-lg transition-colors disabled:opacity-50">
                {addLoading ? "Creating..." : "Create & Send Invite"}
              </button>
              {addMessage && <span className="text-sm text-warmWhite/60">{addMessage}</span>}
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <input
        type="text"
        placeholder="Search clients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-80 h-10 px-4 text-sm rounded-lg bg-navy-800 border border-navy-700 text-warmWhite placeholder:text-warmWhite/30 focus:outline-none focus:ring-1 focus:ring-gold-500 mb-4"
      />

      {filtered.length === 0 ? (
        <EmptyState
          title="No clients found"
          description={search ? "No clients match your search." : "Add your first client to get started."}
        />
      ) : (
        <div className="bg-navy-900 border border-navy-700 rounded-xl divide-y divide-navy-800">
          {filtered.map((c) => (
            <div key={c.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-navy-800/50 transition-colors">
              <div>
                <p className="text-sm font-medium text-warmWhite">{c.firm_name || "Unnamed"}</p>
                <p className="text-xs text-warmWhite/50">
                  {c.contact_name} — {c.email}
                  {c.phone && ` — ${c.phone}`}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-warmWhite/40">
                <span>Joined {new Date(c.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
