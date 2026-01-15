'use client';

import { useState } from 'react';
import Link from 'next/link';

interface SessionData {
  id: string;
}

export default function CreateSession() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<'partner1' | 'partner2' | null>(null);

  const createSession = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sessions', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setSession(data);
      }
    } catch (error) {
      console.error('Error creating session:', error);
    }
    setLoading(false);
  };

  const getLink = (partnerId: 'partner1' | 'partner2') => {
    if (!session) return '';
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}/quiz/separate/${session.id}/${partnerId}`;
  };

  const copyLink = async (partnerId: 'partner1' | 'partner2') => {
    const link = getLink(partnerId);
    await navigator.clipboard.writeText(link);
    setCopied(partnerId);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-6">🔗</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Create Quiz Session
          </h1>
          <p className="text-gray-600 mb-8">
            Generate unique links for you and your partner to take the quiz separately on your own devices.
          </p>
          <button
            onClick={createSession}
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Generate Links'}
          </button>
          <Link
            href="/"
            className="block mt-4 text-gray-500 hover:text-gray-700 text-sm"
          >
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">✨</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Links Ready!
          </h1>
          <p className="text-gray-600">
            Share these links with each partner. Results will appear once both have finished.
          </p>
        </div>

        <div className="space-y-4">
          {/* Partner 1 Link */}
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-blue-800">Partner 1</span>
              <button
                onClick={() => copyLink('partner1')}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition-colors"
              >
                {copied === 'partner1' ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
            <div className="text-sm text-blue-600 break-all bg-white rounded-lg p-2">
              {getLink('partner1')}
            </div>
          </div>

          {/* Partner 2 Link */}
          <div className="bg-purple-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-purple-800">Partner 2</span>
              <button
                onClick={() => copyLink('partner2')}
                className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg transition-colors"
              >
                {copied === 'partner2' ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
            <div className="text-sm text-purple-600 break-all bg-white rounded-lg p-2">
              {getLink('partner2')}
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-xl">
          <h3 className="font-medium text-gray-800 mb-2">How it works:</h3>
          <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
            <li>Send Partner 1's link to the first person</li>
            <li>Send Partner 2's link to the second person</li>
            <li>Each person completes the quiz on their own</li>
            <li>Results appear automatically when both finish</li>
          </ol>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Links expire in 24 hours
        </p>
      </div>
    </main>
  );
}
