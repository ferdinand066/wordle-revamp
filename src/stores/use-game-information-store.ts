import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const initialScoreValue: GameScoreProps = {
  streak: 0,
  timeSecond: 0,
  time: "0",
};

const initialValue: Record<GameTypes, GameScoreProps> = {
  wordle: initialScoreValue,
  nerdle: initialScoreValue,
};

const firstInstructionInitialValue: Record<GameTypes, boolean> = {
  wordle: true,
  nerdle: true,
};

const scoreRewardInitialValue: Record<GameTypes, boolean> = {
  wordle: false,
  nerdle: false,
};

type AppScoreState = {
  scores: Record<GameTypes, GameScoreProps>;
  firstInstruction: Record<GameTypes, boolean>;
  scoreReward: Record<GameTypes, boolean>;

  getScore: (game: GameTypes) => GameScoreProps;
  setScore: (game: GameTypes, score: GameScoreProps) => void;

  addWinStreak: (game: GameTypes) => void;
  resetWinStreak: (game: GameTypes) => void;

  setInstruction: (game: GameTypes, value: boolean) => void;
  setScoreReward: (game: GameTypes, value: boolean) => void;
  reset: () => void;
};

export const useAppScore = create<AppScoreState>()(
  persist(
    (set, get) => ({
      scores: initialValue,
      firstInstruction: firstInstructionInitialValue,
      scoreReward: scoreRewardInitialValue,

      getScore: (game) => get().scores[game],
      setScore: (game, score) =>
        set((state) => ({
          scores: {
            ...state.scores,
            [game]: score,
          },
        })),
      
      addWinStreak: (game) =>
        set((state) => {
          const currentScore = state.scores[game];
          return {
            scores: {
              ...state.scores,
              [game]: {
                ...currentScore,
                streak: currentScore.streak + 1,
              },
            },
          };
        }),

      resetWinStreak: (game) =>
        set((state) => {
          const currentScore = state.scores[game];
          return {
            scores: {
              ...state.scores,
              [game]: {
                ...currentScore,
                streak: 0,
              },
            },
          };
        }),
      
      setInstruction: (game, value) =>
        set((state) => ({
          firstInstruction: {
            ...state.firstInstruction,
            [game]: value,
          },
        })),

      setScoreReward: (game, value) =>
        set((state) => ({
          scoreReward: {
            ...state.scoreReward,
            [game]: value,
          },
        })),

      reset: () => set({ scores: initialValue }),
    }),
    {
      name: "game-information-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
