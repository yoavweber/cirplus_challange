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
interface CalculateMove {
  North: (move: number) => Location;
  Northeast: (move: number) => Location;
  Northwest: (move: number) => Location;
  West: (move: number) => Location;
  East: (move: number) => Location;
  South: (move: number) => Location;
  Southeast: (move: number) => Location;
  Southwest: (move: number) => Location;
}

export const calculateMove: CalculateMove = {
  North: (move: number) => ({ Column: -move, Row: 0 }),
  Northeast: (move: number) => ({ Column: -move, Row: move }),
  Northwest: (move: number) => ({ Column: -move, Row: -move }),
  West: (move: number) => ({ Column: 0, Row: -move }),
  East: (move: number) => ({ Column: 0, Row: move }),
  South: (move: number) => ({ Column: move, Row: 0 }),
  Southeast: (move: number) => ({ Column: move, Row: move }),
  Southwest: (move: number) => ({ Column: move, Row: -move }),
};
};

function roleDirectionDice(
  roleDice: () => number,
  userTurn: Direction,
  pbTurn: Direction
): Direction {
  const allowedDirections = getAllowedDirections(userTurn, pbTurn);
  const res = roleDice();
  return allowedDirections[res];
}

function roleMoveDice(roleDice: () => number): number {
  return roleDice();
}

function getAllowedDirections(
  prevUserDirection: Direction,
  prevBottleDirection: Direction
): Direction[] {
  const allowedDirection = Object.keys(Direction)
    .filter(
      (direction) =>
        direction != prevBottleDirection || direction != prevUserDirection
    )
    .map((elm) => elm as Direction);
  return allowedDirection;
}

export type Turn = {
  move: number;
  direction: Direction;
};
export type DiceFuncs = {
  move: () => number;
  direction: () => number;
};

export function playTurn(
  userTurn: Direction,
  pbTurn: Direction,
  diceFunc: DiceFuncs
): Turn {
  const move = roleMoveDice(diceFunc.move);
  const direction = roleDirectionDice(diceFunc.direction, userTurn, pbTurn);
  return { move: move, direction: direction };
}
