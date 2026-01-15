'use client';

import Link from 'next/link';
import { getAllQuizSets } from '@/lib/questions';

export default function Home() {
  const quizSets = getAllQuizSets();

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Couples Quiz
          </h1>
          <p className="text-lg text-gray-600">
            Discover how well you and your partner align on the things that matter most.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">Choose a Quiz</h2>

        <div className="grid gap-4 mb-8">
          {quizSets.map((quiz) => (
            <Link href={`/quiz/${quiz.id}/same-device`} key={quiz.id} className="block">
              <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-pink-300">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{quiz.emoji}</span>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{quiz.name}</h3>
                    <p className="text-gray-600 text-sm">{quiz.description}</p>
                    <p className="text-pink-600 text-xs mt-1">{quiz.questions.length} questions</p>
                  </div>
                  <div className="text-gray-400">→</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center text-gray-500 text-sm">
          <p>Take turns answering on the same device. Partner answers are kept hidden until the end.</p>
        </div>
      </div>
    </main>
  );
}
