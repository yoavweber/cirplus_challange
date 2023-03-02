import { Entities, Location } from "../Enteties/enteties";

export const COLUMN_BOARD_SIZE = 42;
export const ROW_BOARD_SIZE = 24;

export type Board = Entities[][];

export function generateBoard(): Entities[][] {
  const rowArray: Entities[] = new Array(ROW_BOARD_SIZE).fill(Entities.Empty);
  const arr: Board = new Array(COLUMN_BOARD_SIZE).fill(rowArray);
  return arr;
}

// TODO: change the name
function _getBoardCoord(location: number, border: number) {
  if (location > border) {
    _getBoardCoord(location - border, border);
  }
  return location;
}

export function getColumCoord(location: number): number {
  return _getBoardCoord(location, COLUMN_BOARD_SIZE);
}

export function getRowCoord(location: number): number {
  return _getBoardCoord(location, ROW_BOARD_SIZE);
}

export function getBoardLocationData(
  board: Board,
  location: Location
): Entities {
  return board[location.Column][location.Row];
}

