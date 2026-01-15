import { NextResponse } from 'next/server';
import { savePartnerResponses } from '@/lib/session';
import { Response } from '@/types/quiz';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;
    const body = await request.json();
    const { partnerId, responses } = body as {
      partnerId: 'partner1' | 'partner2';
      responses: Response[];
    };

    if (!partnerId || !responses) {
      return NextResponse.json(
        { error: 'Missing partnerId or responses' },
        { status: 400 }
      );
    }

    const session = await savePartnerResponses(sessionId, partnerId, responses);

    if (!session) {
      return NextResponse.json(
        { error: 'Session not found or expired' },
        { status: 404 }
      );
    }

    return NextResponse.json(session);
  } catch (error) {
    console.error('Error saving responses:', error);
    return NextResponse.json(
      { error: 'Failed to save responses' },
      { status: 500 }
    );
  }
}
