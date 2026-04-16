import { NextResponse } from "next/server"
import { adminLogin } from "@/lib/admin-auth"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: "Username and password required" },
        { status: 400 }
      )
    }

    const result = await adminLogin(username, password)
    return NextResponse.json(result)
  } catch {
    return NextResponse.json(
      { success: false, error: "An error occurred" },
      { status: 500 }
    )
  }
}
