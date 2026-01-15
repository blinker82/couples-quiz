import { Question } from '@/types/quiz';

export interface QuizSet {
  id: string;
  name: string;
  description: string;
  emoji: string;
  questions: Question[];
}

// Classic relationship questions
const classicQuestions: Question[] = [
  {
    id: 'comm-1',
    text: 'When we have a disagreement, I prefer to:',
    category: 'communication',
    weight: 3,
    options: [
      { id: 'a', text: 'Talk it out immediately until resolved', value: 5 },
      { id: 'b', text: 'Take some time to cool off, then discuss', value: 4 },
      { id: 'c', text: 'Write down my thoughts before talking', value: 3 },
      { id: 'd', text: 'Wait for the tension to pass naturally', value: 2 },
    ],
  },
  {
    id: 'comm-2',
    text: 'How often do you think couples should have deep, meaningful conversations?',
    category: 'communication',
    weight: 2,
    options: [
      { id: 'a', text: 'Daily - connection is everything', value: 5 },
      { id: 'b', text: 'A few times a week', value: 4 },
      { id: 'c', text: 'Weekly is enough', value: 3 },
      { id: 'd', text: 'When something important comes up', value: 2 },
    ],
  },
  {
    id: 'comm-3',
    text: 'When my partner is upset, I naturally tend to:',
    category: 'communication',
    weight: 2,
    options: [
      { id: 'a', text: 'Offer advice and solutions', value: 3 },
      { id: 'b', text: 'Listen and validate their feelings', value: 5 },
      { id: 'c', text: 'Give them space until they\'re ready', value: 2 },
      { id: 'd', text: 'Try to cheer them up or distract them', value: 4 },
    ],
  },
  {
    id: 'val-1',
    text: 'How important is financial stability before major life decisions?',
    category: 'values',
    weight: 3,
    options: [
      { id: 'a', text: 'Very important - need solid foundation first', value: 5 },
      { id: 'b', text: 'Important but not a dealbreaker', value: 4 },
      { id: 'c', text: 'Love matters more than money', value: 2 },
      { id: 'd', text: 'We\'ll figure it out as we go', value: 1 },
    ],
  },
  {
    id: 'val-2',
    text: 'How much involvement should extended family have in our decisions?',
    category: 'values',
    weight: 2,
    options: [
      { id: 'a', text: 'Family opinions are very important', value: 4 },
      { id: 'b', text: 'We listen but make our own decisions', value: 3 },
      { id: 'c', text: 'Our relationship is private - minimal involvement', value: 2 },
      { id: 'd', text: 'It depends on the decision', value: 3 },
    ],
  },
  {
    id: 'life-1',
    text: 'My ideal weekend together looks like:',
    category: 'lifestyle',
    weight: 1,
    options: [
      { id: 'a', text: 'Adventures - hiking, traveling, trying new things', value: 4 },
      { id: 'b', text: 'Relaxing at home - movies, cooking, cozy time', value: 3 },
      { id: 'c', text: 'Social activities - friends, parties, events', value: 2 },
      { id: 'd', text: 'A mix of together time and personal space', value: 4 },
    ],
  },
  {
    id: 'life-2',
    text: 'How do you feel about alone time in a relationship?',
    category: 'lifestyle',
    weight: 2,
    options: [
      { id: 'a', text: 'I need regular alone time to recharge', value: 3 },
      { id: 'b', text: 'Some alone time is nice but I prefer togetherness', value: 4 },
      { id: 'c', text: 'I rarely need alone time', value: 5 },
      { id: 'd', text: 'We can be "alone together" - same room, different activities', value: 4 },
    ],
  },
  {
    id: 'rom-1',
    text: 'How do you prefer to receive love and affection?',
    category: 'romance',
    weight: 2,
    options: [
      { id: 'a', text: 'Words of affirmation - compliments, "I love you"', value: 4 },
      { id: 'b', text: 'Physical touch - hugs, kisses, holding hands', value: 4 },
      { id: 'c', text: 'Quality time - undivided attention', value: 4 },
      { id: 'd', text: 'Acts of service - help with tasks, thoughtful gestures', value: 4 },
    ],
  },
  {
    id: 'rom-2',
    text: 'How often should couples go on "real" dates?',
    category: 'romance',
    weight: 1,
    options: [
      { id: 'a', text: 'At least once a week', value: 5 },
      { id: 'b', text: 'A few times a month', value: 4 },
      { id: 'c', text: 'Once a month is fine', value: 3 },
      { id: 'd', text: 'Special occasions are enough', value: 2 },
    ],
  },
  {
    id: 'conf-1',
    text: 'After a big argument, I typically:',
    category: 'conflict',
    weight: 3,
    options: [
      { id: 'a', text: 'Want to make up as soon as possible', value: 5 },
      { id: 'b', text: 'Need time to process before reconciling', value: 3 },
      { id: 'c', text: 'Expect an apology before moving forward', value: 2 },
      { id: 'd', text: 'Move on quickly without much discussion', value: 2 },
    ],
  },
  {
    id: 'fut-1',
    text: 'Where do you see yourself living in 5-10 years?',
    category: 'future',
    weight: 2,
    options: [
      { id: 'a', text: 'In a house in the suburbs', value: 3 },
      { id: 'b', text: 'In a city apartment - close to action', value: 3 },
      { id: 'c', text: 'Somewhere rural or near nature', value: 3 },
      { id: 'd', text: 'Flexible - open to moving for opportunities', value: 4 },
    ],
  },
  {
    id: 'fut-2',
    text: 'How do you feel about having children?',
    category: 'future',
    weight: 3,
    options: [
      { id: 'a', text: 'Definitely want kids', value: 5 },
      { id: 'b', text: 'Would like 1-2 children someday', value: 4 },
      { id: 'c', text: 'Open to it but not sure yet', value: 3 },
      { id: 'd', text: 'Prefer not to have children', value: 1 },
    ],
  },
];

// Spicy intimacy questions
const spicyQuestions: Question[] = [
  {
    id: 'spicy-1',
    text: 'How often do you ideally want to be intimate?',
    category: 'romance',
    weight: 3,
    options: [
      { id: 'a', text: 'Daily or almost daily', value: 5 },
      { id: 'b', text: 'A few times a week', value: 4 },
      { id: 'c', text: 'Once a week', value: 3 },
      { id: 'd', text: 'A few times a month or less', value: 2 },
    ],
  },
  {
    id: 'spicy-2',
    text: 'When it comes to initiating, I prefer:',
    category: 'communication',
    weight: 2,
    options: [
      { id: 'a', text: 'I like to be the one who initiates', value: 4 },
      { id: 'b', text: 'I prefer when my partner initiates', value: 3 },
      { id: 'c', text: 'I like us to take turns equally', value: 5 },
      { id: 'd', text: 'It should happen spontaneously', value: 3 },
    ],
  },
  {
    id: 'spicy-3',
    text: 'How do you feel about trying new things in the bedroom?',
    category: 'lifestyle',
    weight: 3,
    options: [
      { id: 'a', text: 'Very adventurous - always open to experimenting', value: 5 },
      { id: 'b', text: 'Open to trying new things occasionally', value: 4 },
      { id: 'c', text: 'I like some variety but mostly stick to what works', value: 3 },
      { id: 'd', text: 'I prefer to keep things familiar and comfortable', value: 2 },
    ],
  },
  {
    id: 'spicy-4',
    text: 'How important is physical attraction in a relationship?',
    category: 'values',
    weight: 2,
    options: [
      { id: 'a', text: 'Extremely important - it\'s essential', value: 5 },
      { id: 'b', text: 'Very important but not everything', value: 4 },
      { id: 'c', text: 'Moderately important', value: 3 },
      { id: 'd', text: 'Less important than emotional connection', value: 2 },
    ],
  },
  {
    id: 'spicy-5',
    text: 'What time of day do you feel most in the mood?',
    category: 'lifestyle',
    weight: 1,
    options: [
      { id: 'a', text: 'Morning - start the day right', value: 4 },
      { id: 'b', text: 'Afternoon - spontaneous moments', value: 3 },
      { id: 'c', text: 'Evening - after winding down', value: 4 },
      { id: 'd', text: 'Late night - when everything is quiet', value: 3 },
    ],
  },
  {
    id: 'spicy-6',
    text: 'How do you feel about talking openly about desires and fantasies?',
    category: 'communication',
    weight: 3,
    options: [
      { id: 'a', text: 'Very comfortable - communication is key', value: 5 },
      { id: 'b', text: 'Somewhat comfortable with the right partner', value: 4 },
      { id: 'c', text: 'A bit shy but willing to try', value: 3 },
      { id: 'd', text: 'I prefer to keep some things private', value: 2 },
    ],
  },
  {
    id: 'spicy-7',
    text: 'How important is foreplay to you?',
    category: 'romance',
    weight: 2,
    options: [
      { id: 'a', text: 'Essential - the longer the better', value: 5 },
      { id: 'b', text: 'Very important - sets the mood', value: 4 },
      { id: 'c', text: 'Nice to have but not required', value: 3 },
      { id: 'd', text: 'I prefer to get to the main event', value: 2 },
    ],
  },
  {
    id: 'spicy-8',
    text: 'How do you feel about sexting or sending flirty messages?',
    category: 'communication',
    weight: 1,
    options: [
      { id: 'a', text: 'Love it - builds anticipation', value: 5 },
      { id: 'b', text: 'Enjoy it occasionally', value: 4 },
      { id: 'c', text: 'Not really my thing but I\'ll play along', value: 3 },
      { id: 'd', text: 'Prefer to keep things in person', value: 2 },
    ],
  },
  {
    id: 'spicy-9',
    text: 'What\'s your view on watching adult content together?',
    category: 'lifestyle',
    weight: 2,
    options: [
      { id: 'a', text: 'Great idea - can be fun and inspiring', value: 5 },
      { id: 'b', text: 'Open to trying it', value: 4 },
      { id: 'c', text: 'Not interested but won\'t judge', value: 3 },
      { id: 'd', text: 'Prefer to keep that separate', value: 2 },
    ],
  },
  {
    id: 'spicy-10',
    text: 'How do you feel about role-playing or costumes?',
    category: 'lifestyle',
    weight: 2,
    options: [
      { id: 'a', text: 'Yes! I love getting creative', value: 5 },
      { id: 'b', text: 'Would try it for special occasions', value: 4 },
      { id: 'c', text: 'Maybe with the right scenario', value: 3 },
      { id: 'd', text: 'Not really my style', value: 2 },
    ],
  },
  {
    id: 'spicy-11',
    text: 'How important is cuddling after intimacy?',
    category: 'romance',
    weight: 2,
    options: [
      { id: 'a', text: 'Absolutely essential - best part', value: 5 },
      { id: 'b', text: 'Very important for connection', value: 4 },
      { id: 'c', text: 'Nice but not necessary every time', value: 3 },
      { id: 'd', text: 'I usually need my space after', value: 2 },
    ],
  },
  {
    id: 'spicy-12',
    text: 'What would you do if your partner suggested something you\'ve never tried?',
    category: 'communication',
    weight: 3,
    options: [
      { id: 'a', text: 'Excited to explore together', value: 5 },
      { id: 'b', text: 'Would consider it with an open mind', value: 4 },
      { id: 'c', text: 'Would need time to think about it', value: 3 },
      { id: 'd', text: 'Probably stick to my comfort zone', value: 2 },
    ],
  },
  {
    id: 'spicy-13',
    text: 'How do you feel about PDA and being affectionate in public?',
    category: 'romance',
    weight: 1,
    options: [
      { id: 'a', text: 'Love it - can\'t keep my hands off', value: 5 },
      { id: 'b', text: 'Comfortable with tasteful affection', value: 4 },
      { id: 'c', text: 'Keep it minimal in public', value: 3 },
      { id: 'd', text: 'Save it for private moments', value: 2 },
    ],
  },
  {
    id: 'spicy-14',
    text: 'How do you handle it when you\'re not in the mood but your partner is?',
    category: 'conflict',
    weight: 3,
    options: [
      { id: 'a', text: 'Usually get in the mood once we start', value: 4 },
      { id: 'b', text: 'Communicate openly and find a compromise', value: 5 },
      { id: 'c', text: 'Offer other forms of intimacy instead', value: 4 },
      { id: 'd', text: 'It\'s okay to say no and try another time', value: 3 },
    ],
  },
  {
    id: 'spicy-15',
    text: 'What\'s your love language when it comes to intimacy?',
    category: 'romance',
    weight: 2,
    options: [
      { id: 'a', text: 'Words - dirty talk and verbal affirmation', value: 4 },
      { id: 'b', text: 'Touch - sensual and physical connection', value: 4 },
      { id: 'c', text: 'Acts - setting the mood, massage, preparation', value: 4 },
      { id: 'd', text: 'Presence - eye contact and emotional connection', value: 4 },
    ],
  },
];

export const QUIZ_SETS: Record<string, QuizSet> = {
  classic: {
    id: 'classic',
    name: 'Classic Compatibility',
    description: 'Core relationship questions about values, communication, and future',
    emoji: '💕',
    questions: classicQuestions,
  },
  spicy: {
    id: 'spicy',
    name: 'Spicy Edition',
    description: 'Intimacy-focused questions for adventurous couples',
    emoji: '🔥',
    questions: spicyQuestions,
  },
};

export function getQuizSet(quizId: string): QuizSet | null {
  return QUIZ_SETS[quizId] || null;
}

export function getAllQuizSets(): QuizSet[] {
  return Object.values(QUIZ_SETS);
}

// Default export for backward compatibility
export const QUIZ_QUESTIONS = classicQuestions;
