import { Entities, Location } from "../Enteties/enteties";

export const COLUMN_BOARD_SIZE = 42;
export const ROW_BOARD_SIZE = 24;

export type Board = Entities[][];

export function generateEmptyBoard(): Board {
  const rowArray: Entities[] = new Array(COLUMN_BOARD_SIZE).fill(
    Entities.Empty
  );
  const arr: Board = new Array(ROW_BOARD_SIZE).fill(rowArray);
  return arr;
}

function _getBoardBound(location: number, border: number): number {
  if (location > border) {
    return _getBoardBound(location - border + 1, border);
  } else if (location < 0) {
    return _getBoardBound(border + location, border);
  }
  return location;
}

export function getColumBound(location: number): number {
  return _getBoardBound(location, COLUMN_BOARD_SIZE - 1);
}

export function getRowBound(location: number): number {
  return _getBoardBound(location, ROW_BOARD_SIZE - 1);
}

export function getBoardLocationData(
  board: Board,
  location: Location
): Entities {
  if (
    location.Row > ROW_BOARD_SIZE - 1 ||
    location.Column > COLUMN_BOARD_SIZE - 1
  ) {
    throw new Error(
      `can't get the location data of the board as the location is out of bound. recived the following input: Column: ${location.Column} Row: ${location.Row}`
    );
  }
  return board[location.Row][location.Column];
}
