import { Board } from "../Board/board";
import { Turn, calculateMove } from "../Dice/dice";

export type EntityLocation = [Board, Location[]];

export enum Entities {
  Empty = 0,
  User = 1,
  PB = 2,
  GPgp = 3,
}

export interface Location {
  Column: number;
  Row: number;
}

export function moveUser(
  turn: Turn,
  board: Board,
  const res = calculateMove[turn.direction](turn.move);
  const updatedLocation: Location = {
    Row: res.Row + prevLocation.Row,
    Column: res.Column + prevLocation.Column,
  };
  return updateUserLocation(updatedLocation, board);
}

export function movePB(
  turn: Turn,
  board: Board,
  prevLocation: Location
): EntityLocation {
  const res = moveBoard[turn.direction](turn.move);
  const updatedLocation: Location = {
    Row: res.Row + prevLocation.Row,
    Column: res.Column + prevLocation.Column,
  };
  return updatePBLocation(updatedLocation, board);
}
