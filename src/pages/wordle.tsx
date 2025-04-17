import { FC, useEffect, useState } from "react";
import GAMES_CONSTANT from "../constants/games";
import words from "../data/wordle";
import useKeyboardHook from "../hooks/use-keyboard-hook";
import PageProps from "../types/common/page-props";
import { generalCondition } from "../utils/game-utils";
import GameLayout from "../components/organisms/GameLayout";

const CONSTANTS = GAMES_CONSTANT.wordle;

const winCondition = (
  str: string,
  tries: string[],
  answer: string
): ConditionCheckerResult => {
  if (!words.includes(str)) {
    return {
      win: false,
      error: "Word is not exists",
      state: null,
    };
  }

  return generalCondition(str, tries, answer);
};

const Wordle: FC<PageProps> = () => {
  const [answer, setAnswer] = useState<string>();
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setAnswer(words[randomIndex]);
  }, []);

  const { tries, keyboardState, onKeyboardPressed } = useKeyboardHook({
    constants: CONSTANTS,
    lineValidation: (str, tries) => winCondition(str, tries, answer!),
    gameType: "wordle",
  });

  return (
    <GameLayout
      gameKey="wordle"
      constants={CONSTANTS}
      answer={answer}
      tries={tries}
      keyboardState={keyboardState}
      onKeyboardPressed={onKeyboardPressed}
    />
  );
};

export default Wordle;
