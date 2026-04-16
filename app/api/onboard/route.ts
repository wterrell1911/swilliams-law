import { NextResponse } from "next/server"
import { Resend } from "resend"
import { ZodError } from "zod"
import { onboardSchema } from "@/lib/validations"
import { getDropboxAccessToken, createDropboxFolder, uploadToDropbox } from "@/lib/dropbox"

export const maxDuration = 60

// Full client folder structure
const CLIENT_FOLDERS = [
  "00-Onboarding",
  "00-Onboarding/brand-assets",
  "00-Onboarding/brand-assets/logos",
  "00-Onboarding/brand-assets/headshots",
  "00-Onboarding/brand-assets/existing-materials",
  "01-Strategy",
  "02-Content",
  "02-Content/blog-posts",
  "02-Content/blog-posts/drafts",
  "02-Content/blog-posts/approved",
  "02-Content/blog-posts/published",
  "02-Content/social-media",
  "02-Content/social-media/posts",
  "02-Content/social-media/calendar",
  "02-Content/email",
  "02-Content/email/newsletters",
  "02-Content/email/sequences",
  "02-Content/video",
  "02-Content/video/raw-clips",
  "02-Content/video/edited",
  "02-Content/video/scripts",
  "03-SEO",
  "03-SEO/local-seo",
  "03-SEO/on-page-changes",
  "03-SEO/backlinks",
  "04-Reputation",
  "05-Analytics",
  "05-Analytics/monthly-reports",
  "06-Admin",
]

// Map upload fields to their destination subfolders
const FILE_DESTINATION: Record<string, string> = {
  logos: "00-Onboarding/brand-assets/logos",
  headshots: "00-Onboarding/brand-assets/headshots",
  brandGuidelines: "00-Onboarding/brand-assets",
  marketingMaterials: "00-Onboarding/brand-assets/existing-materials",
  videoClips: "02-Content/video/raw-clips",
}

async function createAllFolders(token: string, paths: string[]): Promise<void> {
  for (const path of paths) {
    await createDropboxFolder(token, path)
  }
}

export async function POST(request: Request) {
  try {
    // Get fresh access token via refresh token
    const token = await getDropboxAccessToken()

    const formData = await request.formData()

    // Parse and validate text data
    const rawData = formData.get("data")
    if (!rawData || typeof rawData !== "string") {
      return NextResponse.json(
        { success: false, message: "Missing form data." },
        { status: 400 }
      )
    }

    const parsedData = onboardSchema.parse(JSON.parse(rawData))

    // Collect files by category
    const fileCategories = Object.keys(FILE_DESTINATION)
    const filesByCategory: Record<string, File[]> = {}
    for (const cat of fileCategories) {
      filesByCategory[cat] = formData
        .getAll(cat)
        .filter((f): f is File => f instanceof File && f.size > 0)
    }

    // Validate logo requirement
    if (!filesByCategory.logos || filesByCategory.logos.length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one logo file is required." },
        { status: 400 }
      )
    }

    // TODO: Phase 3 — read Dropbox app folder name from firmConfig or env
    const basePath = `/${parsedData.firmName}`
    const allFolderPaths = [
      basePath,
      ...CLIENT_FOLDERS.map((f) => `${basePath}/${f}`),
    ]
    await createAllFolders(token, allFolderPaths)

    // Upload onboarding data JSON to 00-Onboarding/
    const jsonContent = JSON.stringify(parsedData, null, 2)
    await uploadToDropbox(
      token,
      `${basePath}/00-Onboarding/onboarding-data.json`,
      new Blob([jsonContent], { type: "application/json" })
    )

    // Upload files to their designated subfolders
    let totalFileCount = 0
    for (const [category, categoryFiles] of Object.entries(filesByCategory)) {
      if (categoryFiles.length === 0) continue

      const destination = FILE_DESTINATION[category]
      if (!destination) continue

      totalFileCount += categoryFiles.length
      await Promise.all(
        categoryFiles.map((file) =>
          uploadToDropbox(token, `${basePath}/${destination}/${file.name}`, file)
        )
      )
    }

    // Send email notification via Resend
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      try {
        const resend = new Resend(resendKey)
        // TODO: Phase 3 — read Dropbox app folder name from firmConfig or env
        const dropboxAppFolder = process.env.DROPBOX_APP_FOLDER || "Client-Files"
        const dropboxUrl = `https://www.dropbox.com/home/Apps/${encodeURIComponent(dropboxAppFolder)}/${encodeURIComponent(parsedData.firmName)}`
        const timestamp = new Date().toLocaleString("en-US", { timeZone: "America/New_York" })

        await resend.emails.send({
          // TODO: Phase 3 — read from/to addresses from firmConfig or env
          from: process.env.EMAIL_FROM || "onboarding@[firm domain]",
          to: process.env.EMAIL_TO || "[firm email]",
          subject: `New Client Onboarded — ${parsedData.firmName}`,
          html: `
            <h2>New Client Onboarded</h2>
            <p><strong>Firm:</strong> ${parsedData.firmName}</p>
            <p><strong>Contact:</strong> ${parsedData.contactName}</p>
            <p><strong>Email:</strong> ${parsedData.email}</p>
            <p><strong>Phone:</strong> ${parsedData.phone}</p>
            <p><strong>Practice Areas:</strong> ${parsedData.practiceAreas.join(", ")}</p>
            <p><strong>Target Cities:</strong> ${parsedData.targetCities}</p>
            <p><strong>Files Uploaded:</strong> ${totalFileCount}</p>
            <p><strong>Dropbox Folder:</strong> <a href="${dropboxUrl}">Open in Dropbox</a></p>
            <p><strong>Submitted:</strong> ${timestamp}</p>
            <hr>
            <p>Next steps: Review onboarding data and build strategy package within 48 hours.</p>
          `,
        })
      } catch (emailError) {
        // Log but don't fail the request — Dropbox upload already succeeded
        console.error("Failed to send notification email:", emailError)
      }
    }

    return NextResponse.json(
      { success: true, message: "Onboarding submitted successfully!" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Onboard API error:", error)

    if (error instanceof ZodError) {
      return NextResponse.json(
        { success: false, message: "Please check your form and try again." },
        { status: 400 }
      )
    }

    const errMsg = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json(
      { success: false, message: `Something went wrong: ${errMsg}` },
      { status: 500 }
    )
  }
}
