export type UserRole = "client" | "admin"

export type DeliverableType =
  | "blog_post"
  | "social_post"
  | "video"
  | "newsletter"
  | "seo_update"
  | "reputation"
  | "other"

export type DeliverableStatus =
  | "draft"
  | "in_review"
  | "approved"
  | "scheduled"
  | "published"
  | "rejected"

export type SenderType = "client" | "admin" | "ai"

export interface Profile {
  id: string
  role: UserRole
  firm_name: string | null
  contact_name: string | null
  email: string | null
  phone: string | null
  dropbox_folder: string | null
  created_at: string
}

export interface Deliverable {
  id: string
  client_id: string
  title: string
  type: DeliverableType
  status: DeliverableStatus
  assigned_to: string | null
  due_date: string | null
  published_date: string | null
  dropbox_path: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface DeliverableWithClient extends Deliverable {
  profiles: Pick<Profile, "firm_name" | "contact_name" | "email">
}

export interface Message {
  id: string
  client_id: string
  sender_type: SenderType
  sender_name: string | null
  content: string
  read: boolean
  created_at: string
}

export interface ReportMetrics {
  traffic?: number
  traffic_change?: number
  leads?: number
  leads_change?: number
  rankings?: number
  rankings_change?: number
  [key: string]: number | undefined
}

export interface Report {
  id: string
  client_id: string
  month: string
  title: string | null
  summary: string | null
  metrics: ReportMetrics | null
  dropbox_path: string | null
  created_at: string
}

export const DELIVERABLE_TYPE_LABELS: Record<DeliverableType, string> = {
  blog_post: "Blog Post",
  social_post: "Social Post",
  video: "Video",
  newsletter: "Newsletter",
  seo_update: "SEO Update",
  reputation: "Reputation",
  other: "Other",
}

export const DELIVERABLE_STATUS_LABELS: Record<DeliverableStatus, string> = {
  draft: "Draft",
  in_review: "In Review",
  approved: "Approved",
  scheduled: "Scheduled",
  published: "Published",
  rejected: "Rejected",
}

// ============================================
// PROSPECTS (Sales CRM)
// ============================================

export type ProspectStatus =
  | "lead"
  | "contacted"
  | "audit_sent"
  | "demo_built"
  | "meeting_scheduled"
  | "proposal_sent"
  | "won"
  | "lost"

export type ServiceType = 
  | "full_stack"
  | "marketing_geo"
  | "marketing"
  | "automation"
  | "ai_concierge"
  | "ai_pocket"
  | "website"

export interface ProspectServices {
  full_stack?: boolean
  marketing_geo?: boolean
  marketing?: boolean
  automation?: boolean
  ai_concierge?: boolean
  ai_pocket?: boolean
  website?: boolean
  website_pages?: number // additional pages beyond base 5
}

export const SERVICE_PRICING: Record<ServiceType, { monthly: number; setup: number; label: string; description?: string }> = {
  full_stack: { monthly: 3500, setup: 2500, label: "The Full Stack", description: "Marketing + GEO + Automation bundle" },
  marketing_geo: { monthly: 2500, setup: 0, label: "Digital Marketing + GEO", description: "SEO + AI search visibility" },
  marketing: { monthly: 2000, setup: 0, label: "Digital Marketing", description: "SEO, content, social, reputation" },
  automation: { monthly: 1500, setup: 2500, label: "AI-Powered Automation", description: "AI assistant, lead routing, reports" },
  ai_concierge: { monthly: 500, setup: 2500, label: "AI Concierge", description: "Always-on AI with Mac Mini" },
  ai_pocket: { monthly: 0, setup: 1000, label: "AI In Your Pocket", description: "Claude setup + training" },
  website: { monthly: 0, setup: 500, label: "Website (5 pages)", description: "Professional law firm website" },
}

export const WEBSITE_PAGE_PRICE = 100 // per additional page beyond base 5

export function calculateProspectValue(services: ProspectServices | null): { monthly: number; setup: number } {
  if (!services) return { monthly: 0, setup: 0 }
  
  let monthly = 0
  let setup = 0
  
  if (services.full_stack) {
    monthly += SERVICE_PRICING.full_stack.monthly
    setup += SERVICE_PRICING.full_stack.setup
  }
  if (services.marketing_geo) {
    monthly += SERVICE_PRICING.marketing_geo.monthly
  }
  if (services.marketing) {
    monthly += SERVICE_PRICING.marketing.monthly
  }
  if (services.automation) {
    monthly += SERVICE_PRICING.automation.monthly
    setup += SERVICE_PRICING.automation.setup
  }
  if (services.ai_concierge) {
    monthly += SERVICE_PRICING.ai_concierge.monthly
    setup += SERVICE_PRICING.ai_concierge.setup
  }
  if (services.ai_pocket) {
    setup += SERVICE_PRICING.ai_pocket.setup
  }
  if (services.website) {
    setup += SERVICE_PRICING.website.setup
    if (services.website_pages && services.website_pages > 0) {
      setup += services.website_pages * WEBSITE_PAGE_PRICE
    }
  }
  
  return { monthly, setup }
}

export interface Prospect {
  id: string
  firm_name: string
  contact_name: string | null
  email: string | null
  phone: string | null
  website: string | null
  status: ProspectStatus
  source: string | null
  audit_date: string | null
  meeting_date: string | null
  last_contact: string | null
  notes: string | null
  estimated_value: number | null // legacy, will be calculated from services
  services: ProspectServices | null
  demo_url: string | null
  created_at: string
  updated_at: string
}

export const PROSPECT_STATUS_LABELS: Record<ProspectStatus, string> = {
  lead: "Lead",
  contacted: "Contacted",
  audit_sent: "Audit Sent",
  demo_built: "Demo Built",
  meeting_scheduled: "Meeting",
  proposal_sent: "Proposal",
  won: "Won",
  lost: "Lost",
}

export const PROSPECT_STATUS_COLORS: Record<ProspectStatus, string> = {
  lead: "bg-slate-500/20 text-slate-300",
  contacted: "bg-blue-500/20 text-blue-300",
  audit_sent: "bg-purple-500/20 text-purple-300",
  demo_built: "bg-indigo-500/20 text-indigo-300",
  meeting_scheduled: "bg-amber-500/20 text-amber-300",
  proposal_sent: "bg-cyan-500/20 text-cyan-300",
  won: "bg-emerald-500/20 text-emerald-300",
  lost: "bg-red-500/20 text-red-300",
}

// ============================================
// AUDITS
// ============================================

export interface Audit {
  id: string
  prospect_id: string | null
  firm_name: string
  website: string | null
  audit_type: "seo" | "geo" | "full"
  seo_score: number | null
  geo_score: number | null
  summary: string | null
  full_report: string | null
  recommendations: Record<string, unknown> | null
  created_at: string
  updated_at: string
}

// ============================================
// CRM: CLIENTS
// ============================================

export type PackageTier = "foundation" | "growth" | "scale"
export type ClientStatus = "prospect" | "active" | "paused" | "churned"

export interface CrmClient {
  id: string
  firm_name: string
  attorney_name: string | null
  email: string | null
  phone: string | null
  website_url: string | null
  package_tier: PackageTier
  monthly_rate: number // cents
  status: ClientStatus
  start_date: string | null
  callrail_account_id: string | null
  ga4_property_id: string | null
  search_console_url: string | null
  gbp_location_id: string | null
  google_sheet_id: string | null
  api_key: string
  notes: string | null
  created_at: string
  updated_at: string
}

export const PACKAGE_TIER_LABELS: Record<PackageTier, string> = {
  foundation: "Foundation",
  growth: "Growth",
  scale: "Scale",
}

export const PACKAGE_TIER_COLORS: Record<PackageTier, string> = {
  foundation: "bg-slate-500/20 text-slate-300",
  growth: "bg-blue-500/20 text-blue-300",
  scale: "bg-gold-500/20 text-gold-400",
}

export const CLIENT_STATUS_LABELS: Record<ClientStatus, string> = {
  prospect: "Prospect",
  active: "Active",
  paused: "Paused",
  churned: "Churned",
}

export const CLIENT_STATUS_COLORS: Record<ClientStatus, string> = {
  prospect: "bg-amber-500/20 text-amber-300",
  active: "bg-emerald-500/20 text-emerald-300",
  paused: "bg-slate-500/20 text-slate-300",
  churned: "bg-red-500/20 text-red-300",
}

// ============================================
// CRM: LEADS
// ============================================

export type LeadSourceType = "call" | "form" | "chat"
export type LeadStatus = "new" | "contacted" | "qualified" | "converted" | "lost"

export interface Lead {
  id: string
  client_id: string
  timestamp: string
  source_type: LeadSourceType
  marketing_source: string | null
  name: string | null
  phone: string | null
  email: string | null
  message: string | null
  practice_area: string | null
  landing_page: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  call_duration: number | null
  call_recording_url: string | null
  status: LeadStatus
  notes: string | null
  created_at: string
}

export interface LeadWithClient extends Lead {
  clients: Pick<CrmClient, "firm_name" | "attorney_name">
}

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  converted: "Converted",
  lost: "Lost",
}

export const LEAD_STATUS_COLORS: Record<LeadStatus, string> = {
  new: "bg-blue-500/20 text-blue-300",
  contacted: "bg-amber-500/20 text-amber-300",
  qualified: "bg-emerald-500/20 text-emerald-300",
  converted: "bg-gold-500/20 text-gold-400",
  lost: "bg-red-500/20 text-red-300",
}

export const LEAD_SOURCE_TYPE_LABELS: Record<LeadSourceType, string> = {
  call: "Phone Call",
  form: "Form",
  chat: "Chat",
}

// ============================================
// CRM: TASKS
// ============================================

export type CrmTaskCategory = "seo" | "content" | "gbp" | "technical" | "billing" | "other"
export type CrmTaskStatus = "todo" | "in_progress" | "done"

export interface CrmTask {
  id: string
  client_id: string | null
  title: string
  description: string | null
  category: CrmTaskCategory
  status: CrmTaskStatus
  due_date: string | null
  assigned_to: string
  created_at: string
  updated_at: string
}

export interface CrmTaskWithClient extends CrmTask {
  clients: Pick<CrmClient, "firm_name"> | null
}

export const TASK_CATEGORY_LABELS: Record<CrmTaskCategory, string> = {
  seo: "SEO",
  content: "Content",
  gbp: "GBP",
  technical: "Technical",
  billing: "Billing",
  other: "Other",
}

export const TASK_CATEGORY_COLORS: Record<CrmTaskCategory, string> = {
  seo: "bg-blue-500/20 text-blue-300",
  content: "bg-purple-500/20 text-purple-300",
  gbp: "bg-emerald-500/20 text-emerald-300",
  technical: "bg-amber-500/20 text-amber-300",
  billing: "bg-cyan-500/20 text-cyan-300",
  other: "bg-slate-500/20 text-slate-300",
}

export const TASK_STATUS_LABELS: Record<CrmTaskStatus, string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
}

// ============================================
// CRM: MONTHLY METRICS
// ============================================

export interface MonthlyMetrics {
  id: string
  client_id: string
  month: string
  organic_traffic: number
  total_leads: number
  leads_from_organic: number
  leads_from_maps: number
  leads_from_paid: number
  leads_from_lsa: number
  leads_from_direct: number
  top_keyword_position: number | null
  google_reviews_count: number
  revenue_collected: number // cents
  created_at: string
}
