'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import { WaitingScreen } from '@/components/quiz/WaitingScreen';
import { QUIZ_QUESTIONS } from '@/lib/questions';
import { Response, QuizSession } from '@/types/quiz';

type PartnerId = 'partner1' | 'partner2';

export default function SeparateQuiz({
  params,
}: {
  params: Promise<{ sessionId: string; partnerId: string }>;
}) {
  const { sessionId, partnerId: partnerIdParam } = use(params);
  const partnerId = partnerIdParam as PartnerId;
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<QuizSession | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Response[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchSession();
  }, [sessionId]);

  const fetchSession = async () => {
    try {
      const res = await fetch(`/api/sessions/${sessionId}`);
      if (!res.ok) {
        setError('Session not found or expired');
        return;
      }
      const data = await res.json();
      setSession(data);

      // Check if this partner already completed
      const partnerData = data[partnerId];
      if (partnerData?.completedAt) {
        setSubmitted(true);
        setResponses(partnerData.responses);
      }
    } catch (err) {
      setError('Failed to load session');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (optionId: string, value: number) => {
    const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
    setResponses((prev) => {
      const existing = prev.findIndex((r) => r.questionId === currentQuestion.id);
      const newResponse: Response = {
        questionId: currentQuestion.id,
        selectedOptionId: optionId,
        selectedValue: value,
      };
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newResponse;
        return updated;
      }
      return [...prev, newResponse];
    });
  };

  const handleNext = async () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      await submitResponses();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const submitResponses = async () => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/sessions/${sessionId}/responses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ partnerId, responses }),
      });

      if (res.ok) {
        const data = await res.json();
        setSession(data);
        setSubmitted(true);

        if (data.status === 'both_complete') {
          router.push(`/results/${sessionId}`);
        }
      }
    } catch (err) {
      console.error('Error submitting responses:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBothComplete = () => {
    router.push(`/results/${sessionId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-5xl mb-4">😕</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">{error}</h2>
          <p className="text-gray-600 mb-6">
            The quiz link may have expired or is invalid.
          </p>
          <a
            href="/"
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-xl"
          >
            Start New Quiz
          </a>
        </div>
      </div>
    );
  }

  if (submitted && session?.status !== 'both_complete') {
    return (
      <WaitingScreen
        sessionId={sessionId}
        partnerName={partnerId === 'partner1' ? 'Partner 2' : 'Partner 1'}
        onBothComplete={handleBothComplete}
      />
    );
  }

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const currentResponse = responses.find((r) => r.questionId === currentQuestion.id);
  const selectedOptionId = currentResponse?.selectedOptionId || null;
  const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              {partnerId === 'partner1' ? 'Partner 1' : 'Partner 2'}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% complete
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <QuestionCard
          question={currentQuestion}
          selectedOptionId={selectedOptionId}
          onSelect={handleSelect}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={QUIZ_QUESTIONS.length}
        />

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              currentQuestionIndex === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!selectedOptionId || submitting}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              selectedOptionId && !submitting
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {submitting
              ? 'Submitting...'
              : currentQuestionIndex === QUIZ_QUESTIONS.length - 1
              ? 'Submit'
              : 'Next'}
          </button>
        </div>
      </div>
    </main>
  );
}
