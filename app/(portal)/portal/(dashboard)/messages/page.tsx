"use client"

import { useEffect, useState, useRef } from "react"
import { MessageSkeleton } from "@/components/portal/LoadingSkeleton"
import { cn } from "@/lib/utils"
import type { Message } from "@/lib/types/portal"

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState("")
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  async function fetchMessages() {
    try {
      const res = await fetch("/api/portal/messages")
      const json = await res.json()
      if (json.data) {
        // Sort ascending for chat display
        const sorted = (json.data as Message[]).sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        )
        setMessages(sorted)
      }
    } catch (error) {
      console.error("Error fetching messages:", error)
    }
    setLoading(false)
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || sending) return

    setSending(true)
    const content = input.trim()
    setInput("")

    try {
      const res = await fetch("/api/portal/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sender_type: "admin",
          sender_name: "Admin",
          content,
        }),
      })

      if (res.ok) {
        const json = await res.json()
        if (json.data) {
          setMessages((prev) => [...prev, json.data])
          setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
        }
      }
    } catch (error) {
      console.error("Error sending message:", error)
    }
    setSending(false)
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-display font-bold text-warmWhite mb-6">Messages</h1>
        <div className="space-y-4">
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <h1 className="text-2xl font-display font-bold text-warmWhite mb-4">Messages</h1>

      <div className="flex-1 bg-navy-900 border border-navy-700 rounded-xl overflow-hidden flex flex-col">
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <p className="text-center text-warmWhite/40 py-8">No messages yet</p>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "max-w-[80%] rounded-xl px-4 py-3",
                  msg.sender_type === "admin"
                    ? "ml-auto bg-gold-500/10 text-warmWhite"
                    : "bg-navy-800 text-warmWhite"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-warmWhite/60">
                    {msg.sender_name || msg.sender_type}
                  </span>
                  <span className="text-xs text-warmWhite/40">
                    {new Date(msg.created_at).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <form onSubmit={sendMessage} className="border-t border-navy-700 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 h-10 px-4 rounded-lg bg-navy-800 border border-navy-700 text-warmWhite placeholder:text-warmWhite/40 focus:outline-none focus:ring-1 focus:ring-gold-500"
              disabled={sending}
            />
            <button
              type="submit"
              disabled={!input.trim() || sending}
              className="px-4 h-10 bg-gold-500 text-navy-950 font-semibold rounded-lg hover:bg-gold-400 transition-colors disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
