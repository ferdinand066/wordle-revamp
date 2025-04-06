import clsx from "clsx";
import { FC } from "react";
import { TILE_COLOR } from "../../constants/games";

type LinesProps = {
  constants: GameConstant;
  value: TileState[];
};

const Lines: FC<LinesProps> = ({ constants, value }) => {
  return (
    <div
      className={`grid ${constants.tileSize === 5 ? "grid-cols-5" : "grid-cols-8"} gap-2 flex-1 items-center`}
    >
      {new Array(constants.tileSize).fill("").map((_, index) => {
        const currentTile = value[index];
        let classAnimation = "";

        if (currentTile.state) {
          classAnimation = `animate__flipInX animate__delay-${index}s`;
        } else if (currentTile.letter) {
          classAnimation = "animate__bounceIn";
        }

        return (
          <div
            key={index}
            className={clsx(
              "aspect-square border border-gray-300 border-2 rounded p-2 w-full col-span-1 max-w-[4rem] flex flex-row justify-center items-center font-bold transition-all text-lg animate__animated",
              classAnimation,
              !currentTile.state ? "" : TILE_COLOR[currentTile.state]
            )}
          >
            <span>{currentTile.letter?.toUpperCase() ?? ""}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Lines;
