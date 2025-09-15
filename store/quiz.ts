import { create } from "zustand";

import {
  challengeProgress,
  challenges,
  challengeOptions,
} from "@/db/schema";

type State = {
  hearts: number;
  currentLessonId?: number;
  currentLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  })[];
  activeChallenge?: typeof challenges.$inferSelect & {
    challengeOptions: (typeof challengeOptions.$inferSelect)[];
  };
  activeChallengeIndex: number;
  status: "none" | "correct" | "wrong";
  
  // Lesson exit modal
  isLessonExitModalOpen: boolean;
};

type Actions = {
  setInitialState: (
    challenges: (typeof challenges.$inferSelect & {
      completed: boolean;
      challengeOptions: (typeof challengeOptions.$inferSelect)[];
    })[],
    hearts: number,
    currentLessonId?: number
  ) => void;
  sendAttempt: (
    challenge: typeof challenges.$inferSelect & {
      challengeOptions: (typeof challengeOptions.$inferSelect)[];
    },
    isCorrect: boolean
  ) => void;
  next: () => void;
  openLessonExitModal: () => void;
  closeLessonExitModal: () => void;
};

export const useQuiz = create<State & Actions>((set, get) => ({
  hearts: 5,
  currentLessonId: undefined,
  currentLessonChallenges: [],
  activeChallenge: undefined,
  activeChallengeIndex: 0,
  status: "none",
  isLessonExitModalOpen: false,

  setInitialState: (
    challenges,
    hearts,
    currentLessonId
  ) => {
    set({
      currentLessonChallenges: challenges,
      hearts,
      currentLessonId,
      activeChallenge: challenges[0],
      activeChallengeIndex: 0,
      status: "none",
    });
  },

  sendAttempt: (challenge, isCorrect) => {
    if (get().status !== "none") return;

    if (isCorrect) {
      set((state) => ({
        status: "correct",
      }));
    } else {
      set((state) => ({
        hearts: Math.max(state.hearts - 1, 0),
        status: "wrong",
      }));
    }
  },

  next: () => {
    if (get().activeChallengeIndex < get().currentLessonChallenges.length - 1) {
      set((state) => ({
        activeChallengeIndex: state.activeChallengeIndex + 1,
        activeChallenge: state.currentLessonChallenges[state.activeChallengeIndex + 1],
        status: "none",
      }));
    } else {
      // TODO: Handle lesson completion
      console.log("Lesson complete!");
    }
  },

  openLessonExitModal: () => set({ isLessonExitModalOpen: true }),
  closeLessonExitModal: () => set({ isLessonExitModalOpen: false }),
}));