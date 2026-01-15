import { NextResponse } from 'next/server';
import { createSession } from '@/lib/session';

export async function POST() {
  try {
    const session = await createSession();
    return NextResponse.json(session);
  } catch (error) {
    console.error('Error creating session:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}
