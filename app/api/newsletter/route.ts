import { NextResponse } from "next/server"
import { newsletterSchema } from "@/lib/validations"

const MAILERLITE_API_URL = "https://connect.mailerlite.com/api"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = newsletterSchema.parse(body)

    const apiKey = process.env.MAILERLITE_API_KEY
    if (!apiKey) {
      console.error("MAILERLITE_API_KEY is not configured")
      return NextResponse.json(
        { success: false, message: "Server configuration error. Please try again later." },
        { status: 500 }
      )
    }

    const subscriberBody: Record<string, unknown> = {
      email,
      status: "active",
    }

    const groupId = process.env.MAILERLITE_NEWSLETTER_GROUP_ID
    if (groupId) {
      subscriberBody.groups = [groupId]
    }

    const mlResponse = await fetch(`${MAILERLITE_API_URL}/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(subscriberBody),
    })

    if (mlResponse.status === 409) {
      return NextResponse.json(
        { success: true, message: "You're already subscribed!" },
        { status: 200 }
      )
    }

    if (!mlResponse.ok) {
      const errorData = await mlResponse.json().catch(() => null)
      console.error("MailerLite API error:", mlResponse.status, errorData)

      if (mlResponse.status === 422) {
        return NextResponse.json(
          { success: false, message: "Please enter a valid email address." },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { success: false, message: "Something went wrong. Please try again." },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: "Successfully subscribed to newsletter!" },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof Error && "errors" in error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      )
    }

    console.error("Newsletter signup error:", error)
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}
