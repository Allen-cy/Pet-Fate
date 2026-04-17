import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export interface SessionData {
  answers: any[];
  dimScores: any;
  petResult: string;
  userId?: string;
}

export async function createSession(data: SessionData) {
  const { data: session, error } = await supabase
    .from("test_sessions")
    .insert({
      answers: data.answers,
      dim_scores: data.dimScores,
      pet_result: data.petResult,
      user_id: data.userId || null,
    })
    .select()
    .single();

  if (error) throw error;
  return session;
}

export async function getSession(sessionId: string) {
  const { data: session, error } = await supabase
    .from("test_sessions")
    .select("*")
    .eq("id", sessionId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return session;
}

export async function updateSessionPaid(sessionId: string) {
  const { error } = await supabase
    .from("test_sessions")
    .update({ is_paid: true, paid_at: new Date().toISOString() })
    .eq("id", sessionId);

  if (error) throw error;
}

export async function saveReport(sessionId: string, report: any) {
  const { data, error } = await supabase
    .from("reports")
    .insert({
      session_id: sessionId,
      type_name: report.typeName,
      why_fit: report.whyFit,
      daily_scene: report.dailyScene,
      reminder: report.reminder,
      keywords: report.keywords,
      personality_base: report.personalityBase || "",
      prophecy: report.prophecy || "",
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getReport(sessionId: string) {
  const { data: report, error } = await supabase
    .from("reports")
    .select("*")
    .eq("session_id", sessionId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return report;
}
