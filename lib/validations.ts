import { z } from "zod"

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters").max(1000),
})

export const onboardSchema = z.object({
  // Section 1: Your Firm
  firmName: z.string().min(2, "Firm name is required").max(200),
  contactName: z.string().min(2, "Contact name is required").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number").max(20),
  officeAddress: z.string().max(500).optional(),
  websiteUrl: z.string().url("Please enter a valid URL").or(z.literal("")).optional(),

  // Section 2: Your Practice
  practiceAreas: z.array(z.string()).min(1, "Select at least one practice area"),
  practiceAreaOther: z.string().max(200).optional(),
  targetCities: z.string().min(2, "Target cities are required").max(500),
  competitor1: z.string().max(200).optional(),
  competitor2: z.string().max(200).optional(),
  competitor3: z.string().max(200).optional(),
  differentiator: z.string().min(10, "Please describe what makes your firm unique").max(2000),

  // Section 4: Social Media & Access
  facebookUrl: z.string().url("Please enter a valid URL").or(z.literal("")).optional(),
  instagramHandle: z.string().max(100).optional(),
  linkedinUrl: z.string().url("Please enter a valid URL").or(z.literal("")).optional(),
  gbpEmail: z.string().email("Please enter a valid email").or(z.literal("")).optional(),
  cmsAccess: z.string().optional(),
  cmsUsername: z.string().max(200).optional(),
  cmsPassword: z.string().max(200).optional(),
  gaStatus: z.enum(["installed", "not-installed", "not-sure"]).optional(),

  // Section 5: Content Preferences
  tone: z.enum(["professional", "approachable", "aggressive", "firm-decide"]),
  testimonials: z.string().max(5000).optional(),
  dontSay: z.string().max(2000).optional(),
})

export type NewsletterInput = z.infer<typeof newsletterSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type OnboardInput = z.infer<typeof onboardSchema>
