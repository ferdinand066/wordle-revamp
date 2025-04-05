import { useState } from "react";
import { toast } from "react-toastify";
import { DELETE_KEY, ENTER_KEY } from "../constants/games";
import { useGameCondition } from "../stores/use-game-condition";
import { useAppScore } from "../stores/use-game-information-store";

type KeyboardHookProps = {
  constants: GameConstant;
  gameType: GameTypes;
  lineValidation: (value: string, tries: string[]) => ConditionCheckerResult;
};

const emptyTile = {
  letter: undefined,
  state: undefined,
};

const useKeyboardHook = ({ constants, gameType, lineValidation }: KeyboardHookProps) => {
  // Logic For Game Mechanism
  const { setWin } = useGameCondition();
  const { addWinStreak, resetWinStreak } = useAppScore();
  const [tries, setTries] = useState<TileState[][]>(
    Array.from({ length: constants.tries }, () =>
      Array.from({ length: constants.tileSize }, () => ({ ...emptyTile }))
    )
  );
  
  const [keyboardState, setKeyboardState] = useState<Record<string, TileState>>(
    constants.keyboard
      .flat()
      .filter((val) => ![DELETE_KEY, ENTER_KEY].includes(val))
      .reduce((acc, letter) => {
        acc[letter] = { letter, state: undefined };
        return acc;
      }, {} as Record<string, TileState>)
  );

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

  const onKeyboardPressed = (key: string) => {
    const currentLine = tries[currentLineIndex];
    const currentString = currentLine.map((val) => val.letter).join("");

    if (key === ENTER_KEY) {
      if (currentLetterIndex !== constants.tileSize) return;
      const validation = lineValidation(
        currentString,
        tries
          .filter((_, index) => currentLineIndex !== index)
          .map((tryLines) => tryLines.map((val) => val.letter ?? "").join(""))
      );

      if (validation.error) {
        return toast.error(validation.error);
      }

      const updatedTries = [...tries];
      updatedTries[currentLineIndex] = validation.state!;

      setTries(updatedTries);

      if (!validation.win) {
        if (currentLineIndex === constants.tries - 1) {
          setWin(false);
          resetWinStreak(gameType);
          return;
        }
        setCurrentLineIndex((state) => state + 1);
        setCurrentLetterIndex(0);

        setKeyboardState((prev) => {
          const updatedState = { ...prev };

          validation.state!.forEach((tile) => {
            const key = tile.letter;
            if (!key || !updatedState[key]) return;

            const current = updatedState[key].state;
            const incoming = tile.state;

            // Ensure we only upgrade states:
            // absent < present < correct
            const rank = { absent: 0, present: 1, correct: 2 };
            if (current === undefined || rank[incoming!] > rank[current]) {
              updatedState[key] = {
                letter: key,
                state: incoming,
              };
            }
          });

          return updatedState;
        });
      } else {
        setWin(true);
        addWinStreak(gameType);
      }
      return;
    }

    if (key === DELETE_KEY) {
      if (currentLetterIndex === 0) return;

      const newLine = [...currentLine];
      newLine[currentLetterIndex - 1] = { ...emptyTile };

      const updatedTries = [...tries];
      updatedTries[currentLineIndex] = newLine;

      setTries(updatedTries);
      setCurrentLetterIndex((prev) => prev - 1);
      return;
    }

    if (currentLetterIndex === constants.tileSize) return;

    const newLine = [...currentLine];
    newLine[currentLetterIndex] = {
      letter: key,
      state: undefined,
    };

    const updatedTries = [...tries];
    updatedTries[currentLineIndex] = newLine;

    setTries(updatedTries);
    setCurrentLetterIndex((prev) => prev + 1);
  };

  return {
    tries,
    keyboardState,

    onKeyboardPressed,
  };
};

export default useKeyboardHook;
