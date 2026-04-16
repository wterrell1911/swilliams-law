import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

// POST /api/ingest/lead
// Receives leads from client websites and stores them in the CRM.
// Authenticated via client API key (passed as Bearer token or ?token= param).
export async function POST(request: Request) {
  try {
    const supabase = createAdminClient()

    // Extract API key from Authorization header or query param
    const { searchParams } = new URL(request.url)
    const authHeader = request.headers.get("authorization")
    const apiKey = authHeader?.replace("Bearer ", "") || searchParams.get("token")

    if (!apiKey) {
      return NextResponse.json(
        { success: false, message: "Missing API key. Pass as Bearer token or ?token= param." },
        { status: 401 }
      )
    }

    // Look up the client by API key
    const { data: client, error: clientError } = await supabase
      .from("clients")
      .select("id, firm_name, status")
      .eq("api_key", apiKey)
      .single()

    if (clientError || !client) {
      return NextResponse.json(
        { success: false, message: "Invalid API key" },
        { status: 401 }
      )
    }

    if (client.status !== "active") {
      return NextResponse.json(
        { success: false, message: "Client account is not active" },
        { status: 403 }
      )
    }

    const body = await request.json()

    const {
      source_type = "form",
      marketing_source,
      name,
      phone,
      email,
      message,
      practice_area,
      landing_page,
      utm_source,
      utm_medium,
      utm_campaign,
      call_duration,
      call_recording_url,
    } = body

    // Auto-qualify calls longer than 60 seconds
    const autoStatus = source_type === "call" && call_duration && call_duration > 60
      ? "qualified"
      : "new"

    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .insert({
        client_id: client.id,
        source_type,
        marketing_source: marketing_source || null,
        name: name || null,
        phone: phone || null,
        email: email || null,
        message: message || null,
        practice_area: practice_area || null,
        landing_page: landing_page || null,
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
        call_duration: call_duration || null,
        call_recording_url: call_recording_url || null,
        status: autoStatus,
      })
      .select()
      .single()

    if (leadError) throw leadError

    return NextResponse.json({
      success: true,
      lead_id: lead.id,
      client: client.firm_name,
      status: autoStatus,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ success: false, message: msg }, { status: 500 })
  }
}
