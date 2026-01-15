import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Response } from '@/types/quiz';

type Partner = 'partner1' | 'partner2';

interface QuizState {
  mode: 'same-device' | 'separate' | null;
  currentPartner: Partner;
  currentQuestionIndex: number;
  partner1Responses: Response[];
  partner2Responses: Response[];
  sessionId: string | null;
  partner1Complete: boolean;
  partner2Complete: boolean;

  setMode: (mode: 'same-device' | 'separate') => void;
  setCurrentPartner: (partner: Partner) => void;
  addResponse: (partner: Partner, response: Response) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  setQuestionIndex: (index: number) => void;
  markPartnerComplete: (partner: Partner) => void;
  setSession: (sessionId: string) => void;
  resetQuiz: () => void;
  getResponse: (partner: Partner, questionId: string) => Response | undefined;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      mode: null,
      currentPartner: 'partner1',
      currentQuestionIndex: 0,
      partner1Responses: [],
      partner2Responses: [],
      sessionId: null,
      partner1Complete: false,
      partner2Complete: false,

      setMode: (mode) => set({ mode }),

      setCurrentPartner: (partner) =>
        set({
          currentPartner: partner,
          currentQuestionIndex: 0,
        }),

      addResponse: (partner, response) => {
        const key = partner === 'partner1' ? 'partner1Responses' : 'partner2Responses';
        const responses = [...get()[key]];
        const existingIndex = responses.findIndex(
          (r) => r.questionId === response.questionId
        );

        if (existingIndex >= 0) {
          responses[existingIndex] = response;
        } else {
          responses.push(response);
        }

        set({ [key]: responses });
      },

      nextQuestion: () =>
        set((state) => ({
          currentQuestionIndex: state.currentQuestionIndex + 1,
        })),

      previousQuestion: () =>
        set((state) => ({
          currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
        })),

      setQuestionIndex: (index) => set({ currentQuestionIndex: index }),

      markPartnerComplete: (partner) => {
        if (partner === 'partner1') {
          set({ partner1Complete: true });
        } else {
          set({ partner2Complete: true });
        }
      },

      setSession: (sessionId) => set({ sessionId }),

      resetQuiz: () =>
        set({
          mode: null,
          currentPartner: 'partner1',
          currentQuestionIndex: 0,
          partner1Responses: [],
          partner2Responses: [],
          sessionId: null,
          partner1Complete: false,
          partner2Complete: false,
        }),

      getResponse: (partner, questionId) => {
        const responses =
          partner === 'partner1' ? get().partner1Responses : get().partner2Responses;
        return responses.find((r) => r.questionId === questionId);
      },
    }),
    {
      name: 'couples-quiz-storage',
    }
  )
);
