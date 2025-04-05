import { FC, useEffect, useState } from "react";
import Keyboard from "../components/molecules/Keyboard";
import Lines from "../components/molecules/Lines";
import WordleInstruction from "../components/organisms/wordle/wordle-instruction";
import WordleResult from "../components/organisms/wordle/wordle-result";
import GAMES_CONSTANT from "../constants/games";
import words from "../data/wordle";
import useKeyboardHook from "../hooks/use-keyboard-hook";
import { useAppScore } from "../stores/use-game-information-store";
import PageProps from "../types/common/page-props";

const CONSTANTS = GAMES_CONSTANT.wordle;

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

const winCondition = (
  str: string,
  tries: string[],
  answer: string
): ConditionCheckerResult => {
  if (!words.includes(str))
    return {
      win: false,
      error: "Word is not exists",
      state: null,
    };

  return generalCondition(str, tries, answer);
};

const Wordle: FC<PageProps> = ({}) => {
  // Base Initialization Data
  const { setInstruction, getScore } = useAppScore();
  const score = getScore("wordle");
  const [answer, setAnswer] = useState<string>();
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setAnswer(words[randomIndex]);
  }, []);

  // Game Mechanism Hook
  const { tries, keyboardState, onKeyboardPressed } = useKeyboardHook({
    constants: CONSTANTS,
    lineValidation: (str, tries) => winCondition(str, tries, answer!),
  });

  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <div className="flex flex-row justify-between w-full items-center text-gray-600 px-2 text-xl">
        <span>Streak: {score.streak}</span>
        <i
          onClick={() => setInstruction("wordle", true)}
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
          gameType={"wordle"}
        />
      </div>
      <WordleInstruction />
      <WordleResult result={answer} />
    </div>
  );
};

export default Wordle;
