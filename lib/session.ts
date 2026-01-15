import { QuizSession, Response } from '@/types/quiz';

// In-memory session storage
// Note: Sessions persist only within the same serverless instance
// For production, use a database like Vercel KV, Upstash Redis, or MongoDB
const sessions = new Map<string, QuizSession>();

export async function createSession(): Promise<QuizSession> {
  const sessionId = generateSessionId();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours

  const session: QuizSession = {
    id: sessionId,
    mode: 'separate',
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    partner1: {
      id: 'partner1',
      responses: [],
    },
    partner2: {
      id: 'partner2',
      responses: [],
    },
    status: 'created',
  };

  sessions.set(sessionId, session);
  return session;
}

export async function getSession(sessionId: string): Promise<QuizSession | null> {
  const session = sessions.get(sessionId);

  if (!session) return null;

  // Check if expired
  if (new Date(session.expiresAt) < new Date()) {
    sessions.delete(sessionId);
    return null;
  }

  return session;
}

export async function savePartnerResponses(
  sessionId: string,
  partnerId: 'partner1' | 'partner2',
  responses: Response[]
): Promise<QuizSession | null> {
  const session = sessions.get(sessionId);

  if (!session) return null;

  session[partnerId].responses = responses;
  session[partnerId].completedAt = new Date().toISOString();

  // Update status
  const p1Done = session.partner1.completedAt !== undefined;
  const p2Done = session.partner2.completedAt !== undefined;

  if (p1Done && p2Done) {
    session.status = 'both_complete';
  } else if (p1Done) {
    session.status = 'partner1_complete';
  } else if (p2Done) {
    session.status = 'partner2_complete';
  }

  sessions.set(sessionId, session);
  return session;
}

function generateSessionId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
