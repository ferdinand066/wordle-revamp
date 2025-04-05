export const DELETE_KEY = "Delete";
export const ENTER_KEY = "Enter";

const GAMES_CONSTANT: Record<GameTypes, GameConstant> = {
  wordle: {
    tries: 6,
    tileSize: 5,
    keyboard: [
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
      [ENTER_KEY, "z", "x", "c", "v", "b", "n", "m", DELETE_KEY],
    ],
  },
  nerdle: {
    tries: 6,
    tileSize: 8,
    keyboard: [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      [DELETE_KEY, "+", "-", "*", "/", "=", ENTER_KEY],
    ],
  },
};

export const TILE_COLOR: Record<TileStateTypes, string> = {
  absent: "bg-gray-400 text-white",
  correct: "bg-green-300 text-white",
  present: "bg-yellow-400 text-white",
};

export default GAMES_CONSTANT;
