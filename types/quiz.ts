export type QuestionCategory =
  | 'communication'
  | 'values'
  | 'lifestyle'
  | 'romance'
  | 'conflict'
  | 'future';

export interface Option {
  id: string;
  text: string;
  value: number;
}

export interface Question {
  id: string;
  text: string;
  category: QuestionCategory;
  options: Option[];
  weight: number;
}

export interface Response {
  questionId: string;
  selectedOptionId: string;
  selectedValue: number;
}

export interface PartnerData {
  id: string;
  name?: string;
  responses: Response[];
  completedAt?: string;
}

export type SessionStatus =
  | 'created'
  | 'partner1_complete'
  | 'partner2_complete'
  | 'both_complete';

export interface QuizSession {
  id: string;
  mode: 'same-device' | 'separate';
  createdAt: string;
  expiresAt: string;
  partner1: PartnerData;
  partner2: PartnerData;
  status: SessionStatus;
}

export interface CategoryScore {
  category: QuestionCategory;
  score: number;
  label: string;
}

export type MatchLevel = 'perfect' | 'close' | 'different' | 'opposite';

export interface QuestionResult {
  question: Question;
  partner1Response: Response;
  partner2Response: Response;
  isMatch: boolean;
  matchLevel: MatchLevel;
  insight: string;
}

export type InsightType = 'strength' | 'growth' | 'tip';

export interface Insight {
  type: InsightType;
  category: QuestionCategory;
  title: string;
  description: string;
}

export interface QuizResults {
  sessionId: string;
  overallScore: number;
  categoryScores: CategoryScore[];
  questionBreakdown: QuestionResult[];
  insights: Insight[];
}
