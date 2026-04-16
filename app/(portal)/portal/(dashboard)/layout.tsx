import { cookies } from "next/headers"
import { DashboardShell } from "@/components/portal/DashboardShell"

// Force dynamic rendering — portal pages require auth
export const dynamic = "force-dynamic"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Reading cookies forces dynamic rendering
  await cookies()

  return <DashboardShell>{children}</DashboardShell>
}
