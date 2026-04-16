import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET(request: Request) {
  try {
    const supabase = createAdminClient()
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get("client_id")
    const status = searchParams.get("status")
    const category = searchParams.get("category")

    let query = supabase
      .from("tasks")
      .select("*, clients(firm_name)")
      .order("due_date", { ascending: true })

    if (clientId) query = query.eq("client_id", clientId)
    if (status) query = query.eq("status", status)
    if (category) query = query.eq("category", category)

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ success: false, message: msg }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()

    const { title, description, client_id, category, due_date, assigned_to } = body

    if (!title) {
      return NextResponse.json({ success: false, message: "Title is required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("tasks")
      .insert({
        title,
        description: description || null,
        client_id: client_id || null,
        category: category || "other",
        status: "todo",
        due_date: due_date || null,
        assigned_to: assigned_to || "Will",
      })
      .select("*, clients(firm_name)")
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ success: false, message: msg }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json({ success: false, message: "Missing task id" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("tasks")
      .update(updates)
      .eq("id", id)
      .select("*, clients(firm_name)")
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ success: false, message: msg }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = createAdminClient()
    const body = await request.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ success: false, message: "Missing task id" }, { status: 400 })
    }

    const { error } = await supabase.from("tasks").delete().eq("id", id)
    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ success: false, message: msg }, { status: 500 })
  }
}
