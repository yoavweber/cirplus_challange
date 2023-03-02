import { Location } from "../Enteties/enteties";

export enum Directions {
  North = "North",
  Northeast = "Northeast",
  Northwest = "Northwest",
  West = "West",
  East = "East",
  South = "South",
  Southeast = "Southeast",
  Southwest = "Southwest",
}
interface MoveBoard {
  North: (move: number) => Location;
  Northeast: (move: number) => Location;
  Northwest: (move: number) => Location;
  West: (move: number) => Location;
  East: (move: number) => Location;
  South: (move: number) => Location;
  Southeast: (move: number) => Location;
  Southwest: (move: number) => Location;
}

export const moveBoard: MoveBoard = {
  North: (move: number) => ({ Column: move, Row: 0 }),
  Northeast: (move: number) => ({ Column: move, Row: move }),
  Northwest: (move: number) => ({ Column: move, Row: -move }),
  West: (move: number) => ({ Column: 0, Row: -move }),
  East: (move: number) => ({ Column: 0, Row: move }),
  South: (move: number) => ({ Column: -move, Row: 0 }),
  Southeast: (move: number) => ({ Column: -move, Row: move }),
  Southwest: (move: number) => ({ Column: -move, Row: -move }),
};

