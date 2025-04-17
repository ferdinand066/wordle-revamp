// components/templates/GameLayout.tsx
import clsx from "clsx";
import { FC } from "react";
import { useAppScore } from "../../stores/use-game-information-store";
import Keyboard from "../molecules/Keyboard";
import Lines from "../molecules/Lines";
import WordleInstruction from "../organisms/wordle/wordle-instruction";
import WordleResult from "../organisms/wordle/wordle-result";
import { useGameCondition } from "../../stores/use-game-condition";

interface GameLayoutProps {
  gameKey: GameTypes;
  constants: any;
  answer: string | undefined;
  tries: TileState[][];
  keyboardState: any;
  onKeyboardPressed: (key: string) => void;
}

const generateStreakIcon = (streak: number) => {
  if (streak > 100) return "text-yellow-500";
  if (streak > 50) return "text-green-500";
  if (streak > 20) return "text-red-500";
  if (streak > 10) return "text-purple-500";
  return "text-blue-500";
};

const maxWidthScreen: Record<GameTypes, string> = {
  wordle: "max-w-[21rem]",
  nerdle: "max-w-[23rem]",
};

const GameLayout: FC<GameLayoutProps> = ({
  gameKey,
  constants,
  answer,
  tries,
  keyboardState,
  onKeyboardPressed,
}) => {
  const { setInstruction, getScore } = useAppScore();
  const { showAnswer } = useGameCondition();
  const score = getScore(gameKey);

  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      { showAnswer && answer}
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
          onClick={() => setInstruction(gameKey, true)}
          className="fa fa-question-circle hover:text-gray-800 cursor-pointer"
        ></i>
      </div>

      <div
        className={clsx(
          "flex flex-col flex-1 gap-2 w-[90vw]",
          maxWidthScreen[gameKey]
        )}
      >
        {tries.map((value, index) => (
          <Lines key={index} constants={constants} value={value} />
        ))}
      </div>

      <div className="flex flex-col flex-1 gap-2 w-screen max-w-[32rem]">
        <Keyboard
          constants={constants}
          onKeyboardPressed={onKeyboardPressed}
          keyboardStates={keyboardState}
        />
      </div>

      <WordleInstruction />
      <WordleResult result={answer} />
    </div>
  );
};

export default GameLayout;
