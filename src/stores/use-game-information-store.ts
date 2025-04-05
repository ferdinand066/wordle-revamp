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

type AppScoreState = {
  scores: Record<GameTypes, GameScoreProps>;
  firstInstruction: Record<GameTypes, boolean>;

  getScore: (game: GameTypes) => GameScoreProps;
  setScore: (game: GameTypes, score: GameScoreProps) => void;

  setInstruction: (game: GameTypes, value: boolean) => void;
  reset: () => void;
};

export const useAppScore = create<AppScoreState>()(
  persist(
    (set, get) => ({
      scores: initialValue,
      firstInstruction: firstInstructionInitialValue,

      getScore: (game) => get().scores[game],
      setScore: (game, score) =>
        set((state) => ({
          scores: {
            ...state.scores,
            [game]: score,
          },
        })),
      setInstruction: (game, value) =>
        set((state) => ({
          firstInstruction: {
            ...state.firstInstruction,
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
