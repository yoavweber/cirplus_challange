// TODO: maybe change file name
import { deepClone, randomIntFromInterval } from "../logic/utils";
import { Entities, Location } from "../Enteties/enteties";
import {
  Board,
  getColumCoord,
  getRowCoord,
  getBoardLocationData,
  COLUMN_BOARD_SIZE,
  ROW_BOARD_SIZE,
  generateEmptyBoard,
} from "./board";
import { calculateMove, Direction } from "../Dice/dice";

type EntityLocation = [Board, Location[]];

function _updateEntityLocation(
  location: Location,
  board: Board,
  entity: Entities
): EntityLocation {
  let clonedBoard = deepClone(board) as Board;
  const adjustedLocation: Location = {
    Column: getColumCoord(location.Column),
    Row: getRowCoord(location.Row),
  };
  clonedBoard[adjustedLocation.Column][adjustedLocation.Row] = entity;
  return [clonedBoard, [adjustedLocation]];
}

export function updateUserLocation(
  location: Location,
  board: Board
): EntityLocation {
  return _updateEntityLocation(location, board, Entities.User);
}

export function updatePBLocation(
  location: Location,
  board: Board
): EntityLocation {
  return _updateEntityLocation(location, board, Entities.PB);
}

export function updateEmptyLocation(
  location: Location,
  board: Board
): EntityLocation {
  return _updateEntityLocation(location, board, Entities.Empty);
}

export function updatePGpgLocation(
  locations: Location[],
  board: Board,
  updatedLocations: Location[]
): EntityLocation {
  const location = locations.pop();
  if (location === undefined) {
    return [board, updatedLocations];
  }
  const [updatedBoard, updatedlocation] = _updateEntityLocation(
    location,
    board,
    Entities.GPgp
  );
  updatedLocations = updatedLocations.concat(updatedlocation);
  return updatePGpgLocation(locations, updatedBoard, updatedLocations);
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
): EntityLocation {
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
): EntityLocation {
  return _placeInitEntityLocation(board, Entities.User, genBoardLocation);
}

function _placePBInitLocation(
  board: Board,
  genBoardLocation: GenBoardLocationFunc
): EntityLocation {
  return _placeInitEntityLocation(board, Entities.PB, genBoardLocation);
}

// TODO: add docs to the function
function _placeGPgpInitLocation(
  genBoardLocation: GenBoardLocationFunc
): EntityLocation {
  const board = generateEmptyBoard();
  const location = genBoardLocation();
  let locations = generateGPgp(location);
  return updatePGpgLocation(locations, board, []);
}

export function generateGPgp(location: Location): Location[] {
  let locations = [location];
  for (const directionStr in calculateMove) {
    let deraction = directionStr as Direction;
    let step = calculateMove[deraction](1);
    // TODO:create an append function
    let newLocation: Location = {
      Column: step.Column + location.Column,
      Row: step.Row + location.Row,
    };
    locations.push(newLocation);
  }
  return locations;
}

// TODO: change naming
type UserLocation = Location[];
type PbLocation = Location[];
type GPgpLocation = Location[];

type InitBoardReturn = [Board, [UserLocation, PbLocation, GPgpLocation]];
export function initBoard(
  getBoardLocationPerEntity: GenBoardLocationPerEntitiy
): InitBoardReturn {
  const [boardWithGPgp, GPgpLocation] = _placeGPgpInitLocation(
    getBoardLocationPerEntity[Entities.GPgp]
  );
  const [boardWithUserAndGpgp, userLocation] = _placeUserInitLocation(
    boardWithGPgp,
    getBoardLocationPerEntity[Entities.User]
  );
  const [boardWithAllEntities, pbLocation] = _placePBInitLocation(
    boardWithUserAndGpgp,
    getBoardLocationPerEntity[Entities.PB]
  );
  return [boardWithAllEntities, [userLocation, pbLocation, GPgpLocation]];
}
