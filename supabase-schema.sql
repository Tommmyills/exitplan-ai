-- ExitPlan AI — Supabase Schema
-- Run this in your Supabase SQL editor

-- Relocation plans table
CREATE TABLE IF NOT EXISTS reloc_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  quiz_answers JSONB NOT NULL,
  recommendations JSONB NOT NULL,
  is_premium BOOLEAN DEFAULT false,
  stripe_session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast session lookups
CREATE INDEX IF NOT EXISTS idx_reloc_plans_session_id ON reloc_plans(session_id);

-- Enable Row Level Security
ALTER TABLE reloc_plans ENABLE ROW LEVEL SECURITY;

-- Allow all inserts (anonymous users can save their plan)
CREATE POLICY "Allow anonymous inserts" ON reloc_plans
  FOR INSERT WITH CHECK (true);

-- Allow reads by session_id (no auth needed for MVP)
CREATE POLICY "Allow reads by session" ON reloc_plans
  FOR SELECT USING (true);

-- Allow updates (for premium upgrade)
CREATE POLICY "Allow updates" ON reloc_plans
  FOR UPDATE USING (true);

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER reloc_plans_updated_at
  BEFORE UPDATE ON reloc_plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
