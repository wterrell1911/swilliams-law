"use client"

import { useState, useEffect, useCallback, FormEvent } from "react"
import { Input } from "@/components/ui/Input"
import { TextArea } from "@/components/ui/TextArea"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { FileUploadZone } from "@/components/forms/FileUploadZone"
import { onboardSchema } from "@/lib/validations"
import { cn } from "@/lib/utils"

const lightInput = "bg-white border-navy-200 text-navy-900 placeholder:text-navy-400 hover:border-navy-300"
const lightSelect = "flex h-12 w-full rounded-md border border-navy-200 bg-white px-4 py-2 text-base text-navy-900 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all duration-200 hover:border-navy-300"

const sections = [
  { id: 1, label: "Your Firm" },
  { id: 2, label: "Practice" },
  { id: 3, label: "Brand Assets" },
  { id: 4, label: "Access" },
  { id: 5, label: "Preferences" },
]

const practiceAreaOptions = [
  "Personal Injury",
  "Workers Compensation",
  "Family Law",
  "Criminal Defense",
]

const toneOptions = [
  { value: "professional", label: "Professional", desc: "Formal, authoritative tone" },
  { value: "approachable", label: "Approachable", desc: "Friendly, conversational" },
  { value: "aggressive", label: "Aggressive", desc: "Bold, assertive messaging" },
  { value: "firm-decide", label: "Let Us Decide", desc: "We'll match your brand" },
]

export function OnboardForm() {
  const [formData, setFormData] = useState({
    firmName: "",
    contactName: "",
    email: "",
    phone: "",
    officeAddress: "",
    websiteUrl: "",
    practiceAreas: [] as string[],
    practiceAreaOther: "",
    targetCities: "",
    competitor1: "",
    competitor2: "",
    competitor3: "",
    differentiator: "",
    facebookUrl: "",
    instagramHandle: "",
    linkedinUrl: "",
    gbpEmail: "",
    cmsAccess: "",
    cmsUsername: "",
    cmsPassword: "",
    gaStatus: undefined as "installed" | "not-installed" | "not-sure" | undefined,
    tone: "firm-decide" as "professional" | "approachable" | "aggressive" | "firm-decide",
    testimonials: "",
    dontSay: "",
  })

  const [files, setFiles] = useState({
    logos: [] as File[],
    headshots: [] as File[],
    brandGuidelines: [] as File[],
    marketingMaterials: [] as File[],
    videoClips: [] as File[],
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const [activeSection, setActiveSection] = useState(1)

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const num = parseInt(entry.target.id.replace("section-", ""))
            if (!isNaN(num)) setActiveSection(num)
          }
        })
      },
      { rootMargin: "-30% 0px -60% 0px" }
    )

    for (let i = 1; i <= 5; i++) {
      const el = document.getElementById(`section-${i}`)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  const updateField = useCallback(
    (field: string, value: string | string[]) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev }
          delete next[field]
          return next
        })
      }
    },
    [errors]
  )

  const togglePracticeArea = useCallback(
    (area: string) => {
      setFormData((prev) => {
        const current = prev.practiceAreas
        const next = current.includes(area)
          ? current.filter((a) => a !== area)
          : [...current, area]
        return { ...prev, practiceAreas: next }
      })
      if (errors.practiceAreas) {
        setErrors((prev) => {
          const next = { ...prev }
          delete next.practiceAreas
          return next
        })
      }
    },
    [errors]
  )

  const scrollToSection = useCallback((num: number) => {
    const el = document.getElementById(`section-${num}`)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("loading")
    setErrors({})
    setMessage("")

    // Validate text fields
    const result = onboardSchema.safeParse(formData)
    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[String(err.path[0])] = err.message
        }
      })
      setErrors(fieldErrors)
      setStatus("error")
      const firstKey = Object.keys(fieldErrors)[0]
      const el = document.getElementById(firstKey)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }

    // Validate required files
    if (files.logos.length === 0) {
      setErrors({ logos: "At least one logo file is required" })
      setStatus("error")
      document.getElementById("logos")?.scrollIntoView({ behavior: "smooth", block: "center" })
      return
    }

    // Build FormData
    const fd = new FormData()
    fd.append("data", JSON.stringify(result.data))
    files.logos.forEach((f) => fd.append("logos", f))
    files.headshots.forEach((f) => fd.append("headshots", f))
    files.brandGuidelines.forEach((f) => fd.append("brandGuidelines", f))
    files.marketingMaterials.forEach((f) => fd.append("marketingMaterials", f))
    files.videoClips.forEach((f) => fd.append("videoClips", f))

    try {
      const response = await fetch("/api/onboard", {
        method: "POST",
        body: fd,
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message)
      } else {
        setStatus("error")
        setMessage(data.message || "Something went wrong. Please try again.")
      }
    } catch {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    }
  }

  if (status === "success") {
    return (
      <Card variant="bordered" className="p-12 bg-white border-navy-200 text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-display font-bold text-navy-900 mb-4">
          You&apos;re all set!
        </h2>
        <p className="text-navy-600 text-lg">
          We&apos;ll review everything and reach out within 24 hours.
        </p>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Progress Indicator */}
      <nav className="sticky top-20 z-10 bg-stone-50 py-4 -mx-4 px-4">
        <ol className="flex items-center justify-between max-w-2xl mx-auto">
          {sections.map((section, idx) => (
            <li key={section.id} className="flex items-center">
              <button
                type="button"
                onClick={() => scrollToSection(section.id)}
                className="flex flex-col items-center gap-1 group"
              >
                <span
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                    activeSection === section.id
                      ? "bg-gold-500 text-navy-950"
                      : activeSection > section.id
                        ? "bg-gold-500/30 text-navy-900"
                        : "bg-navy-200 text-navy-500 group-hover:bg-navy-300"
                  )}
                >
                  {activeSection > section.id ? (
                    <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    section.id
                  )}
                </span>
                <span className={cn(
                  "text-xs font-medium hidden sm:block",
                  activeSection === section.id ? "text-navy-900" : "text-navy-500"
                )}>
                  {section.label}
                </span>
              </button>
              {idx < sections.length - 1 && (
                <div className={cn(
                  "w-8 sm:w-12 lg:w-16 h-0.5 mx-1 sm:mx-2",
                  activeSection > section.id ? "bg-gold-500/30" : "bg-navy-200"
                )} />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Error banner */}
      {status === "error" && message && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {message}
        </div>
      )}

      {/* Section 1: Your Firm */}
      <div id="section-1" className="scroll-mt-32">
        <Card variant="bordered" className="p-8 bg-white border-navy-200">
          <h2 className="text-2xl font-display font-bold text-navy-900 mb-2">Your Firm</h2>
          <p className="text-navy-600 mb-8 text-sm">Basic information about your law firm.</p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firmName" className="block text-sm font-medium text-navy-900 mb-2">
                Firm Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="firmName"
                value={formData.firmName}
                onChange={(e) => updateField("firmName", e.target.value)}
                placeholder="e.g. Mitchell & Gray Law"
                error={!!errors.firmName}
                className={lightInput}
              />
              {errors.firmName && <p className="text-red-500 text-sm mt-1">{errors.firmName}</p>}
            </div>

            <div>
              <label htmlFor="contactName" className="block text-sm font-medium text-navy-900 mb-2">
                Primary Contact Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => updateField("contactName", e.target.value)}
                placeholder="Your full name"
                error={!!errors.contactName}
                className={lightInput}
              />
              {errors.contactName && <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-navy-900 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="you@yourfirm.com"
                error={!!errors.email}
                className={lightInput}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-navy-900 mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="(555) 123-4567"
                error={!!errors.phone}
                className={lightInput}
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="officeAddress" className="block text-sm font-medium text-navy-900 mb-2">
                Office Address
              </label>
              <Input
                id="officeAddress"
                value={formData.officeAddress}
                onChange={(e) => updateField("officeAddress", e.target.value)}
                placeholder="123 Main St, Suite 100, City, State"
                error={!!errors.officeAddress}
                className={lightInput}
              />
              {errors.officeAddress && <p className="text-red-500 text-sm mt-1">{errors.officeAddress}</p>}
            </div>

            <div>
              <label htmlFor="websiteUrl" className="block text-sm font-medium text-navy-900 mb-2">
                Website URL
              </label>
              <Input
                id="websiteUrl"
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => updateField("websiteUrl", e.target.value)}
                placeholder="https://yourfirm.com"
                error={!!errors.websiteUrl}
                className={lightInput}
              />
              {errors.websiteUrl && <p className="text-red-500 text-sm mt-1">{errors.websiteUrl}</p>}
            </div>
          </div>
        </Card>
      </div>

      {/* Section 2: Your Practice */}
      <div id="section-2" className="scroll-mt-32">
        <Card variant="bordered" className="p-8 bg-white border-navy-200">
          <h2 className="text-2xl font-display font-bold text-navy-900 mb-2">Your Practice</h2>
          <p className="text-navy-600 mb-8 text-sm">Tell us about your practice areas and who you want to reach.</p>

          <div className="space-y-6">
            <div id="practiceAreas">
              <label className="block text-sm font-medium text-navy-900 mb-3">
                Practice Areas <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {practiceAreaOptions.map((area) => (
                  <label
                    key={area}
                    className={cn(
                      "flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all text-sm",
                      formData.practiceAreas.includes(area)
                        ? "border-gold-500 bg-gold-500/5 text-navy-900"
                        : "border-navy-200 hover:border-navy-300 bg-white text-navy-700"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={formData.practiceAreas.includes(area)}
                      onChange={() => togglePracticeArea(area)}
                      className="sr-only"
                    />
                    <span className={cn(
                      "w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all",
                      formData.practiceAreas.includes(area)
                        ? "border-gold-500 bg-gold-500"
                        : "border-navy-300"
                    )}>
                      {formData.practiceAreas.includes(area) && (
                        <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    {area}
                  </label>
                ))}
                <label
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all text-sm",
                    formData.practiceAreas.includes("Other")
                      ? "border-gold-500 bg-gold-500/5 text-navy-900"
                      : "border-navy-200 hover:border-navy-300 bg-white text-navy-700"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={formData.practiceAreas.includes("Other")}
                    onChange={() => togglePracticeArea("Other")}
                    className="sr-only"
                  />
                  <span className={cn(
                    "w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all",
                    formData.practiceAreas.includes("Other")
                      ? "border-gold-500 bg-gold-500"
                      : "border-navy-300"
                  )}>
                    {formData.practiceAreas.includes("Other") && (
                      <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  Other
                </label>
              </div>
              {formData.practiceAreas.includes("Other") && (
                <div className="mt-3">
                  <Input
                    id="practiceAreaOther"
                    value={formData.practiceAreaOther}
                    onChange={(e) => updateField("practiceAreaOther", e.target.value)}
                    placeholder="Specify other practice area(s)"
                    className={lightInput}
                  />
                </div>
              )}
              {errors.practiceAreas && <p className="text-red-500 text-sm mt-1">{errors.practiceAreas}</p>}
            </div>

            <div>
              <label htmlFor="targetCities" className="block text-sm font-medium text-navy-900 mb-2">
                Target Cities / Geographic Areas <span className="text-red-500">*</span>
              </label>
              <Input
                id="targetCities"
                value={formData.targetCities}
                onChange={(e) => updateField("targetCities", e.target.value)}
                placeholder="e.g. Philadelphia, Camden, Wilmington"
                error={!!errors.targetCities}
                className={lightInput}
              />
              {errors.targetCities && <p className="text-red-500 text-sm mt-1">{errors.targetCities}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-900 mb-2">
                Top 3 Competitors You Want to Outrank
              </label>
              <div className="space-y-3">
                <Input
                  id="competitor1"
                  value={formData.competitor1}
                  onChange={(e) => updateField("competitor1", e.target.value)}
                  placeholder="Competitor 1 (name or website)"
                  className={lightInput}
                />
                <Input
                  id="competitor2"
                  value={formData.competitor2}
                  onChange={(e) => updateField("competitor2", e.target.value)}
                  placeholder="Competitor 2 (name or website)"
                  className={lightInput}
                />
                <Input
                  id="competitor3"
                  value={formData.competitor3}
                  onChange={(e) => updateField("competitor3", e.target.value)}
                  placeholder="Competitor 3 (name or website)"
                  className={lightInput}
                />
              </div>
            </div>

            <div>
              <label htmlFor="differentiator" className="block text-sm font-medium text-navy-900 mb-2">
                What Makes Your Firm Different? <span className="text-red-500">*</span>
              </label>
              <TextArea
                id="differentiator"
                value={formData.differentiator}
                onChange={(e) => updateField("differentiator", e.target.value)}
                placeholder="What do you want clients to know about your firm? What sets you apart from other attorneys in your area?"
                rows={4}
                error={!!errors.differentiator}
                className={lightInput}
              />
              {errors.differentiator && <p className="text-red-500 text-sm mt-1">{errors.differentiator}</p>}
            </div>
          </div>
        </Card>
      </div>

      {/* Section 3: Brand Assets */}
      <div id="section-3" className="scroll-mt-32">
        <Card variant="bordered" className="p-8 bg-white border-navy-200">
          <h2 className="text-2xl font-display font-bold text-navy-900 mb-2">Brand Assets</h2>
          <p className="text-navy-600 mb-8 text-sm">Upload your logo, photos, and any existing marketing materials.</p>

          <div className="space-y-8">
            <FileUploadZone
              id="logos"
              label="Logo Files"
              description="PNG, SVG, AI, EPS, or PDF"
              accept="image/*,.ai,.eps,.svg,.pdf"
              multiple
              required
              files={files.logos}
              onFilesChange={(f) => setFiles((prev) => ({ ...prev, logos: f }))}
              error={errors.logos}
              disabled={status === "loading"}
            />

            <FileUploadZone
              id="headshots"
              label="Professional Headshots / Team Photos"
              description="JPG, PNG, or HEIC"
              accept="image/*"
              multiple
              files={files.headshots}
              onFilesChange={(f) => setFiles((prev) => ({ ...prev, headshots: f }))}
              disabled={status === "loading"}
            />

            <FileUploadZone
              id="brandGuidelines"
              label="Brand Guidelines, Colors & Fonts"
              description="PDF, DOC, or DOCX"
              accept=".pdf,.doc,.docx"
              files={files.brandGuidelines}
              onFilesChange={(f) => setFiles((prev) => ({ ...prev, brandGuidelines: f }))}
              disabled={status === "loading"}
            />

            <FileUploadZone
              id="marketingMaterials"
              label="Existing Marketing Materials"
              description="Brochures, ads, flyers — any format"
              accept="image/*,.pdf,.doc,.docx"
              multiple
              files={files.marketingMaterials}
              onFilesChange={(f) => setFiles((prev) => ({ ...prev, marketingMaterials: f }))}
              disabled={status === "loading"}
            />
          </div>
        </Card>
      </div>

      {/* Section 4: Social Media & Access */}
      <div id="section-4" className="scroll-mt-32">
        <Card variant="bordered" className="p-8 bg-white border-navy-200">
          <h2 className="text-2xl font-display font-bold text-navy-900 mb-2">Social Media &amp; Access</h2>
          <p className="text-navy-600 mb-8 text-sm">Share your social profiles and platform access details.</p>

          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="facebookUrl" className="block text-sm font-medium text-navy-900 mb-2">
                  Facebook Business Page URL
                </label>
                <Input
                  id="facebookUrl"
                  type="url"
                  value={formData.facebookUrl}
                  onChange={(e) => updateField("facebookUrl", e.target.value)}
                  placeholder="https://facebook.com/yourfirm"
                  error={!!errors.facebookUrl}
                  className={lightInput}
                />
                {errors.facebookUrl && <p className="text-red-500 text-sm mt-1">{errors.facebookUrl}</p>}
              </div>

              <div>
                <label htmlFor="instagramHandle" className="block text-sm font-medium text-navy-900 mb-2">
                  Instagram Handle
                </label>
                <Input
                  id="instagramHandle"
                  value={formData.instagramHandle}
                  onChange={(e) => updateField("instagramHandle", e.target.value)}
                  placeholder="@yourfirm"
                  className={lightInput}
                />
              </div>

              <div>
                <label htmlFor="linkedinUrl" className="block text-sm font-medium text-navy-900 mb-2">
                  LinkedIn Company Page URL
                </label>
                <Input
                  id="linkedinUrl"
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => updateField("linkedinUrl", e.target.value)}
                  placeholder="https://linkedin.com/company/yourfirm"
                  error={!!errors.linkedinUrl}
                  className={lightInput}
                />
                {errors.linkedinUrl && <p className="text-red-500 text-sm mt-1">{errors.linkedinUrl}</p>}
              </div>

              <div>
                <label htmlFor="gbpEmail" className="block text-sm font-medium text-navy-900 mb-2">
                  Google Business Profile Email
                </label>
                <Input
                  id="gbpEmail"
                  type="email"
                  value={formData.gbpEmail}
                  onChange={(e) => updateField("gbpEmail", e.target.value)}
                  placeholder="email@used-for-google.com"
                  error={!!errors.gbpEmail}
                  className={lightInput}
                />
                {errors.gbpEmail && <p className="text-red-500 text-sm mt-1">{errors.gbpEmail}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="cmsAccess" className="block text-sm font-medium text-navy-900 mb-2">
                Website CMS Access
              </label>
              <select
                id="cmsAccess"
                value={formData.cmsAccess}
                onChange={(e) => updateField("cmsAccess", e.target.value)}
                className={lightSelect}
              >
                <option value="">Select an option...</option>
                <option value="email-access">I&apos;ll grant access via email invite</option>
                <option value="credentials">I&apos;ll share my login credentials</option>
                <option value="none">No website / Not sure</option>
              </select>
            </div>

            {formData.cmsAccess === "credentials" && (
              <div className="space-y-4 p-4 bg-navy-50 rounded-lg border border-navy-100">
                <p className="text-sm text-navy-600">
                  We&apos;ll only use these to set up tracking and make changes you&apos;ve approved.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cmsUsername" className="block text-sm font-medium text-navy-900 mb-2">
                      Username
                    </label>
                    <Input
                      id="cmsUsername"
                      value={formData.cmsUsername}
                      onChange={(e) => updateField("cmsUsername", e.target.value)}
                      className={lightInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="cmsPassword" className="block text-sm font-medium text-navy-900 mb-2">
                      Password
                    </label>
                    <Input
                      id="cmsPassword"
                      type="password"
                      value={formData.cmsPassword}
                      onChange={(e) => updateField("cmsPassword", e.target.value)}
                      className={lightInput}
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-navy-900 mb-3">
                Google Analytics Status
              </label>
              <div className="flex flex-wrap gap-3">
                {([
                  { value: "installed", label: "I have it set up" },
                  { value: "not-installed", label: "I don't have it" },
                  { value: "not-sure", label: "Not sure" },
                ] as const).map((option) => (
                  <label
                    key={option.value}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 cursor-pointer transition-all text-sm",
                      formData.gaStatus === option.value
                        ? "border-gold-500 bg-gold-500/5 text-navy-900"
                        : "border-navy-200 hover:border-navy-300 bg-white text-navy-700"
                    )}
                  >
                    <input
                      type="radio"
                      name="gaStatus"
                      value={option.value}
                      checked={formData.gaStatus === option.value}
                      onChange={(e) => updateField("gaStatus", e.target.value)}
                      className="sr-only"
                    />
                    <span className={cn(
                      "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                      formData.gaStatus === option.value
                        ? "border-gold-500"
                        : "border-navy-300"
                    )}>
                      {formData.gaStatus === option.value && (
                        <span className="w-2 h-2 rounded-full bg-gold-500" />
                      )}
                    </span>
                    {option.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Section 5: Content Preferences */}
      <div id="section-5" className="scroll-mt-32">
        <Card variant="bordered" className="p-8 bg-white border-navy-200">
          <h2 className="text-2xl font-display font-bold text-navy-900 mb-2">Content Preferences</h2>
          <p className="text-navy-600 mb-8 text-sm">Help us understand your brand voice and any existing content.</p>

          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-navy-900 mb-3">
                Preferred Tone <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {toneOptions.map((option) => (
                  <label
                    key={option.value}
                    className={cn(
                      "flex flex-col p-4 rounded-lg border-2 cursor-pointer transition-all",
                      formData.tone === option.value
                        ? "border-gold-500 bg-gold-500/5"
                        : "border-navy-200 hover:border-navy-300 bg-white"
                    )}
                  >
                    <input
                      type="radio"
                      name="tone"
                      value={option.value}
                      checked={formData.tone === option.value}
                      onChange={(e) => updateField("tone", e.target.value)}
                      className="sr-only"
                    />
                    <span className="font-medium text-navy-900 text-sm">{option.label}</span>
                    <span className="text-navy-500 text-xs mt-0.5">{option.desc}</span>
                  </label>
                ))}
              </div>
              {errors.tone && <p className="text-red-500 text-sm mt-1">{errors.tone}</p>}
            </div>

            <FileUploadZone
              id="videoClips"
              label="Raw Video Clips"
              description="MP4, MOV, or any video format"
              accept="video/*"
              multiple
              files={files.videoClips}
              onFilesChange={(f) => setFiles((prev) => ({ ...prev, videoClips: f }))}
              disabled={status === "loading"}
            />

            <div>
              <label htmlFor="testimonials" className="block text-sm font-medium text-navy-900 mb-2">
                Existing Testimonials or Notable Case Results
              </label>
              <TextArea
                id="testimonials"
                value={formData.testimonials}
                onChange={(e) => updateField("testimonials", e.target.value)}
                placeholder="Paste any client testimonials, reviews, or notable case outcomes you'd like us to highlight..."
                rows={4}
                className={lightInput}
              />
            </div>

            <div>
              <label htmlFor="dontSay" className="block text-sm font-medium text-navy-900 mb-2">
                Anything We Should NOT Say or Reference?
              </label>
              <TextArea
                id="dontSay"
                value={formData.dontSay}
                onChange={(e) => updateField("dontSay", e.target.value)}
                placeholder="e.g. We don't use the word aggressive, or Never mention competitor X"
                rows={3}
                className={lightInput}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Submit */}
      <div className="text-center">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={status === "loading"}
          className="min-w-[280px]"
        >
          {status === "loading" ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Uploading...
            </span>
          ) : (
            "Submit & Let's Get Started"
          )}
        </Button>
        <p className="text-navy-500 text-sm mt-3">
          This usually takes about 10 minutes. Your files are securely uploaded.
        </p>
      </div>
    </form>
  )
}
