import { Answer } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface FetchOptions extends RequestInit {
  timeout?: number;
}

async function fetchWithTimeout<T>(url: string, options: FetchOptions = {}): Promise<T> {
  const { timeout = 30000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

export interface CreateSessionResponse {
  sessionId: string;
  petResult: string;
  dimScores?: Record<string, Record<string, number>>;
}

export interface ReportResponse {
  id?: string;
  session_id?: string;
  type_name?: string;
  why_fit?: string;
  daily_scene?: string;
  reminder?: string;
  keywords?: string[];
  personality_base?: string;
  prophecy?: string;
  ai_model?: string;
  created_at?: string;
}

export interface CreatePaymentResponse {
  orderId: string;
  sessionId: string;
  amount: number;
  status: string;
  paymentUrl?: string;
}

export async function createSession(answers: Answer[]): Promise<CreateSessionResponse> {
  return fetchWithTimeout<CreateSessionResponse>(`${API_BASE_URL}/api/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ answers }),
  });
}

export async function getSession(sessionId: string): Promise<any> {
  return fetchWithTimeout<any>(`${API_BASE_URL}/api/session/${sessionId}`);
}

export async function generateReport(sessionId: string): Promise<ReportResponse> {
  return fetchWithTimeout<ReportResponse>(`${API_BASE_URL}/api/generate-report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId }),
  });
}

export async function getReport(sessionId: string): Promise<ReportResponse> {
  return fetchWithTimeout<ReportResponse>(`${API_BASE_URL}/api/report/${sessionId}`);
}

export async function createPayment(sessionId: string): Promise<CreatePaymentResponse> {
  return fetchWithTimeout<CreatePaymentResponse>(`${API_BASE_URL}/api/pay/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId }),
  });
}

export async function checkPaymentStatus(paymentId: string): Promise<{ paid: boolean }> {
  return fetchWithTimeout<{ paid: boolean }>(`${API_BASE_URL}/api/pay/status/${paymentId}`);
}
