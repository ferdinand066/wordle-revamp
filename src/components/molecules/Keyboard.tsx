import clsx from "clsx";
import { FC, ReactNode } from "react";
import { DELETE_KEY, ENTER_KEY, TILE_COLOR } from "../../constants/games";
import { useGameCondition } from "../../stores/use-game-condition";

type KeyboardProps = {
  constants: GameConstant;
  onKeyboardPressed: (key: string) => void;
  keyboardStates: Record<string, TileState>;
};

const getKeywordKey = (key: string): string | ReactNode => {
  switch (key) {
    case ENTER_KEY:
      return <i className="fa-solid fa-arrow-turn-down-right"></i>;
    case DELETE_KEY:
      return <i className="fa-solid fa-delete-left"></i>;
    default:
      return key.toUpperCase();
  }
};

const Keyboard: FC<KeyboardProps> = ({
  constants,
  onKeyboardPressed,
  keyboardStates,
}) => {
  const { win } = useGameCondition();
  return (
    <>
      {constants.keyboard.map((lines, index) => (
        <div
          key={index}
          className="flex-nowrap flex flex-row gap-1 justify-center"
        >
          {lines.map((key) => {
            const width = [ENTER_KEY, DELETE_KEY].includes(key)
              ? "w-[4rem]"
              : "w-[3rem]";

            return (
              <div
                key={key}
                onClick={() => {
                  if (win !== undefined) return;
                  return onKeyboardPressed(key);
                }}
                className={clsx(
                  `${width} p-2 border-2 border-gray-300 rounded flex flex-row justify-center items-center text-gray-600 font-semibold cursor-pointer`,
                  keyboardStates[key]?.state
                    ? TILE_COLOR[keyboardStates[key].state]
                    : ""
                )}
              >
                {getKeywordKey(key)}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};

export default Keyboard;
