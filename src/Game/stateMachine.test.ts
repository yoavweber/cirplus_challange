import { Location, Entities } from "../Enteties/enteties";
import { createGameMachine } from "./stateMachine";
import { GenBoardLocationPerEntitiy } from "../Board/location";
import { getBoardLocationData } from "../Board/board";

const userLocation = { Column: 1, Row: 1 } as Location;
const PBLocation = { Column: 5, Row: 5 } as Location;
const GPgpLocation = { Column: 20, Row: 20 } as Location;

describe("testStateMachine", () => {
  test("board get generated", () => {
    const boardLocationGen: GenBoardLocationPerEntitiy = {
      [Entities.User]: () => userLocation,
      [Entities.PB]: () => PBLocation,
      [Entities.GPgp]: () => GPgpLocation,
    };
    const stateMachine = createGameMachine(boardLocationGen);
    const { initialState } = stateMachine;
    stateMachine.transition(initialState, "START");
    const { board } = stateMachine.context;
    expect(board).toBeTruthy();
    if (board) {
      expect(getBoardLocationData(board, userLocation)).toBe(Entities.User);
      expect(getBoardLocationData(board, PBLocation)).toBe(Entities.PB);
      expect(getBoardLocationData(board, GPgpLocation)).toBe(Entities.GPgp);
    }
  });
});
