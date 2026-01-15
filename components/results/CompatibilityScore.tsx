'use client';

import { CategoryScore } from '@/types/quiz';
import { getScoreLabel, getScoreColor } from '@/lib/scoring';

interface CompatibilityScoreProps {
  score: number;
  categoryScores: CategoryScore[];
}

export function CompatibilityScore({ score, categoryScores }: CompatibilityScoreProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
      <h2 className="text-lg font-medium text-gray-600 mb-2">
        Your Compatibility Score
      </h2>
      <div className={`text-7xl font-bold ${getScoreColor(score)} mb-2`}>
        {score}%
      </div>
      <p className="text-xl text-gray-700 mb-8">{getScoreLabel(score)}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categoryScores.map((cat) => (
          <div key={cat.category} className="bg-gray-50 rounded-xl p-4">
            <div className={`text-2xl font-bold ${getScoreColor(cat.score)}`}>
              {cat.score}%
            </div>
            <div className="text-sm text-gray-600">{cat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
