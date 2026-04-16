import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Only admins
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
    if (!profile || profile.role !== "admin") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "client")
      .order("created_at", { ascending: false })
    if (error) throw error

    return NextResponse.json({ success: true, data })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ success: false, message: msg }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    // Only admins
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()
    if (!profile || profile.role !== "admin") {
      return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()
    const { firm_name, contact_name, email, phone, dropbox_folder } = body

    if (!email || !firm_name) {
      return NextResponse.json({ success: false, message: "Email and firm name are required" }, { status: 400 })
    }

    const adminClient = createAdminClient()

    // Create the auth user with magic link invite
    const { data: authUser, error: authError } = await adminClient.auth.admin.createUser({
      email,
      email_confirm: false,
    })

    if (authError) {
      // User might already exist
      if (authError.message.includes("already been registered")) {
        return NextResponse.json({ success: false, message: "A user with this email already exists" }, { status: 409 })
      }
      throw authError
    }

    // Create the profile
    const { error: profileError } = await adminClient
      .from("profiles")
      .insert({
        id: authUser.user.id,
        role: "client",
        firm_name,
        contact_name,
        email,
        phone: phone || null,
        dropbox_folder: dropbox_folder || null,
      })

    if (profileError) throw profileError

    // Send magic link invite
    const { error: inviteError } = await adminClient.auth.admin.generateLink({
      type: "magiclink",
      email,
    })

    if (inviteError) {
      console.error("Failed to send invite:", inviteError)
      // Don't fail — profile was created successfully
    }

    return NextResponse.json({
      success: true,
      message: `Client created. Magic link invite sent to ${email}.`,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ success: false, message: msg }, { status: 500 })
  }
}
