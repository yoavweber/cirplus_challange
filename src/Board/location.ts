import { deepClone, randomIntFromInterval } from "../logic/utils";
import { Entities, Location } from "../Enteties/enteties";
import {
  Board,
  getColumCoord,
  getRowCoord,
  getBoardLocationData,
  COLUMN_BOARD_SIZE,
  ROW_BOARD_SIZE,
  generateBoard,
} from "./board";
import { moveBoard, Directions } from "../Dice/dice";

function _updateEntityLocation(
  location: Location,
  board: Board,
  entity: Entities
): Board {
  let clonedBoard = deepClone(board) as Board;
  const adjustedLocation: Location = {
    Column: getColumCoord(location.Column),
    Row: getRowCoord(location.Row),
  };
  clonedBoard[adjustedLocation.Column][adjustedLocation.Row] = entity;
  return clonedBoard;
}

export function updateUserLocation(location: Location, board: Board): Board {
  return _updateEntityLocation(location, board, Entities.User);
}

export function updatePBLocation(location: Location, board: Board): Board {
  return _updateEntityLocation(location, board, Entities.PB);
}

export function updatePGpgLocation(locations: Location[], board: Board): Board {
  const location = locations.pop();
  if (location === undefined) {
    return board;
  }
  const updatedBoard = _updateEntityLocation(location, board, Entities.GPgp);
  return updatePGpgLocation(locations, updatedBoard);
}

export function genRandomBoardLocation(): Location {
  const column = randomIntFromInterval(0, COLUMN_BOARD_SIZE);
  const row = randomIntFromInterval(0, ROW_BOARD_SIZE);
  return { Column: column, Row: row };
}

