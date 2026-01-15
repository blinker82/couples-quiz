import { Question } from '@/types/quiz';

export const QUIZ_QUESTIONS: Question[] = [
  // COMMUNICATION (3 questions)
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

  // VALUES (3 questions)
  {
    id: 'val-1',
    text: 'How important is financial stability before major life decisions (marriage, kids, house)?',
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
    text: 'How much involvement should extended family have in our relationship decisions?',
    category: 'values',
    weight: 2,
    options: [
      { id: 'a', text: 'Family opinions are very important to consider', value: 4 },
      { id: 'b', text: 'We listen but make our own decisions', value: 3 },
      { id: 'c', text: 'Our relationship is private - minimal involvement', value: 2 },
      { id: 'd', text: 'It depends on the decision', value: 3 },
    ],
  },
  {
    id: 'val-3',
    text: 'What role should career ambitions play in relationship priorities?',
    category: 'values',
    weight: 2,
    options: [
      { id: 'a', text: 'Relationship comes first, careers adapt', value: 2 },
      { id: 'b', text: 'Both equally important - we support each other', value: 4 },
      { id: 'c', text: 'Career growth is essential for both of us', value: 3 },
      { id: 'd', text: 'One partner\'s career may take priority at times', value: 3 },
    ],
  },

  // LIFESTYLE (2 questions)
  {
    id: 'life-1',
    text: 'My ideal weekend together looks like:',
    category: 'lifestyle',
    weight: 1,
    options: [
      { id: 'a', text: 'Adventures and activities - hiking, traveling, trying new things', value: 4 },
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

  // ROMANCE (3 questions)
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
    text: 'How often should couples go on "real" dates (not just Netflix at home)?',
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
    id: 'rom-3',
    text: 'Public displays of affection (PDA) make me:',
    category: 'romance',
    weight: 1,
    options: [
      { id: 'a', text: 'Love it! Hold hands, kiss, the whole thing', value: 5 },
      { id: 'b', text: 'Comfortable with subtle affection', value: 4 },
      { id: 'c', text: 'A bit uncomfortable - prefer privacy', value: 2 },
      { id: 'd', text: 'Depends on the setting', value: 3 },
    ],
  },

  // CONFLICT (2 questions)
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
    id: 'conf-2',
    text: 'When it comes to apologizing:',
    category: 'conflict',
    weight: 2,
    options: [
      { id: 'a', text: 'I apologize freely, even if not entirely my fault', value: 4 },
      { id: 'b', text: 'I apologize when I know I was wrong', value: 4 },
      { id: 'c', text: 'I find it hard to apologize first', value: 2 },
      { id: 'd', text: 'Actions speak louder - I show I\'m sorry through behavior', value: 3 },
    ],
  },

  // FUTURE (2 questions)
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
      { id: 'a', text: 'Definitely want kids - the more the merrier', value: 5 },
      { id: 'b', text: 'Would like 1-2 children someday', value: 4 },
      { id: 'c', text: 'Open to it but not sure yet', value: 3 },
      { id: 'd', text: 'Prefer not to have children', value: 1 },
    ],
  },
];
