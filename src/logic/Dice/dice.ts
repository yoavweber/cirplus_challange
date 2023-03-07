import { Location } from "../Enteties/enteties";

export enum Direction {
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

export const oppositeDirections = {
  North: Direction.South,
  Northeast: Direction.Southwest,
  Northwest: Direction.Southeast,
  West: Direction.East,
  East: Direction.West,
  South: Direction.North,
  Southeast: Direction.Northwest,
  Southwest: Direction.Northeast,
};

function roleDirectionDice(
  directionNumber: number,
  prevPlayerDirection: Direction
): Direction {
  const oppositeDirection = oppositeDirections[prevPlayerDirection];
  const allowedDirections = getAllowedDirections(
    prevPlayerDirection,
    oppositeDirection
  );
  return allowedDirections[directionNumber];
}

function roleInitDirectionDice(directionNumber: number): Direction {
  const directions = Object.keys(Direction).map((elm) => elm as Direction);
  return directions[directionNumber];
}

function roleMoveDice(roleDice: () => number): number {
  return roleDice();
}

function getAllowedDirections(
  prevUserDirection: Direction,
  oppositeDirection: Direction
): Direction[] {
  const allowedDirection = Object.keys(Direction)
    .filter(
      (direction) =>
        direction != oppositeDirection || direction != prevUserDirection
    )
    .map((elm) => elm as Direction);
  return allowedDirection;
}

export type Turn = {
  step: number;
  direction: Direction;
  directionNumber: number;
};
export type DiceFuncs = {
  move: () => number;
  direction: () => number;
};

export function playTurn(prevPlayerTurn: Direction, diceFunc: DiceFuncs): Turn {
  const step = roleMoveDice(diceFunc.move);
  const directionNumber = diceFunc.direction();
  const direction = roleDirectionDice(directionNumber, prevPlayerTurn);
  return { step: step, direction: direction, directionNumber: directionNumber };
}

export function playFirstTurn(diceFunc: DiceFuncs): Turn {
  const step = roleMoveDice(diceFunc.move);
  const directionNumber = diceFunc.direction();

  const direction = roleInitDirectionDice(directionNumber);
  return { step: step, direction: direction, directionNumber: directionNumber };
}
