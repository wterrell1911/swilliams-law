-- Law Firm Template — CRM Schema (Law Firm Client Management)
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- These tables power the internal CRM for managing law firm clients,
-- their leads, tasks, and monthly performance metrics.

-- ============================================
-- CUSTOM TYPES
-- ============================================

DO $$ BEGIN
  CREATE TYPE package_tier AS ENUM ('foundation', 'growth', 'scale');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE client_status AS ENUM ('prospect', 'active', 'paused', 'churned');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE lead_source_type AS ENUM ('call', 'form', 'chat');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'converted', 'lost');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE task_category AS ENUM ('seo', 'content', 'gbp', 'technical', 'billing', 'other');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE task_status AS ENUM ('todo', 'in_progress', 'done');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ============================================
-- CLIENTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS clients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  firm_name TEXT NOT NULL,
  attorney_name TEXT,
  email TEXT,
  phone TEXT,
  website_url TEXT,
  package_tier package_tier DEFAULT 'foundation',
  monthly_rate INTEGER DEFAULT 0, -- cents
  status client_status DEFAULT 'prospect',
  start_date DATE,
  callrail_account_id TEXT,
  ga4_property_id TEXT,
  search_console_url TEXT,
  gbp_location_id TEXT,
  google_sheet_id TEXT,
  api_key TEXT UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- LEADS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  timestamp TIMESTAMPTZ DEFAULT now(),
  source_type lead_source_type DEFAULT 'form',
  marketing_source TEXT,
  name TEXT,
  phone TEXT,
  email TEXT,
  message TEXT,
  practice_area TEXT,
  landing_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  call_duration INTEGER, -- seconds
  call_recording_url TEXT,
  status lead_status DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- TASKS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  category task_category DEFAULT 'other',
  status task_status DEFAULT 'todo',
  due_date DATE,
  assigned_to TEXT DEFAULT 'Will',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- MONTHLY METRICS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS monthly_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  month DATE NOT NULL, -- first of month
  organic_traffic INTEGER DEFAULT 0,
  total_leads INTEGER DEFAULT 0,
  leads_from_organic INTEGER DEFAULT 0,
  leads_from_maps INTEGER DEFAULT 0,
  leads_from_paid INTEGER DEFAULT 0,
  leads_from_lsa INTEGER DEFAULT 0,
  leads_from_direct INTEGER DEFAULT 0,
  top_keyword_position DECIMAL,
  google_reviews_count INTEGER DEFAULT 0,
  revenue_collected INTEGER DEFAULT 0, -- cents
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(client_id, month)
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_metrics ENABLE ROW LEVEL SECURITY;

-- Admin-only access (uses service role key, so RLS is bypassed in API routes)
-- These policies allow admin users via Supabase auth to access if needed
CREATE POLICY "admins_all_clients" ON clients
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admins_all_leads" ON leads
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admins_all_tasks" ON tasks
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admins_all_monthly_metrics" ON monthly_metrics
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_leads_client_id ON leads(client_id);
CREATE INDEX IF NOT EXISTS idx_leads_timestamp ON leads(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_leads_client_timestamp ON leads(client_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_tasks_client_id ON tasks(client_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_monthly_metrics_client_id ON monthly_metrics(client_id);
CREATE INDEX IF NOT EXISTS idx_monthly_metrics_month ON monthly_metrics(month DESC);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_api_key ON clients(api_key);

-- ============================================
-- AUTO-UPDATE updated_at TRIGGERS
-- ============================================

CREATE TRIGGER clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER tasks_updated_at
  BEFORE UPDATE ON tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================
-- SEED DATA: The CASE Firm (Test Client)
-- ============================================

INSERT INTO clients (firm_name, attorney_name, email, phone, website_url, package_tier, monthly_rate, status, start_date, notes)
VALUES (
  'The CASE Firm',
  'Carlissa A. Shaw, Esq.',
  'carlissa@cshawlaw.com',
  '901-555-0100',
  'https://cshawlaw.com',
  'growth',
  250000, -- $2,500/mo in cents
  'active',
  '2025-01-15',
  'Criminal Defense, Memphis TN. Seed data for template CRM.'
)
ON CONFLICT DO NOTHING;
