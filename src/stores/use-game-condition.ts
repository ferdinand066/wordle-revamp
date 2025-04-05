import { create } from "zustand";

const initialValue = {
  win: undefined,
};

type AppConditionState = {
  win?: boolean;

  setWin: (win: boolean) => void;
  reset: () => void;
};

export const useGameCondition = create<AppConditionState>((set) => ({
  ...initialValue,
  setWin: (win) => set({ win }),
  reset: () => set(initialValue),
}));
