import { randomIntFromInterval } from "./utils";
import { Location, Entities } from "./Enteties/enteties";
import { COLUMN_BOARD_SIZE, ROW_BOARD_SIZE } from "../logic/Board/board";
import { DiceFuncs } from "./Dice/dice";
import { GenBoardLocationPerEntitiy } from "../logic/Board/location";
import { createGameMachine } from "./Game/stateMachine";

export function roleDice() {
  return randomIntFromInterval(1, 6);
}

export function initRoleDice() {
  return randomIntFromInterval(1, 8);
}

export function genRandomBoardLocation(): Location {
  const column = randomIntFromInterval(0, COLUMN_BOARD_SIZE - 1);
  const row = randomIntFromInterval(0, ROW_BOARD_SIZE - 1);
  return { Column: column, Row: row };
}

export function createIOMachine(): ReturnType<typeof createGameMachine> {
  const roleDiceFuncs: DiceFuncs = {
    move: roleDice,
    direction: roleDice,
  };
  const boardGenFuncs: GenBoardLocationPerEntitiy = {
    [Entities.User]: genRandomBoardLocation,
    [Entities.PB]: genRandomBoardLocation,
    [Entities.GPgp]: genRandomBoardLocation,
  };

  const initDice: DiceFuncs = {
    move: roleDice,
    direction: initRoleDice,
  };
  const machine = createGameMachine(boardGenFuncs, roleDiceFuncs, initDice);
  return machine;
}
