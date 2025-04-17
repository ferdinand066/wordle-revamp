import { create } from "zustand";

const initialValue = {
  win: undefined,
  showAnswer: false,
};

type AppConditionState = {
  win?: boolean;
  showAnswer: boolean;

  setWin: (win: boolean) => void;
  setShowAnswer: (showAnswer: boolean) => void;
  reset: () => void;
};

export const useGameCondition = create<AppConditionState>((set) => ({
  ...initialValue,
  setWin: (win) => set({ win }),
  setShowAnswer: (showAnswer) => set({ showAnswer }),
  reset: () => set(initialValue),
}));
