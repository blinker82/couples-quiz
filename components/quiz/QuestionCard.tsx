'use client';

import { Question } from '@/types/quiz';

interface QuestionCardProps {
  question: Question;
  selectedOptionId: string | null;
  onSelect: (optionId: string, value: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

const categoryLabels: Record<string, string> = {
  communication: 'Communication',
  values: 'Values',
  lifestyle: 'Lifestyle',
  romance: 'Romance',
  conflict: 'Conflict Resolution',
  future: 'Future Plans',
};

export function QuestionCard({
  question,
  selectedOptionId,
  onSelect,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">
          Question {questionNumber} of {totalQuestions}
        </span>
        <span className="text-xs uppercase tracking-wide text-pink-600 font-medium px-3 py-1 bg-pink-50 rounded-full">
          {categoryLabels[question.category]}
        </span>
      </div>

      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
        {question.text}
      </h2>

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id, option.value)}
            className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
              selectedOptionId === option.id
                ? 'border-pink-500 bg-pink-50 text-pink-900'
                : 'border-gray-200 hover:border-pink-300 hover:bg-gray-50'
            }`}
          >
            <span className="text-base">{option.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
