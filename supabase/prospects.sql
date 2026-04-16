-- Law Firm Template — Prospects (Sales CRM) Schema
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- ============================================
-- PROSPECTS TABLE
-- ============================================

CREATE TABLE prospects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  firm_name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  website TEXT,
  status TEXT CHECK (status IN ('lead', 'contacted', 'audit_sent', 'meeting_scheduled', 'proposal_sent', 'won', 'lost')) DEFAULT 'lead',
  source TEXT, -- e.g., 'referral', 'website', 'linkedin', 'cold_outreach'
  audit_date TIMESTAMPTZ,
  meeting_date TIMESTAMPTZ,
  last_contact TIMESTAMPTZ,
  notes TEXT,
  estimated_value INTEGER, -- Monthly value in dollars
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;

-- Only admins can access prospects
CREATE POLICY "admins_all_prospects" ON prospects
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- AUTO-UPDATE updated_at
-- ============================================

CREATE TRIGGER prospects_updated_at
  BEFORE UPDATE ON prospects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============================================
-- SEED DATA: 6 Audit Targets
-- ============================================

INSERT INTO prospects (firm_name, contact_name, website, status, source, notes, estimated_value) VALUES
  ('S Williams Law Firm', 'Sunnie Williams', 'swilliamslawfirm.com', 'audit_sent', 'referral', 'Pro bono case study - delivered full audit 2/4', 0),
  ('Martin and Martin', NULL, NULL, 'lead', 'target_list', 'Mississippi firm - validation target', 2000),
  ('Glassman, Wyatt, Tuttle and Cox', NULL, NULL, 'lead', 'target_list', 'Memphis firm - validation target', 2500),
  ('Thompson Law Group', NULL, NULL, 'lead', 'target_list', 'Potential target', 2000),
  ('Baker & Associates', NULL, NULL, 'lead', 'target_list', 'Potential target', 2000),
  ('Harris Legal Services', NULL, NULL, 'lead', 'target_list', 'Potential target', 2000);
