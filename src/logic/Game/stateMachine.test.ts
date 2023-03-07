import { Location, Entities } from "../Enteties/enteties";
import { createGameMachine, MachineContext } from "./stateMachine";
import { GenBoardLocationPerEntitiy } from "../Board/location";
import { generateEmptyBoard } from "../Board/board";
import { DiceFuncs, Direction } from "../Dice/dice";
import { interpret } from "xstate";
import { compareObj } from "../utils";
import { isUserWon } from "./guards";

const mockuserLocation = { Column: 1, Row: 1 } as Location;
const mockPBLocation = { Column: 5, Row: 5 } as Location;
const mockGPgpLocation = { Column: 20, Row: 20 } as Location;

const mockMoveDice = () => 1;
const mockDirectionDice = () => 2;

describe("test state machine game", () => {
  let gameStateMachine: ReturnType<typeof createGameMachine>;

  beforeAll(() => {
    const boardLocationGen: GenBoardLocationPerEntitiy = {
      [Entities.User]: () => mockuserLocation,
      [Entities.PB]: () => mockPBLocation,
      [Entities.GPgp]: () => mockGPgpLocation,
    };
    const genDice: DiceFuncs = {
      move: mockMoveDice,
      direction: mockDirectionDice,
    };
    const stateMachine = createGameMachine(boardLocationGen, genDice, genDice);

    gameStateMachine = stateMachine;
  });

  test("pb makes move", (done) => {
    const pbExpectedLocation: Location = { Row: 5, Column: 5 };
    const interpretMachine = interpret(gameStateMachine).onTransition(
      (context) => {
        const { pbLocation } = context.context;
        if (pbLocation && compareObj(pbLocation, pbExpectedLocation)) {
          expect(true).toBeTruthy();
          done();
        }
      }
    );

    interpretMachine.start();
    interpretMachine.send(["START_GAME", "TURN"]);
  });
});
