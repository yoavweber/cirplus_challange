import { Board } from "../Board/board";
import { Turn, calculateMove } from "../Dice/dice";
import {
  updateUserLocation,
  updatePBLocation,
  updateEmptyLocation,
} from "../Board/location";

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
function _movePlayer(
  turn: Turn,
  board: Board,
  prevLocation: Location,
  updateLocation: (updatedLocation: Location, board: Board) => EntityLocation
) {
  const res = calculateMove[turn.direction](turn.step);
  const [cleanPrevLocationBoard, _] = updateEmptyLocation(prevLocation, board);
  const updatedLocation: Location = {
    Row: res.Row + prevLocation.Row,
    Column: res.Column + prevLocation.Column,
  };
  return updateLocation(updatedLocation, cleanPrevLocationBoard);
}

export function moveUser(
  turn: Turn,
  board: Board,
  prevLocation: Location
): EntityLocation {
  return _movePlayer(turn, board, prevLocation, updateUserLocation);
}

export function movePB(
  turn: Turn,
  board: Board,
  prevLocation: Location
): EntityLocation {
  return _movePlayer(turn, board, prevLocation, updatePBLocation);
}
