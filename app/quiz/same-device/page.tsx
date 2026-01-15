'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import { PartnerTransition } from '@/components/quiz/PartnerTransition';
import { useQuizStore } from '@/stores/quizStore';
import { QUIZ_QUESTIONS } from '@/lib/questions';

type QuizPhase = 'partner1-intro' | 'partner1-quiz' | 'transition' | 'partner2-quiz' | 'complete';

export default function SameDeviceQuiz() {
  const router = useRouter();
  const [phase, setPhase] = useState<QuizPhase>('partner1-intro');
  const [mounted, setMounted] = useState(false);

  const {
    currentQuestionIndex,
    partner1Responses,
    partner2Responses,
    addResponse,
    nextQuestion,
    previousQuestion,
    setQuestionIndex,
    markPartnerComplete,
    setMode,
    resetQuiz,
    getResponse,
  } = useQuizStore();

  useEffect(() => {
    setMounted(true);
    resetQuiz();
    setMode('same-device');
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const currentPartner = phase === 'partner1-quiz' ? 'partner1' : 'partner2';
  const currentResponses = currentPartner === 'partner1' ? partner1Responses : partner2Responses;
  const selectedOptionId = getResponse(currentPartner, currentQuestion?.id)?.selectedOptionId || null;

  const handleSelect = (optionId: string, value: number) => {
    addResponse(currentPartner, {
      questionId: currentQuestion.id,
      selectedOptionId: optionId,
      selectedValue: value,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      nextQuestion();
    } else {
      if (phase === 'partner1-quiz') {
        markPartnerComplete('partner1');
        setQuestionIndex(0);
        setPhase('transition');
      } else if (phase === 'partner2-quiz') {
        markPartnerComplete('partner2');
        setPhase('complete');
        router.push('/results/same-device');
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      previousQuestion();
    }
  };

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  if (phase === 'partner1-intro') {
    return (
      <PartnerTransition
        partnerNumber={1}
        onReady={() => setPhase('partner1-quiz')}
      />
    );
  }

  if (phase === 'transition') {
    return (
      <PartnerTransition
        partnerNumber={2}
        onReady={() => setPhase('partner2-quiz')}
      />
    );
  }

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              {phase === 'partner1-quiz' ? 'Partner 1' : 'Partner 2'}
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
          totalQuestions={totalQuestions}
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
            disabled={!selectedOptionId}
            className={`px-8 py-3 rounded-xl font-semibold transition-all ${
              selectedOptionId
                ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentQuestionIndex === totalQuestions - 1
              ? phase === 'partner1-quiz'
                ? 'Done - Pass Device'
                : 'See Results'
              : 'Next'}
          </button>
        </div>
      </div>
    </main>
  );
}
