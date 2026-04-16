-- Law Firm Template — Client Portal Schema
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- ============================================
-- TABLES
-- ============================================

CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  role TEXT CHECK (role IN ('client', 'admin')) DEFAULT 'client',
  firm_name TEXT,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  dropbox_folder TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE deliverables (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  type TEXT CHECK (type IN ('blog_post', 'social_post', 'video', 'newsletter', 'seo_update', 'reputation', 'other')),
  status TEXT CHECK (status IN ('draft', 'in_review', 'approved', 'scheduled', 'published', 'rejected')) DEFAULT 'draft',
  assigned_to TEXT,
  due_date DATE,
  published_date DATE,
  dropbox_path TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES profiles(id),
  sender_type TEXT CHECK (sender_type IN ('client', 'admin', 'ai')),
  sender_name TEXT,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES profiles(id),
  month DATE NOT NULL,
  title TEXT,
  summary TEXT,
  metrics JSONB,
  dropbox_path TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Clients see only their own data
CREATE POLICY "clients_own_profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "clients_own_deliverables" ON deliverables
  FOR SELECT USING (client_id = auth.uid());

CREATE POLICY "clients_own_messages" ON messages
  FOR ALL USING (client_id = auth.uid());

CREATE POLICY "clients_own_reports" ON reports
  FOR SELECT USING (client_id = auth.uid());

-- Admins see everything
CREATE POLICY "admins_all_profiles" ON profiles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admins_all_deliverables" ON deliverables
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admins_all_messages" ON messages
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "admins_all_reports" ON reports
  FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- HELPER: auto-update updated_at on deliverables
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER deliverables_updated_at
  BEFORE UPDATE ON deliverables
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
