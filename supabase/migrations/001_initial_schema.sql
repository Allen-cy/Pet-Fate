-- Your Pet Fate Database Schema
-- Supabase Migration

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  openid TEXT UNIQUE,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Test sessions table
CREATE TABLE test_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  answers JSONB NOT NULL,
  dim_scores JSONB NOT NULL,
  pet_result TEXT NOT NULL,
  is_paid BOOLEAN DEFAULT false,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES test_sessions(id) ON DELETE CASCADE,
  type_name TEXT,
  why_fit TEXT,
  daily_scene TEXT,
  reminder TEXT,
  keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Test sessions policies
CREATE POLICY "Users can read own sessions"
  ON test_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can create sessions"
  ON test_sessions FOR INSERT
  WITH CHECK (true);

-- Reports policies
CREATE POLICY "Users can read own reports"
  ON reports FOR SELECT
  USING (
    session_id IN (
      SELECT id FROM test_sessions WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can create reports"
  ON reports FOR INSERT
  WITH CHECK (true);

-- Indexes
CREATE INDEX idx_sessions_user_id ON test_sessions(user_id);
CREATE INDEX idx_sessions_created_at ON test_sessions(created_at DESC);
CREATE INDEX idx_reports_session_id ON reports(session_id);
