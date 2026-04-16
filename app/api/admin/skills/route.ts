import { createAdminClient } from "@/lib/supabase/admin"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { NextResponse } from "next/server"

const ADMIN_FIELDS =
  "id, skill_id, name, category, status, description, jurisdiction_codes, updated_at"

const VALID_STATUSES = ["active", "draft", "disabled"]

export async function GET() {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("skills")
      .select(ADMIN_FIELDS)
      .order("name")

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error("Error fetching admin skills:", err)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, status } = body

    if (!id || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid id or status" },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from("skills")
      .update({ status })
      .eq("id", id)
      .select(ADMIN_FIELDS)
      .single()

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error("Error updating skill:", err)
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    )
  }
}
