"use client"

import { useState, FormEvent } from "react"
import { Input } from "@/components/ui/Input"
import { TextArea } from "@/components/ui/TextArea"
import { Button } from "@/components/ui/Button"
import { contactSchema, type ContactInput } from "@/lib/validations"

const services = [
  "Law Firm Marketing",
  "Trade Advisory",
  "SEO Services",
  "Content Marketing",
  "Video Production",
  "Other",
]

export function ContactForm() {
  const [formData, setFormData] = useState<ContactInput>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({})
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("loading")
    setErrors({})

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData)

      // Submit to API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message)
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        })
      } else {
        setStatus("error")
        setMessage(data.message || "Something went wrong. Please try again.")
      }
    } catch (error: any) {
      if (error.errors) {
        // Zod validation errors
        const fieldErrors: Partial<Record<keyof ContactInput, string>> = {}
        error.errors.forEach((err: any) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactInput] = err.message
          }
        })
        setErrors(fieldErrors)
        setStatus("error")
      } else {
        setStatus("error")
        setMessage("Something went wrong. Please try again.")
      }
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name as keyof ContactInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-warmWhite mb-2">
          Name *
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          disabled={status === "loading"}
          required
        />
        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-warmWhite mb-2">
          Email *
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          disabled={status === "loading"}
          required
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-warmWhite mb-2">
          Phone (Optional)
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          disabled={status === "loading"}
        />
      </div>

      {/* Service Interest */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-warmWhite mb-2">
          Service Interest *
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          disabled={status === "loading"}
          required
          className="flex h-12 w-full rounded-md border border-navy-600 bg-navy-800 px-4 py-2 text-base text-warmWhite focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-navy-500"
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>
        {errors.service && <p className="text-red-400 text-sm mt-1">{errors.service}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-warmWhite mb-2">
          Message *
        </label>
        <TextArea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          error={!!errors.message}
          disabled={status === "loading"}
          required
          rows={6}
        />
        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Sending..." : "Send Message"}
      </Button>

      {/* Status Messages */}
      {status === "success" && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <p className="text-green-400 text-center">{message}</p>
        </div>
      )}
      {status === "error" && message && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
          <p className="text-red-400 text-center">{message}</p>
        </div>
      )}
    </form>
  )
}
