import { NextResponse } from "next/server"
import { contactSchema } from "@/lib/validations"

const MAILERLITE_API_URL = "https://connect.mailerlite.com/api"
const NOTION_API_URL = "https://api.notion.com/v1"

// Create Notion task for new lead
async function createNotionTask(data: { name: string; email: string; phone?: string; service: string; message?: string }) {
  const notionKey = process.env.NOTION_API_KEY
  const databaseId = process.env.NOTION_DATABASE_ID
  
  if (!notionKey || !databaseId) {
    console.log("Notion not configured, skipping task creation")
    return null
  }
  
  const taskTitle = `🆕 New Lead: ${data.name} - ${data.service}`
  const bodyText = `📧 ${data.email}\n📱 ${data.phone || "No phone"}\n\n💼 Service Interest: ${data.service}\n\n💬 Message:\n${data.message || "No message"}\n\nFollow up within 24 hours!`
  
  try {
    const response = await fetch(`${NOTION_API_URL}/pages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${notionKey}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties: {
          Task: {
            title: [{ text: { content: taskTitle } }]
          },
          Status: {
            select: { name: "Inbox" }
          }
        },
        children: [
          {
            object: "block",
            type: "paragraph",
            paragraph: {
              rich_text: [{ type: "text", text: { content: bodyText } }]
            }
          }
        ]
      })
    })
    
    if (!response.ok) {
      console.error("Notion API error:", await response.text())
      return null
    }
    
    return await response.json()
  } catch (error) {
    console.error("Notion task creation failed:", error)
    return null
  }
}

// Send notification via webhook (to Mac Mini)
async function sendNotification(data: { name: string; email: string; phone?: string; service: string }) {
  const webhookUrl = process.env.NOTIFICATION_WEBHOOK_URL
  
  if (!webhookUrl) {
    console.log("Notification webhook not configured")
    return
  }
  
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "new_lead",
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: data.service
      })
    })
  } catch (error) {
    console.error("Notification failed:", error)
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    const apiKey = process.env.MAILERLITE_API_KEY
    if (!apiKey) {
      console.error("MAILERLITE_API_KEY is not configured")
      return NextResponse.json(
        { success: false, message: "Server configuration error. Please try again later." },
        { status: 500 }
      )
    }

    const subscriberBody: Record<string, unknown> = {
      email: data.email,
      fields: {
        name: data.name,
        phone: data.phone || "",
        company: data.service,
      },
      status: "active",
    }

    const groupId = process.env.MAILERLITE_CONTACT_GROUP_ID
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

    if (!mlResponse.ok && mlResponse.status !== 409) {
      const errorData = await mlResponse.json().catch(() => null)
      console.error("MailerLite API error:", mlResponse.status, errorData)

      if (mlResponse.status === 422) {
        return NextResponse.json(
          { success: false, message: "Please check your email address and try again." },
          { status: 400 }
        )
      }

      return NextResponse.json(
        { success: false, message: "Something went wrong. Please try again later." },
        { status: 500 }
      )
    }

    // Create Notion task (don't block response on this)
    createNotionTask(data).catch(console.error)
    
    // Send notification (don't block response on this)
    sendNotification(data).catch(console.error)

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! We'll get back to you within 24 hours.",
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof Error && "errors" in error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      )
    }

    console.error("Contact form error:", error)
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again later." },
      { status: 500 }
    )
  }
}
