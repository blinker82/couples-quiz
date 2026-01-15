'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { CompatibilityScore } from '@/components/results/CompatibilityScore';
import { QuestionBreakdown } from '@/components/results/QuestionBreakdown';
import { calculateCompatibility } from '@/lib/scoring';
import { QUIZ_QUESTIONS } from '@/lib/questions';
import { QuizResults, QuizSession } from '@/types/quiz';

export default function SessionResults({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = use(params);
  const [results, setResults] = useState<QuizResults | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, [sessionId]);

  const fetchResults = async () => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}`);
      if (!res.ok) {
        setError('Session not found or expired');
        return;
      }

      const session: QuizSession = await res.json();

      if (session.status !== 'both_complete') {
        setError('Both partners need to complete the quiz to see results');
        return;
      }

      const calculatedResults = calculateCompatibility(
        session.partner1.responses,
        session.partner2.responses,
        QUIZ_QUESTIONS
      );
      calculatedResults.sessionId = sessionId;
      setResults(calculatedResults);
    } catch (err) {
      setError('Failed to load results');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Can't Show Results</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link
            href="/"
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-xl"
          >
            Start New Quiz
          </Link>
        </div>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Your Results</h1>
          <p className="text-gray-600">Here's how compatible you are!</p>
        </div>

        <div className="mb-8">
          <CompatibilityScore
            score={results.overallScore}
            categoryScores={results.categoryScores}
          />
        </div>

        <div className="mb-8">
          <QuestionBreakdown results={results.questionBreakdown} />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/quiz/separate/create"
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl text-center"
          >
            Take Quiz Again
          </Link>
          <Link
            href="/"
            className="px-8 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all text-center"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
