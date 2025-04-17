import { FC, useEffect, useState } from "react";
import Keyboard from "../components/molecules/Keyboard";
import Lines from "../components/molecules/Lines";
import WordleInstruction from "../components/organisms/wordle/wordle-instruction";
import WordleResult from "../components/organisms/wordle/wordle-result";
import GAMES_CONSTANT from "../constants/games";
import generateRandomEquation from "../data/nerdle";
import useKeyboardHook from "../hooks/use-keyboard-hook";
import { useAppScore } from "../stores/use-game-information-store";
import PageProps from "../types/common/page-props";
import clsx from "clsx";

const CONSTANTS = GAMES_CONSTANT.nerdle;

const generalCondition = (
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
        const currentTileAnswer = answer.split("")[index];
        let currentState: TileStateTypes = "absent";
        if (s === currentTileAnswer) {
          currentState = "correct";
        } else if (answer.includes(s)) {
          currentState = "present";
        }

        return {
          letter: s,
          state: currentState,
        };
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

const isValidEquation = (equation: string): boolean => {
  // Must contain exactly one '='
  const parts = equation.split("=");
  if (parts.length !== 2) return false;

  const [left, right] = parts;
  if (!left || !right) return false;

  // Check if right side is a valid number
  if (!/^\d+$/.test(right)) return false;

  // Prevent leading zero in result
  if (/^0\d+/.test(right)) return false;

  // Validate left side only contains allowed chars
  if (!/^[0-9+\-*/]+$/.test(left)) return false;

  // Prevent leading zeros in operands (e.g. 03+04)
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

const generateStreakIcon = (streak: number) => {
  if (streak > 100) return "text-purple-500";
  if (streak > 50) return "text-green-500";
  return "text-blue-500";
};

const Nerdle: FC<PageProps> = ({}) => {
  // Base Initialization Data
  const { setInstruction, getScore } = useAppScore();
  const score = getScore("nerdle");
  const [answer, setAnswer] = useState<string>();
  useEffect(() => {
    const generatedAnswer = generateRandomEquation();
    setAnswer(generatedAnswer);
  }, []);

  // Game Mechanism Hook
  const { tries, keyboardState, onKeyboardPressed } = useKeyboardHook({
    constants: CONSTANTS,
    lineValidation: (str, tries) => winCondition(str, tries, answer!),
    gameType: "nerdle",
  });

  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <div className="flex flex-row justify-between w-full items-center text-gray-600 px-2 text-xl">
        <div className="flex flex-row gap-2 items-center cursor-pointer">
          <span>Streak: {score.streak}</span>
          {score.streak > 5 && (
            <i
              className={clsx(
                "fa-solid fa-money-check-dollar",
                generateStreakIcon(score.streak)
              )}
            ></i>
          )}
        </div>
        <i
          onClick={() => setInstruction("nerdle", true)}
          className="fa fa-question-circle hover:text-gray-800 cursor-pointer"
        ></i>
      </div>
      <div className="flex flex-col flex-1 gap-2 w-[80vw] max-w-[21rem]">
        {tries.map((value, index) => (
          <Lines key={index} constants={CONSTANTS} value={value} />
        ))}
      </div>
      <div className="flex flex-col flex-1 gap-2 w-screen max-w-[32rem]">
        <Keyboard
          constants={CONSTANTS}
          onKeyboardPressed={onKeyboardPressed}
          keyboardStates={keyboardState}
        />
      </div>
      <WordleInstruction />
      <WordleResult result={answer} />
    </div>
  );
};

export default Nerdle;
