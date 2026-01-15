'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CompatibilityScore } from '@/components/results/CompatibilityScore';
import { QuestionBreakdown } from '@/components/results/QuestionBreakdown';
import { useQuizStore } from '@/stores/quizStore';
import { calculateCompatibility } from '@/lib/scoring';
import { QUIZ_QUESTIONS } from '@/lib/questions';
import { QuizResults } from '@/types/quiz';

export default function SameDeviceResults() {
  const router = useRouter();
  const [results, setResults] = useState<QuizResults | null>(null);
  const [mounted, setMounted] = useState(false);

  const { partner1Responses, partner2Responses, partner1Complete, partner2Complete, resetQuiz } =
    useQuizStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (!partner1Complete || !partner2Complete) {
      router.push('/quiz/same-device');
      return;
    }

    const calculatedResults = calculateCompatibility(
      partner1Responses,
      partner2Responses,
      QUIZ_QUESTIONS
    );
    setResults(calculatedResults);
  }, [mounted, partner1Complete, partner2Complete, partner1Responses, partner2Responses, router]);

  const handleTakeAgain = () => {
    resetQuiz();
    router.push('/');
  };

  if (!mounted || !results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Calculating your compatibility...</p>
        </div>
      </div>
    );
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
          <button
            onClick={handleTakeAgain}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
          >
            Take Quiz Again
          </button>
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
