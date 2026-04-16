import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

// Middleware handles auth. These routes use admin client to bypass RLS.

export async function GET(request: Request) {
  try {
    const supabase = createAdminClient()
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get("client_id")
    const status = searchParams.get("status")

    let query = supabase
      .from("deliverables")
      .select("*, profiles(firm_name, contact_name, email)")
      .order("created_at", { ascending: false })

    if (clientId) query = query.eq("client_id", clientId)
    if (status) query = query.eq("status", status)

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
    const { data, error } = await supabase.from("deliverables").insert(body).select().single()
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
      return NextResponse.json({ success: false, message: "Missing deliverable id" }, { status: 400 })
    }

    const { data, error } = await supabase.from("deliverables").update(updates).eq("id", id).select().single()
    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ success: false, message: msg }, { status: 500 })
  }
}
