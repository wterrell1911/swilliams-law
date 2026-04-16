# Client Portal — Full Implementation Plan

## Architecture Overview

The portal requires a **different layout** from the marketing site (sidebar nav instead of Header/Footer). Since Next.js App Router layouts compose additively (child layouts can't remove parent elements), we use **route groups** to give each section its own layout chain.

```
app/
├── layout.tsx                    ← ROOT: html/body/fonts/GA only (shared)
├── globals.css, icon.tsx, sitemap.ts, robots.ts, not-found.tsx  ← stay at root
├── api/                          ← API routes (no layout involvement)
│   ├── contact/route.ts
│   ├── newsletter/route.ts
│   ├── onboard/route.ts
│   ├── auth/callback/route.ts    ← NEW: Supabase magic link callback
│   └── portal/                   ← NEW: Portal API routes
│       ├── deliverables/route.ts
│       ├── messages/route.ts
│       ├── reports/route.ts
│       ├── clients/route.ts
│       └── dropbox/route.ts
├── (marketing)/                  ← Route group (URLs unchanged)
│   ├── layout.tsx                ← Header + Footer wrapper
│   ├── page.tsx                  ← / (home)
│   ├── blog/                     ← /blog, /blog/[slug]
│   ├── contact/                  ← /contact
│   ├── trade/                    ← /trade
│   ├── shop/                     ← /shop
│   └── onboard/                  ← /onboard
└── (portal)/                     ← Route group
    └── portal/
        ├── login/
        │   └── page.tsx          ← /portal/login (no sidebar)
        └── (dashboard)/
            ├── layout.tsx        ← Sidebar + header wrapper
            ├── dashboard/page.tsx
            ├── content/page.tsx
            ├── schedule/page.tsx
            ├── reports/page.tsx
            ├── messages/page.tsx
            └── admin/
                ├── page.tsx
                ├── clients/page.tsx
                ├── pipeline/page.tsx
                └── team/page.tsx
```

**Key:** Route groups `(marketing)` and `(portal)` don't affect URLs. All existing URLs remain the same.

---

## Phase 1: Foundation (packages + env vars)

### 1a. Install packages
```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 1b. Add env var placeholders to `.env.local`
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 1c. Create SQL reference file
**File:** `supabase/schema.sql` (for reference only — user runs in Supabase dashboard)

Contains the full schema from the spec: profiles, deliverables, messages, reports tables + all RLS policies.

---

## Phase 2: Supabase Clients + Shared Utilities

### 2a. Browser client (for "use client" components)
**File:** `lib/supabase/client.ts`
- `createClient()` using `createBrowserClient` from `@supabase/ssr`
- Uses `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2b. Server client (for server components + API routes)
**File:** `lib/supabase/server.ts`
- `createClient()` using `createServerClient` from `@supabase/ssr`
- Reads cookies via `cookies()` from `next/headers`
- Used in server components and route handlers

### 2c. Middleware client
**File:** `lib/supabase/middleware.ts`
- `updateSession(request)` function
- Creates Supabase client with request/response cookie handling
- Refreshes auth session on every request
- Returns `NextResponse` with updated cookies

### 2d. Admin client (bypasses RLS)
**File:** `lib/supabase/admin.ts`
- Uses `SUPABASE_SERVICE_ROLE_KEY`
- For admin operations: creating clients, sending invites
- Never exposed to browser

### 2e. Extract shared Dropbox utility
**File:** `lib/dropbox.ts`
- Move `getDropboxAccessToken()` from `app/api/onboard/route.ts`
- Add `getDropboxTemporaryLink(path)` for file preview URLs
- Import back into onboard route

### 2f. Portal TypeScript types
**File:** `lib/types/portal.ts`
- Interfaces: `Profile`, `Deliverable`, `Message`, `Report`
- Status enums: `DeliverableStatus`, `DeliverableType`, `SenderType`
- Helper type: `DeliverableWithClient` (joined data for admin views)

---

## Phase 3: Route Group Restructure

This is the riskiest phase — moving existing files. Done in one atomic step with build verification.

### 3a. Strip root layout
**Modify:** `app/layout.tsx`
- Remove Header and Footer imports/rendering
- Keep: html, head (GA, GSC, JsonLd), body with skip-link, fonts
- Body renders just `{children}` (no main wrapper)

### 3b. Create marketing layout
**Create:** `app/(marketing)/layout.tsx`
- Import and render `<Header />`, `<main>`, `<Footer />`
- Replicates the wrapper that was in root layout

### 3c. Move existing pages
Move these into `app/(marketing)/`:
- `app/page.tsx` → `app/(marketing)/page.tsx`
- `app/blog/` → `app/(marketing)/blog/`
- `app/contact/` → `app/(marketing)/contact/`
- `app/trade/` → `app/(marketing)/trade/`
- `app/shop/` → `app/(marketing)/shop/`
- `app/onboard/` → `app/(marketing)/onboard/`

**Keep at root:** `globals.css`, `icon.tsx`, `sitemap.ts`, `robots.ts`, `not-found.tsx`, `api/`

### 3d. Build verification
Run `npx next build` — all existing URLs must still work with zero regressions.

---

## Phase 4: Auth + Middleware

### 4a. Auth callback route
**Create:** `app/api/auth/callback/route.ts`
- Handles Supabase magic link redirect
- Exchanges code for session
- Redirects to `/portal/dashboard`

### 4b. Middleware
**Create:** `middleware.ts` (project root)
- Calls `updateSession()` to refresh Supabase auth
- Protects `/portal/*` routes (except `/portal/login`)
- If no session → redirect to `/portal/login`
- For `/portal/admin/*` → check profile role = "admin", redirect if not
- `config.matcher`: targets `/portal/:path*`

### 4c. Login page
**Create:** `app/(portal)/portal/login/page.tsx`
- "use client" component
- 302 branding (Logo, dark theme)
- Email input + "Send Magic Link" button
- Calls `supabase.auth.signInWithOtp({ email })`
- Shows "Check your email" confirmation state
- If already logged in, redirect to dashboard

---

## Phase 5: Portal Layout + Navigation

### 5a. Portal sidebar
**Create:** `components/portal/Sidebar.tsx`
- "use client" — needs usePathname for active state
- Client nav: Dashboard, Content, Schedule, Reports, Messages
- Admin section (shown if role=admin): Overview, Clients, Pipeline, Team
- Active item: gold-500 highlight
- Collapsible on mobile
- User info at bottom with sign out button

### 5b. Portal header bar
**Create:** `components/portal/PortalHeader.tsx`
- Firm name display
- Mobile menu toggle (hamburger → opens sidebar)
- User avatar/initials + role badge

### 5c. Dashboard layout
**Create:** `app/(portal)/portal/(dashboard)/layout.tsx`
- "use client" wrapper
- Fetches user profile from Supabase
- Renders Sidebar (desktop: fixed left, 256px) + PortalHeader (top) + content area
- Passes profile data via React context or props
- Redirects to login if no session

### 5d. Shared portal UI components
**Create:** `components/portal/StatCard.tsx`
- Value, label, optional trend (up/down arrow + percentage)
- Dark card styling matching existing Card component

**Create:** `components/portal/StatusBadge.tsx`
- Color-coded badges for deliverable status
- draft=gray, in_review=gold, approved=green, scheduled=blue, published=electric, rejected=red

**Create:** `components/portal/TypeBadge.tsx`
- Icons + labels for content types (blog, social, video, newsletter, etc.)

**Create:** `components/portal/LoadingSkeleton.tsx`
- Animated pulse skeletons for cards, tables, chat messages

**Create:** `components/portal/EmptyState.tsx`
- Illustration + message for empty data states

---

## Phase 6: Client Pages

### 6a. Dashboard (`/portal/dashboard`)
**File:** `app/(portal)/portal/(dashboard)/dashboard/page.tsx`
- Server component — fetches data from Supabase
- Welcome header: "Welcome back, {contactName}"
- 3 StatCards: Active deliverables, Pending approval, Published this month
- Recent activity: latest 5 deliverables + 5 messages in a combined feed
- Quick action links to other sections
- ScrollReveal animations

### 6b. Content Approval (`/portal/content`)
**File:** `app/(portal)/portal/(dashboard)/content/page.tsx`
- "use client" for interactivity
- Tabs: Pending Review | Approved | Published | All
- Cards for each deliverable: title, TypeBadge, StatusBadge, due date
- Preview link (generates Dropbox temporary link)
- Approve/Reject buttons with optional feedback textarea (modal or inline)
- PATCH to `/api/portal/deliverables` to update status
- Empty state when no items in category

### 6c. Schedule (`/portal/schedule`)
**File:** `app/(portal)/portal/(dashboard)/schedule/page.tsx`
- Server component with client filter controls
- List/timeline view grouped by week
- Each item: title, TypeBadge, StatusBadge, due date, assigned_to
- Filter dropdowns: by type, by status
- Color-coded left border by status

### 6d. Reports (`/portal/reports`)
**File:** `app/(portal)/portal/(dashboard)/reports/page.tsx`
- Server component
- Grid of monthly report cards
- Each card: month/year header, summary text
- Metrics: traffic, leads, rankings as StatCards with trend arrows
- "View Full Report" link → Dropbox temporary link
- Empty state if no reports yet

### 6e. Messages (`/portal/messages`)
**File:** `app/(portal)/portal/(dashboard)/messages/page.tsx`
- "use client" — chat-style interface
- Messages displayed in scrollable container
- Different styling per sender_type:
  - client: right-aligned, gold accent
  - admin: left-aligned, navy accent
  - ai: left-aligned, electric accent, "Penny" badge
- Text input + send button at bottom
- POST to `/api/portal/messages`
- Auto-scroll to bottom on new messages
- Polls for new messages every 10 seconds
- Marks unread messages as read on mount

---

## Phase 7: Admin Pages

### 7a. Admin Overview (`/portal/admin`)
**File:** `app/(portal)/portal/(dashboard)/admin/page.tsx`
- All clients listed with status summary cards
- Pipeline counts: total deliverables per status (kanban-style counters)
- Overdue items highlighted (due_date < today && status not published)
- Bottleneck detection: items in same status > 3 days flagged yellow/red

### 7b. Client Management (`/portal/admin/clients`)
**File:** `app/(portal)/portal/(dashboard)/admin/clients/page.tsx`
- Client list with search + filter
- Each row: firm name, contact, email, active deliverables count, last activity
- Click → navigates to that client's dashboard view
- "Add Client" button → modal form:
  - Fields: firm_name, contact_name, email, phone, dropbox_folder
  - On submit: creates profile via admin API + sends magic link invite
  - Uses service role client

### 7c. Pipeline (`/portal/admin/pipeline`)
**File:** `app/(portal)/portal/(dashboard)/admin/pipeline/page.tsx`
- "use client" — interactive
- Toggle: Kanban Board | Table View
- **Kanban**: Columns for each status, cards with title + client + type + due date
  - Status change via dropdown on each card (drag-drop is stretch goal)
- **Table**: Sortable columns, bulk status change checkboxes
- Filters: client, type, assigned_to, date range

### 7d. Team Workload (`/portal/admin/team`)
**File:** `app/(portal)/portal/(dashboard)/admin/team/page.tsx`
- Groups deliverables by `assigned_to`
- Each person: name, count of active items, list of assignments
- Capacity indicator: green (<5), yellow (5-8), red (>8)
- Overdue items highlighted per person

---

## Phase 8: API Routes

### 8a. Deliverables CRUD
**File:** `app/api/portal/deliverables/route.ts`
- **GET**: List deliverables for current user (clients: own only, admins: all or filtered by client_id query param)
- **POST**: Create deliverable (admin only)
- **PATCH**: Update deliverable status/fields. Clients can only approve/reject items in "in_review" status. Admins can change any field.
- Auth check via Supabase server client + session
- Returns `{ success, data?, message? }`

### 8b. Messages
**File:** `app/api/portal/messages/route.ts`
- **GET**: List messages for client_id (from session or query param for admin)
- **POST**: Create message
  - If sender is client: store message, then check if AI can respond
  - AI response logic (simple rule-based for v1):
    - Pattern match for status questions → query deliverables, respond with status
    - Pattern match for timeline → respond with schedule info
    - Anything else → flag for admin ("I'll have the team get back to you")
  - AI messages: `sender_type='ai'`, `sender_name='Penny'`
- **PATCH**: Mark messages as read (`read = true`)

### 8c. Reports
**File:** `app/api/portal/reports/route.ts`
- **GET**: List reports for client
- **POST**: Create report (admin only) with title, summary, metrics JSONB, dropbox_path

### 8d. Clients (admin)
**File:** `app/api/portal/clients/route.ts`
- **GET**: List all client profiles (admin only)
- **POST**: Create new client profile + send magic link invite
- Uses service role client to create auth user + profile

### 8e. Dropbox preview links
**File:** `app/api/portal/dropbox/route.ts`
- **POST**: Takes `{ path }`, returns temporary Dropbox link
- Uses shared `getDropboxTemporaryLink()` from `lib/dropbox.ts`
- Auth required (any portal user)

---

## File Summary

| Phase | New Files | Modified Files |
|-------|-----------|----------------|
| 1 | `supabase/schema.sql` | `package.json`, `.env.local` |
| 2 | `lib/supabase/client.ts`, `lib/supabase/server.ts`, `lib/supabase/middleware.ts`, `lib/supabase/admin.ts`, `lib/dropbox.ts`, `lib/types/portal.ts` | `app/api/onboard/route.ts` (import from lib/dropbox) |
| 3 | `app/(marketing)/layout.tsx` | `app/layout.tsx` (strip Header/Footer). Move 6 page dirs into `(marketing)/` |
| 4 | `middleware.ts`, `app/api/auth/callback/route.ts`, `app/(portal)/portal/login/page.tsx` | — |
| 5 | `components/portal/Sidebar.tsx`, `components/portal/PortalHeader.tsx`, `app/(portal)/portal/(dashboard)/layout.tsx`, `components/portal/StatCard.tsx`, `components/portal/StatusBadge.tsx`, `components/portal/TypeBadge.tsx`, `components/portal/LoadingSkeleton.tsx`, `components/portal/EmptyState.tsx` | — |
| 6 | 5 client page files | — |
| 7 | 4 admin page files | — |
| 8 | 5 API route files | — |

**Total: ~30 new files, ~3 modified files, 6 moved directories**

---

## Verification

1. `npx next build` passes after each phase
2. After Phase 3: all existing marketing URLs (`/`, `/blog`, `/contact`, etc.) still work identically
3. After Phase 4: `/portal/login` renders, magic link sends email, callback creates session, unauthenticated users redirected to login
4. After Phase 5: authenticated users see sidebar layout, admin nav only visible to admins
5. After Phase 6: client dashboard shows data, content approval buttons work, messages send/receive
6. After Phase 7: admin overview shows all clients, pipeline view works, team workload displays
7. After Phase 8: all API routes return correct data, RLS policies enforce access control

## Prerequisites (user must do in Supabase dashboard)
1. Create Supabase project
2. Run the SQL schema from `supabase/schema.sql`
3. Enable magic link auth in Supabase Auth settings
4. Set redirect URL to `{site_url}/api/auth/callback`
5. Copy project URL, anon key, and service role key to env vars (local + Vercel)
