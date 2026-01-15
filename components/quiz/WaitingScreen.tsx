'use client';

import { useEffect, useState } from 'react';

interface WaitingScreenProps {
  sessionId: string;
  partnerName?: string;
  onBothComplete: () => void;
}

export function WaitingScreen({ sessionId, partnerName = 'your partner', onBothComplete }: WaitingScreenProps) {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch(`/api/sessions/${sessionId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.status === 'both_complete') {
            onBothComplete();
          }
        }
      } catch (error) {
        console.error('Error polling session status:', error);
      }
    }, 3000);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(pollInterval);
    };
  }, [sessionId, onBothComplete]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-6">⏳</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Waiting for {partnerName}{dots}
        </h2>
        <p className="text-gray-600 mb-6">
          You've completed your part! Once {partnerName} finishes, you'll both see the results.
        </p>
        <div className="w-16 h-16 mx-auto">
          <div className="w-full h-full border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-sm text-gray-500 mt-8">
          This page will automatically update when both partners have finished.
        </p>
      </div>
    </div>
  );
}
