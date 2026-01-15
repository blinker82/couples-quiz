'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Couples Compatibility Quiz
          </h1>
          <p className="text-lg text-gray-600">
            Discover how well you and your partner align on the things that matter most.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Same Device Mode */}
          <Link href="/quiz/same-device" className="block">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-pink-300">
              <div className="text-4xl mb-4">📱</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Same Device
              </h2>
              <p className="text-gray-600 text-sm">
                Take turns answering on one device. Perfect for a cozy night together. Partner answers are kept hidden until the end.
              </p>
              <div className="mt-4 text-pink-600 font-medium text-sm">
                Best for: Together in person
              </div>
            </div>
          </Link>

          {/* Separate Devices Mode */}
          <Link href="/quiz/separate/create" className="block">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-purple-300">
              <div className="text-4xl mb-4">🔗</div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Separate Devices
              </h2>
              <p className="text-gray-600 text-sm">
                Get unique links for each partner to answer independently. Great for long-distance or busy schedules.
              </p>
              <div className="mt-4 text-purple-600 font-medium text-sm">
                Best for: Answer anytime, anywhere
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>15 questions across 6 categories: Communication, Values, Lifestyle, Romance, Conflict Resolution, and Future Plans</p>
        </div>
      </div>
    </main>
  );
}
