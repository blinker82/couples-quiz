'use client';

import { QuestionResult, MatchLevel } from '@/types/quiz';

interface QuestionBreakdownProps {
  results: QuestionResult[];
}

const categoryLabels: Record<string, string> = {
  communication: 'Communication',
  values: 'Values',
  lifestyle: 'Lifestyle',
  romance: 'Romance',
  conflict: 'Conflict Resolution',
  future: 'Future Plans',
};

function MatchIndicator({ matchLevel }: { matchLevel: MatchLevel }) {
  const config = {
    perfect: { emoji: '💚', label: 'Perfect Match', color: 'bg-green-100 text-green-700' },
    close: { emoji: '💛', label: 'Close', color: 'bg-yellow-100 text-yellow-700' },
    different: { emoji: '🧡', label: 'Different', color: 'bg-orange-100 text-orange-700' },
    opposite: { emoji: '❤️', label: 'Opposite', color: 'bg-red-100 text-red-700' },
  };

  const { emoji, label, color } = config[matchLevel];

  return (
    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${color}`}>
      <span>{emoji}</span>
      <span>{label}</span>
    </div>
  );
}

function getOptionText(options: { id: string; text: string }[], optionId: string): string {
  return options.find((o) => o.id === optionId)?.text || 'Unknown';
}

export function QuestionBreakdown({ results }: QuestionBreakdownProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Question-by-Question Analysis</h3>

      {results.map((result, index) => (
        <div key={result.question.id} className="bg-white rounded-xl shadow p-6">
          <div className="flex items-start justify-between mb-4 gap-4">
            <div className="flex-1">
              <span className="text-xs uppercase text-pink-600 tracking-wide font-medium">
                {categoryLabels[result.question.category]}
              </span>
              <h4 className="text-lg font-medium text-gray-800 mt-1">
                {result.question.text}
              </h4>
            </div>
            <MatchIndicator matchLevel={result.matchLevel} />
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm font-medium text-blue-800 mb-1">Partner 1</div>
              <div className="text-gray-700">
                {getOptionText(result.question.options, result.partner1Response.selectedOptionId)}
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-sm font-medium text-purple-800 mb-1">Partner 2</div>
              <div className="text-gray-700">
                {getOptionText(result.question.options, result.partner2Response.selectedOptionId)}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-700 mb-1">Insight</div>
            <p className="text-gray-600">{result.insight}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
