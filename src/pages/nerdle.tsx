import { FC, useEffect, useState } from "react";
import GAMES_CONSTANT from "../constants/games";
import generateRandomEquation from "../data/nerdle";
import useKeyboardHook from "../hooks/use-keyboard-hook";
import PageProps from "../types/common/page-props";
import { generalCondition } from "../utils/game-utils";
import GameLayout from "../components/organisms/GameLayout";

const CONSTANTS = GAMES_CONSTANT.nerdle;

const isValidEquation = (equation: string): boolean => {
  const parts = equation.split("=");
  if (parts.length !== 2) return false;

  const [left, right] = parts;
  if (!left || !right) return false;
  if (!/^\d+$/.test(right)) return false;
  if (/^0\d+/.test(right)) return false;
  if (!/^[0-9+\-*/]+$/.test(left)) return false;

  const tokens = left.split(/[\+\-\*\/]/);
  if (tokens.some((token) => /^0\d+/.test(token))) return false;

  try {
    const result = eval(left);
    if (!Number.isInteger(result)) return false;
    return parseInt(right) === result;
  } catch {
    return false;
  }
};

const winCondition = (
  str: string,
  tries: string[],
  answer: string
): ConditionCheckerResult => {
  if (!isValidEquation(str)) {
    return {
      win: false,
      error: "Invalid equation",
      state: null,
    };
  }

  return generalCondition(str, tries, answer);
};

const Nerdle: FC<PageProps> = () => {
  const [answer, setAnswer] = useState<string>();
  useEffect(() => {
    setAnswer(generateRandomEquation());
  }, []);

  const { tries, keyboardState, onKeyboardPressed } = useKeyboardHook({
    constants: CONSTANTS,
    lineValidation: (str, tries) => winCondition(str, tries, answer!),
    gameType: "nerdle",
  });

  return (
    <GameLayout
      gameKey="nerdle"
      constants={CONSTANTS}
      answer={answer}
      tries={tries}
      keyboardState={keyboardState}
      onKeyboardPressed={onKeyboardPressed}
    />
  );
};

export default Nerdle;
