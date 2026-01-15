import {
  Question,
  Response,
  QuizResults,
  CategoryScore,
  QuestionResult,
  QuestionCategory,
  MatchLevel,
} from '@/types/quiz';

const categoryLabels: Record<QuestionCategory, string> = {
  communication: 'Communication',
  values: 'Shared Values',
  lifestyle: 'Lifestyle',
  romance: 'Romance & Affection',
  conflict: 'Conflict Resolution',
  future: 'Future Plans',
};

function getMatchLevel(
  p1OptionId: string,
  p2OptionId: string,
  valueDiff: number
): MatchLevel {
  if (p1OptionId === p2OptionId) return 'perfect';
  if (valueDiff <= 1) return 'close';
  if (valueDiff <= 2) return 'different';
  return 'opposite';
}

function generateQuestionInsight(
  question: Question,
  matchLevel: MatchLevel,
  p1Value: number,
  p2Value: number
): string {
  const insights: Record<string, Record<MatchLevel, string>> = {
    communication: {
      perfect: "You're completely in sync on how you communicate!",
      close: "You have similar communication styles with minor differences to explore.",
      different: "Your communication approaches differ - this is a great area for growth.",
      opposite: "You have very different communication styles - understanding each other's needs will be key.",
    },
    values: {
      perfect: "Your core values are perfectly aligned!",
      close: "You share most of the same values with small variations.",
      different: "You have different perspectives on this value - open dialogue will help.",
      opposite: "This is a significant difference in values - important to discuss openly.",
    },
    lifestyle: {
      perfect: "You want the same things from your lifestyle!",
      close: "Your lifestyle preferences mostly align.",
      different: "Different lifestyle preferences can complement each other.",
      opposite: "Very different lifestyle wants - compromise will be important here.",
    },
    romance: {
      perfect: "You're perfectly matched in how you express and receive love!",
      close: "Your romantic needs are quite similar.",
      different: "Learning each other's love language will strengthen your bond.",
      opposite: "Different romantic styles - understanding these differences is key to connection.",
    },
    conflict: {
      perfect: "You handle conflict the same way!",
      close: "Your conflict resolution styles are compatible.",
      different: "Different approaches to conflict can actually help if you communicate.",
      opposite: "Very different conflict styles - patience and understanding are crucial.",
    },
    future: {
      perfect: "You share the same vision for the future!",
      close: "Your future plans mostly align.",
      different: "Some differences in future goals - worth discussing together.",
      opposite: "Significant differences in future plans - this deserves an open conversation.",
    },
  };

  return insights[question.category]?.[matchLevel] || "Consider discussing this topic together.";
}

export function calculateCompatibility(
  partner1Responses: Response[],
  partner2Responses: Response[],
  questions: Question[]
): QuizResults {
  let totalWeightedScore = 0;
  let maxPossibleScore = 0;

  const categoryScoresMap: Record<QuestionCategory, { score: number; max: number }> = {
    communication: { score: 0, max: 0 },
    values: { score: 0, max: 0 },
    lifestyle: { score: 0, max: 0 },
    romance: { score: 0, max: 0 },
    conflict: { score: 0, max: 0 },
    future: { score: 0, max: 0 },
  };

  const questionBreakdown: QuestionResult[] = [];

  for (const question of questions) {
    const p1 = partner1Responses.find((r) => r.questionId === question.id);
    const p2 = partner2Responses.find((r) => r.questionId === question.id);

    if (!p1 || !p2) continue;

    const valueDiff = Math.abs(p1.selectedValue - p2.selectedValue);
    const maxDiff = 4;
    const matchScore = Math.round((1 - valueDiff / maxDiff) * 100);
    const matchLevel = getMatchLevel(p1.selectedOptionId, p2.selectedOptionId, valueDiff);

    const weightedScore = matchScore * question.weight;
    const weightedMax = 100 * question.weight;

    totalWeightedScore += weightedScore;
    maxPossibleScore += weightedMax;

    categoryScoresMap[question.category].score += weightedScore;
    categoryScoresMap[question.category].max += weightedMax;

    questionBreakdown.push({
      question,
      partner1Response: p1,
      partner2Response: p2,
      isMatch: matchLevel === 'perfect' || matchLevel === 'close',
      matchLevel,
      insight: generateQuestionInsight(question, matchLevel, p1.selectedValue, p2.selectedValue),
    });
  }

  const overallScore = maxPossibleScore > 0
    ? Math.round((totalWeightedScore / maxPossibleScore) * 100)
    : 0;

  const categoryScores: CategoryScore[] = Object.entries(categoryScoresMap).map(
    ([category, { score, max }]) => ({
      category: category as QuestionCategory,
      score: max > 0 ? Math.round((score / max) * 100) : 0,
      label: categoryLabels[category as QuestionCategory],
    })
  );

  return {
    sessionId: '',
    overallScore,
    categoryScores,
    questionBreakdown,
    insights: [],
  };
}

export function getScoreLabel(score: number): string {
  if (score >= 90) return 'Soulmates!';
  if (score >= 75) return 'Highly Compatible';
  if (score >= 60) return 'Great Match';
  if (score >= 45) return 'Good Foundation';
  return 'Room to Grow';
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-500';
  if (score >= 60) return 'text-yellow-500';
  if (score >= 40) return 'text-orange-500';
  return 'text-red-500';
}
