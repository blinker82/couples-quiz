'use client';

interface PartnerTransitionProps {
  onReady: () => void;
  partnerNumber: 1 | 2;
}

export function PartnerTransition({ onReady, partnerNumber }: PartnerTransitionProps) {
  const isFirstPartner = partnerNumber === 1;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {isFirstPartner ? (
          <>
            <div className="text-6xl mb-6">💕</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Partner 1, it's your turn!
            </h2>
            <p className="text-gray-600 mb-6">
              Answer honestly - your partner won't see your answers until you both finish the quiz.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              15 questions, takes about 5 minutes
            </p>
          </>
        ) : (
          <>
            <div className="text-6xl mb-6">🔒</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Partner 1 has finished!
            </h2>
            <p className="text-gray-600 mb-6">
              Please pass the device to Partner 2. Their answers are hidden and secure.
            </p>
            <p className="text-sm text-pink-600 font-medium mb-8">
              Partner 2, don't scroll up to see previous answers!
            </p>
          </>
        )}

        <button
          onClick={onReady}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {isFirstPartner ? "I'm Ready - Start Quiz" : "I'm Partner 2 - Start My Quiz"}
        </button>
      </div>
    </div>
  );
}
