import { cookies } from "next/headers"
import { LoginForm } from "@/components/portal/LoginForm"

export const dynamic = "force-dynamic"

export default async function PortalLoginPage() {
  await cookies()
  return <LoginForm />
}
