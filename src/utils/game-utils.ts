export const generalCondition = (
  str: string,
  tries: string[],
  answer: string
): ConditionCheckerResult => {
  if (tries.includes(str)) {
    return {
      win: false,
      state: null,
      error: `"${str.toUpperCase()}" already exists!`,
    };
  }

  if (str !== answer) {
    return {
      win: false,
      error: "",
      state: str.split("").map((s, index) => {
        const currentTileAnswer = answer[index];
        let currentState: TileStateTypes = "absent";
        if (s === currentTileAnswer) {
          currentState = "correct";
        } else if (answer.includes(s)) {
          currentState = "present";
        }
        return { letter: s, state: currentState };
      }),
    };
  }

  return {
    win: true,
    error: "",
    state: str.split("").map((s) => ({
      letter: s,
      state: "correct",
    })),
  };
};
