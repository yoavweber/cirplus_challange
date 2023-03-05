import { randomIntFromInterval } from "./utils";
import { Location, Entities } from "../Enteties/enteties";
import { COLUMN_BOARD_SIZE, ROW_BOARD_SIZE } from "../Board/board";
import { DiceFuncs } from "../Dice/dice";
import { GenBoardLocationPerEntitiy } from "../Board/location";
import { createGameMachine } from "../Game/stateMachine";

function roleDice() {
  return randomIntFromInterval(1, 6);
}

function genRandomBoardLocation(): Location {
  const column = randomIntFromInterval(0, COLUMN_BOARD_SIZE);
  const row = randomIntFromInterval(0, ROW_BOARD_SIZE);
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

  const machine = createGameMachine(boardGenFuncs, roleDiceFuncs);
  return machine;
}
