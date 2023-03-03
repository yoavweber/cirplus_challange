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

//  ------------------------------- generating entities locations ---------------------
type GenBoardLocationFunc = () => Location;

export type GenBoardLocationPerEntitiy = {
  [Entities.User]: GenBoardLocationFunc;
  [Entities.PB]: GenBoardLocationFunc;
  [Entities.GPgp]: GenBoardLocationFunc;
};

function _placeInitEntityLocation(
  board: Board,
  entity: Entities,
  genBoardLocation: GenBoardLocationFunc,
  errCounter = 5
): Board {
  const location = genBoardLocation();
  if (errCounter === 0) {
    throw new Error(
      "Can't generate random entity locatio, please check that the genBoardLocation working as expected"
    );
  }
  if (getBoardLocationData(board, location) === Entities.Empty) {
    return _updateEntityLocation(location, board, entity);
  }
  return _placeInitEntityLocation(
    board,
    entity,
    genBoardLocation,
    errCounter - 1
  );
}

function _placeUserInitLocation(
  board: Board,
  genBoardLocation: GenBoardLocationFunc
): Board {
  return _placeInitEntityLocation(board, Entities.User, genBoardLocation);
}

function _placePBInitLocation(
  board: Board,
  genBoardLocation: GenBoardLocationFunc
): Board {
  return _placeInitEntityLocation(board, Entities.PB, genBoardLocation);
}

// TODO: add docs to the function
function _placeGPgpInitLocation(genBoardLocation: GenBoardLocationFunc): Board {
  const board = generateEmptyBoard();
  const location = genBoardLocation();
  let locations = generateGPgp(location);
  return updatePGpgLocation(locations, board);
}

export function generateGPgp(location: Location): Location[] {
  let locations = [location];
  for (const directionStr in moveBoard) {
    let deraction = directionStr as Directions;
    let step = moveBoard[deraction](1);
    // TODO:create an append function
    let newLocation: Location = {
      Column: step.Column + location.Column,
      Row: step.Row + location.Row,
    };
    locations.push(newLocation);
  }
  return locations;
}

export function initBoard(
  getBoardLocationPerEntity: GenBoardLocationPerEntitiy
) {
  const boardWithGPgp = _placeGPgpInitLocation(
    getBoardLocationPerEntity[Entities.GPgp]
  );
  const boardWithUserAndGpgp = _placeUserInitLocation(
    boardWithGPgp,
    getBoardLocationPerEntity[Entities.User]
  );
  const boardWithAllEntities = _placePBInitLocation(
    boardWithUserAndGpgp,
    getBoardLocationPerEntity[Entities.PB]
  );
  return boardWithAllEntities;
}
