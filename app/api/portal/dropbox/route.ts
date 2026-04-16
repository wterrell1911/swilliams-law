import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getDropboxAccessToken, getDropboxTemporaryLink } from "@/lib/dropbox"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { path } = body

    if (!path) {
      return NextResponse.json({ success: false, message: "Path is required" }, { status: 400 })
    }

    const token = await getDropboxAccessToken()
    const link = await getDropboxTemporaryLink(token, path)

    return NextResponse.json({ success: true, link })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ success: false, message: msg }, { status: 500 })
  }
}
