import { ReactNode } from "react";
import Nerdle from "../pages/nerdle";
import Wordle from "../pages/wordle";

type RouteTypes = {
  name: string;
  path: string;
  element: ReactNode;
};

export const routes: RouteTypes[] = [
  {
    name: "Wordle",
    path: "wordle",
    element: <Wordle title="Wordle" />,
  },
  {
    name: "Nerdle",
    path: "nerdle",
    element: <Nerdle title="Nerdle" />,
  },
];
