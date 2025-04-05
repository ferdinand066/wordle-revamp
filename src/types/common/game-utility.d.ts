type GameTypes = "wordle" | "nerdle";
type TileStateTypes = "present" | "absent" | "correct";

type GameScoreProps = {
  streak: number;
  timeSecond: number;
  time: string;
};

type GameConstant = {
  tries: number;
  tileSize: number;
  keyboard: string[][];
};

type TileState = {
  letter?: string;
  state?: TileStateTypes;
};

type ConditionCheckerResult = {
  error: string;
  win: boolean;
  state: TileState[] | null;
};
