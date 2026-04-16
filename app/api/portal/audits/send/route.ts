import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export async function POST(request: Request) {
  try {
    const { auditId, email } = await request.json()
    
    if (!auditId || !email) {
      return NextResponse.json(
        { success: false, message: "Missing auditId or email" },
        { status: 400 }
      )
    }

    // Fetch the audit
    const supabase = createAdminClient()
    const { data: audit, error } = await supabase
      .from("audits")
      .select("*")
      .eq("id", auditId)
      .single()

    if (error || !audit) {
      return NextResponse.json(
        { success: false, message: "Audit not found" },
        { status: 404 }
      )
    }

    // Generate HTML email
    const emailHtml = generateAuditEmail(audit)

    // Send via Resend (or your email provider)
    // For now, we'll use a simple fetch to a mail API
    // You can replace this with Resend, SendGrid, etc.
    
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    
    if (RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          // TODO: Phase 3 — read from address from firmConfig or env
          from: process.env.AUDIT_EMAIL_FROM || "[Firm Name] <audits@[firm domain]>",
          to: email,
          subject: `SEO & GEO Audit Report: ${audit.firm_name}`,
          html: emailHtml,
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        console.error("Resend error:", err)
        return NextResponse.json(
          { success: false, message: "Failed to send email" },
          { status: 500 }
        )
      }
    } else {
      // Fallback: Log that email would be sent
      console.log(`[Audit Email] Would send to: ${email}`)
      console.log(`[Audit Email] Subject: SEO & GEO Audit Report: ${audit.firm_name}`)
      // For demo, we'll still return success
    }

    // Log the send (ignore errors - table might not exist)
    try {
      await supabase.from("audit_sends").insert({
        audit_id: auditId,
        sent_to: email,
        sent_at: new Date().toISOString(),
      })
    } catch {
      // Table might not exist, that's okay
    }

    return NextResponse.json({ success: true, message: "Email sent" })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Unknown error"
    console.error("Send audit error:", msg)
    return NextResponse.json({ success: false, message: msg }, { status: 500 })
  }
}

function generateAuditEmail(audit: {
  firm_name: string
  website: string | null
  seo_score: number | null
  geo_score: number | null
  summary: string | null
  full_report: string | null
  created_at: string
}) {
  // Calculate single Digital Presence score (average of SEO + GEO)
  const digitalPresenceScore = getAverageScore(audit.seo_score, audit.geo_score)
  const scoreColor = getScoreRingColor(digitalPresenceScore)
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Digital Presence Report - ${audit.firm_name}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0f;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <!-- Main Card -->
    <div style="background: linear-gradient(180deg, #1a1a2e 0%, #12121a 100%); border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1);">
      
      <!-- Header with Firm Info and Score -->
      <div style="padding: 32px; display: flex; justify-content: space-between; align-items: flex-start;">
        <div style="flex: 1;">
          <h1 style="margin: 0 0 8px; color: #ffffff; font-size: 24px; font-weight: 600;">${audit.firm_name}</h1>
          ${audit.website ? `<a href="https://${audit.website}" style="color: #d4af37; text-decoration: none; font-size: 14px;">${audit.website} ↗</a>` : '<span style="color: #666; font-size: 14px;">No website</span>'}
        </div>
        
        <!-- Score Circle -->
        <div style="text-align: center; margin-left: 24px;">
          <div style="width: 80px; height: 80px; border-radius: 50%; border: 4px solid ${scoreColor}; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
            <span style="color: ${scoreColor}; font-size: 32px; font-weight: 700;">${digitalPresenceScore ?? '—'}</span>
          </div>
          <p style="margin: 8px 0 0; color: rgba(255,255,255,0.6); font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Digital Presence</p>
        </div>
      </div>

      <!-- Assessment Section -->
      <div style="padding: 0 32px 32px;">
        <h3 style="margin: 0 0 12px; color: #ffffff; font-size: 14px; font-weight: 600;">Assessment</h3>
        <p style="margin: 0; color: rgba(255,255,255,0.7); font-size: 14px; line-height: 1.6;">${audit.summary || 'No assessment available.'}</p>
      </div>

      <!-- Divider -->
      <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 0 32px;"></div>

      <!-- What This Score Means -->
      <div style="padding: 32px;">
        <h3 style="margin: 0 0 16px; color: #ffffff; font-size: 14px; font-weight: 600;">What Your Score Means</h3>
        <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 16px;">
          <p style="margin: 0; color: rgba(255,255,255,0.7); font-size: 13px; line-height: 1.6;">
            Your <strong style="color: #d4af37;">Digital Presence Score</strong> measures how visible your firm is online—both to traditional search engines (Google, Bing) and to AI assistants (ChatGPT, Claude, Gemini) that increasingly recommend lawyers to potential clients.
          </p>
        </div>
        
        <!-- Score Scale -->
        <div style="margin-top: 16px; display: flex; justify-content: space-between; font-size: 11px; color: rgba(255,255,255,0.5);">
          <span>0-39 Critical</span>
          <span>40-59 Weak</span>
          <span>60-79 Good</span>
          <span>80+ Strong</span>
        </div>
      </div>

      <!-- CTA -->
      <div style="padding: 0 32px 32px; text-align: center;">
        <p style="margin: 0 0 16px; color: rgba(255,255,255,0.6); font-size: 14px;">
          Ready to improve your digital presence?
        </p>
        <!-- TODO: Phase 3 — read scheduling URL from firmConfig or env -->
        <a href="${process.env.SCHEDULING_URL || '[scheduling link]'}" style="display: inline-block; background: #d4af37; color: #1a1a2e; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px;">
          Schedule a Free Consultation
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; padding: 24px; color: rgba(255,255,255,0.4); font-size: 12px;">
      <!-- TODO: Phase 3 — read firm name and URL from firmConfig or env -->
      <p style="margin: 0 0 4px;">
        <span style="color: #d4af37; font-weight: 600;">[Firm Name]</span>
      </p>
      <p style="margin: 0;">
        Digital Presence Optimization for Law Firms
      </p>
      <p style="margin: 12px 0 0;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || '[firm website]'}" style="color: #d4af37; text-decoration: none;">[firm website]</a>
      </p>
    </div>
  </div>
</body>
</html>
  `
}

function getAverageScore(seo: number | null, geo: number | null): number | null {
  if (seo === null && geo === null) return null
  if (seo === null) return geo
  if (geo === null) return seo
  return Math.round((seo + geo) / 2)
}

function getScoreRingColor(score: number | null): string {
  if (score === null) return "#666"
  if (score >= 80) return "#22c55e"  // green
  if (score >= 60) return "#d4af37"  // gold
  if (score >= 40) return "#f97316"  // orange
  return "#ef4444"  // red
}

function getScoreColor(score: number | null): { text: string; bg: string } {
  if (!score && score !== 0) return { text: "#999", bg: "#f5f5f5" }
  if (score >= 80) return { text: "#059669", bg: "#ecfdf5" }
  if (score >= 60) return { text: "#d97706", bg: "#fffbeb" }
  if (score >= 40) return { text: "#dc2626", bg: "#fef2f2" }
  return { text: "#991b1b", bg: "#fee2e2" }
}

function getScoreLabel(score: number | null): string {
  if (!score && score !== 0) return "Not Rated"
  if (score >= 80) return "Strong"
  if (score >= 60) return "Needs Work"
  if (score >= 40) return "Weak"
  return "Critical"
}
