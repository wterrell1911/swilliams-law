import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET(request: Request) {
  try {
    const supabase = createAdminClient()
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get("client_id")
    const sourceType = searchParams.get("source_type")
    const status = searchParams.get("status")
    const marketingSource = searchParams.get("marketing_source")
    const limit = parseInt(searchParams.get("limit") || "100")

    let query = supabase
      .from("leads")
      .select("*, clients(firm_name, attorney_name)")
      .order("timestamp", { ascending: false })
      .limit(limit)

    if (clientId) query = query.eq("client_id", clientId)
    if (sourceType) query = query.eq("source_type", sourceType)
    if (status) query = query.eq("status", status)
    if (marketingSource) query = query.eq("marketing_source", marketingSource)

    const { data, error } = await query
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
      return NextResponse.json({ success: false, message: "Missing lead id" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("leads")
      .update(updates)
      .eq("id", id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ success: false, message: msg }, { status: 500 })
  }
}
