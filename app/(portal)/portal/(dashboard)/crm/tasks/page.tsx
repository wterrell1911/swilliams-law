"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { CardSkeleton } from "@/components/portal/LoadingSkeleton"
import type {
  CrmTaskWithClient,
  CrmClient,
  CrmTaskCategory,
  CrmTaskStatus,
} from "@/lib/types/portal"
import {
  TASK_CATEGORY_LABELS,
  TASK_CATEGORY_COLORS,
  TASK_STATUS_LABELS,
} from "@/lib/types/portal"

const COLUMNS: { key: CrmTaskStatus; label: string; color: string }[] = [
  { key: "todo", label: "To Do", color: "text-warmWhite/80" },
  { key: "in_progress", label: "In Progress", color: "text-amber-400" },
  { key: "done", label: "Done", color: "text-emerald-400" },
]

const STATUS_ORDER: CrmTaskStatus[] = ["todo", "in_progress", "done"]

const CATEGORIES: ("all" | CrmTaskCategory)[] = [
  "all",
  "seo",
  "content",
  "gbp",
  "technical",
  "billing",
  "other",
]

interface NewTask {
  title: string
  description: string
  client_id: string
  category: CrmTaskCategory
  due_date: string
  assigned_to: string
}

const EMPTY_TASK: NewTask = {
  title: "",
  description: "",
  client_id: "",
  category: "other",
  due_date: "",
  assigned_to: "Will",
}

export default function TaskBoardPage() {
  const supabase = createClient()
  const [tasks, setTasks] = useState<CrmTaskWithClient[]>([])
  const [clients, setClients] = useState<CrmClient[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [newTask, setNewTask] = useState<NewTask>({ ...EMPTY_TASK })

  // Filters
  const [clientFilter, setClientFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<"all" | CrmTaskCategory>("all")

  useEffect(() => {
    fetchTasks()
    fetchClients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchTasks() {
    const { data } = await supabase
      .from("tasks")
      .select("*, clients(firm_name)")
      .order("due_date", { ascending: true })
    if (data) setTasks(data as CrmTaskWithClient[])
    setLoading(false)
  }

  async function fetchClients() {
    const { data } = await supabase
      .from("clients")
      .select("*")
      .order("firm_name", { ascending: true })
    if (data) setClients(data as CrmClient[])
  }

  async function moveTask(taskId: string, newStatus: CrmTaskStatus) {
    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    )
    const { error } = await supabase
      .from("tasks")
      .update({ status: newStatus })
      .eq("id", taskId)
    if (error) {
      // Revert on error
      fetchTasks()
    }
  }

  async function handleSaveTask(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    const payload: Record<string, unknown> = {
      title: newTask.title,
      description: newTask.description || null,
      client_id: newTask.client_id || null,
      category: newTask.category,
      due_date: newTask.due_date || null,
      assigned_to: newTask.assigned_to || "Will",
      status: "todo" as CrmTaskStatus,
    }
    const { error } = await supabase.from("tasks").insert(payload)
    if (!error) {
      setShowModal(false)
      setNewTask({ ...EMPTY_TASK })
      fetchTasks()
    }
    setSaving(false)
  }

  // Filtered tasks
  const filtered = tasks.filter((t) => {
    if (clientFilter && t.client_id !== clientFilter) return false
    if (categoryFilter !== "all" && t.category !== categoryFilter) return false
    return true
  })

  function tasksForColumn(status: CrmTaskStatus) {
    return filtered.filter((t) => t.status === status)
  }

  function isOverdue(task: CrmTaskWithClient) {
    if (!task.due_date) return false
    return new Date(task.due_date) < new Date() && task.status !== "done"
  }

  function formatDate(dateStr: string | null) {
    if (!dateStr) return ""
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const selectClass =
    "h-9 px-3 text-sm rounded-lg bg-navy-800 border border-navy-600 text-warmWhite focus:outline-none focus:ring-1 focus:ring-gold-500"
  const inputClass =
    "w-full h-10 px-3 text-sm rounded-lg bg-navy-800 border border-navy-600 text-warmWhite placeholder:text-warmWhite/30 focus:outline-none focus:ring-1 focus:ring-gold-500"

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-display font-bold text-warmWhite mb-6">
          Task Board
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-4">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-display font-bold text-warmWhite">
          Task Board
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 text-sm font-medium bg-gold-500 hover:bg-gold-400 text-navy-950 rounded-lg transition-colors w-fit"
        >
          Add Task
        </button>
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <select
          value={clientFilter}
          onChange={(e) => setClientFilter(e.target.value)}
          className={selectClass}
        >
          <option value="">All Clients</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.firm_name}
            </option>
          ))}
        </select>

        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value as "all" | CrmTaskCategory)
          }
          className={selectClass}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : TASK_CATEGORY_LABELS[cat]}
            </option>
          ))}
        </select>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COLUMNS.map((col) => {
          const columnTasks = tasksForColumn(col.key)
          const statusIdx = STATUS_ORDER.indexOf(col.key)

          return (
            <div key={col.key}>
              {/* Column Header */}
              <div className="flex items-center gap-2 mb-4">
                <h2 className={`text-sm font-semibold uppercase tracking-wide ${col.color}`}>
                  {col.label}
                </h2>
                <span className="text-xs font-medium bg-navy-800 text-warmWhite/60 rounded-full px-2 py-0.5">
                  {columnTasks.length}
                </span>
              </div>

              {/* Task Cards */}
              <div className="space-y-3">
                {columnTasks.length === 0 && (
                  <div className="border border-dashed border-navy-700 rounded-lg p-6 text-center">
                    <p className="text-xs text-warmWhite/30">No tasks</p>
                  </div>
                )}

                {columnTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`bg-navy-800 border rounded-lg p-4 transition-colors ${
                      isOverdue(task)
                        ? "border-red-500/50"
                        : "border-navy-700"
                    }`}
                  >
                    {/* Title */}
                    <p className="font-medium text-warmWhite text-sm mb-1">
                      {task.title}
                    </p>

                    {/* Client Name */}
                    {task.clients?.firm_name && (
                      <p className="text-xs text-warmWhite/50 mb-2">
                        {task.clients.firm_name}
                      </p>
                    )}

                    {/* Meta Row: category badge + due date */}
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          TASK_CATEGORY_COLORS[task.category]
                        }`}
                      >
                        {TASK_CATEGORY_LABELS[task.category]}
                      </span>
                      {task.due_date && (
                        <span
                          className={`text-xs ${
                            isOverdue(task)
                              ? "text-red-400"
                              : "text-warmWhite/40"
                          }`}
                        >
                          {isOverdue(task) ? "Overdue: " : "Due "}
                          {formatDate(task.due_date)}
                        </span>
                      )}
                    </div>

                    {/* Move Buttons */}
                    <div className="flex items-center justify-end gap-1">
                      {/* Left arrow - move to previous status */}
                      {statusIdx > 0 && (
                        <button
                          onClick={() =>
                            moveTask(task.id, STATUS_ORDER[statusIdx - 1])
                          }
                          className="p-1.5 rounded-md hover:bg-navy-700 text-warmWhite/40 hover:text-warmWhite transition-colors"
                          title={`Move to ${TASK_STATUS_LABELS[STATUS_ORDER[statusIdx - 1]]}`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                      )}
                      {/* Right arrow - move to next status */}
                      {statusIdx < STATUS_ORDER.length - 1 && (
                        <button
                          onClick={() =>
                            moveTask(task.id, STATUS_ORDER[statusIdx + 1])
                          }
                          className="p-1.5 rounded-md hover:bg-navy-700 text-warmWhite/40 hover:text-warmWhite transition-colors"
                          title={`Move to ${TASK_STATUS_LABELS[STATUS_ORDER[statusIdx + 1]]}`}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Add Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-navy-900 border border-navy-700 rounded-xl w-full max-w-lg mx-4 p-6">
            <h2 className="text-lg font-display font-semibold text-warmWhite mb-4">
              New Task
            </h2>
            <form onSubmit={handleSaveTask} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-warmWhite/60 mb-1">
                  Title <span className="text-red-400">*</span>
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

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-warmWhite/60 mb-1">
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  placeholder="Optional description..."
                  rows={3}
                  className={`${inputClass} h-auto py-2 resize-none`}
                />
              </div>

              {/* Client + Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-warmWhite/60 mb-1">
                    Client
                  </label>
                  <select
                    value={newTask.client_id}
                    onChange={(e) =>
                      setNewTask({ ...newTask, client_id: e.target.value })
                    }
                    className={inputClass}
                  >
                    <option value="">None</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.firm_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-warmWhite/60 mb-1">
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
                    {(
                      Object.keys(TASK_CATEGORY_LABELS) as CrmTaskCategory[]
                    ).map((cat) => (
                      <option key={cat} value={cat}>
                        {TASK_CATEGORY_LABELS[cat]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Due Date + Assigned To */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-warmWhite/60 mb-1">
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
                <div>
                  <label className="block text-xs font-medium text-warmWhite/60 mb-1">
                    Assigned To
                  </label>
                  <input
                    type="text"
                    value={newTask.assigned_to}
                    onChange={(e) =>
                      setNewTask({ ...newTask, assigned_to: e.target.value })
                    }
                    placeholder="Will"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false)
                    setNewTask({ ...EMPTY_TASK })
                  }}
                  className="px-4 py-2 text-sm font-medium text-warmWhite/60 hover:text-warmWhite rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 text-sm font-medium bg-gold-500 hover:bg-gold-400 text-navy-950 rounded-lg transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
