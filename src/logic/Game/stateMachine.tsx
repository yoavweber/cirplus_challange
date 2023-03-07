import { createMachine } from "xstate";
import { initBoard, GenBoardLocationPerEntitiy } from "../Board/location";
import { Board, generateEmptyBoard } from "../Board/board";
import { Maybe } from "../types";
import {
  Location,
  movePB,
  moveUser,
  EntityLocation,
} from "../Enteties/enteties";
import {
  Direction,
  playTurn,
  playFirstTurn,
  DiceFuncs,
  Turn,
} from "../Dice/dice";
import { compareObj } from "../utils";

export interface MachineContext {
  board: Board;
  userLocation: Maybe<Location>;
  pbLocation: Maybe<Location>;
  GPgpLocation: Maybe<Location[]>;
  pbLastTurn: Direction;
  userLastTurn: Direction;
  pbTurn: boolean;
  step: number;
  directionNumber: number;
}

const playerWon = (playerLocation: Location, GPgpLocation: Location[]) => {
  return GPgpLocation.some(
    (location) =>
      location.Row === playerLocation.Row &&
      location.Column === playerLocation.Column
  );
};

function executeTurn(
  prevPlayerDirection: Direction,
  playerLocation: Location,
  oldBoard: Board,
  movePlayer: (
    turn: Turn,
    board: Board,
    prevLocation: Location
  ) => EntityLocation,
  roleDiceFunc: DiceFuncs
) {
  const turn = playTurn(prevPlayerDirection, roleDiceFunc);
  const [board, location] = movePlayer(turn, oldBoard, playerLocation);
  return {
    playerLastTurn: turn.direction,
    board: board,
    playerLocation: location[0],
    step: turn.step,
    directionNumber: turn.directionNumber,
  };
}

export function createGameMachine(
  genBoardLocation: GenBoardLocationPerEntitiy,
  roleDiceFunc: DiceFuncs,
  initDiceFunc: DiceFuncs
) {
  return createMachine(
    {
      predictableActionArguments: true,
      initial: "idle",
      schema: {
        context: {} as MachineContext,
      },
      context: {
        board: generateEmptyBoard(),
        userLocation: null,
        pbLocation: null,
        GPgpLocation: null,
        // TODO: ask him what is the default
        pbLastTurn: Direction.North,
        userLastTurn: Direction.South,
        pbTurn: true,
        step: 0,
        directionNumber: 0,
      },

      states: {
        idle: {
          on: {
            START_GAME: {
              target: "playGame",
              actions: "initBoard",
            },
          },
          exit: ["initTurn"],
        },
        playGame: {
          always: [
            { target: "userWon", cond: "ifUserWon" },
            { target: "pbWon", cond: "ifPbWon" },
          ],
          on: {
            TURN: {
              actions: ["playUserTurn", "playPbTurn"],
            },
          },
        },
        pbWon: {
          type: "final",
        },
        userWon: {
          type: "final",
        },
      },
    },
    {
      guards: {
        ifUserWon: (context, _) => {
          const { userLocation, GPgpLocation, pbLocation } = context;
          if (userLocation && GPgpLocation && pbLocation) {
            return (
              playerWon(userLocation, GPgpLocation) ||
              compareObj(userLocation, pbLocation)
            );
          }
          return false;
        },
        ifPbWon: (context, _) => {
          const { pbLocation, GPgpLocation } = context;
          if (pbLocation && GPgpLocation) {
            return playerWon(pbLocation, GPgpLocation);
          }
          return false;
        },
      },
      actions: {
        playPbTurn: (context, _) => {
          const { userLastTurn, pbLocation, board } = context;
          if (pbLocation) {
            const res = executeTurn(
              userLastTurn,
              pbLocation,
              board,
              movePB,
              roleDiceFunc
            );
            context.board = res.board;
            context.pbLastTurn = res.playerLastTurn;
            context.pbLocation = res.playerLocation;
            return res;
          }
        },
        playUserTurn: (context, _) => {
          const { pbLastTurn, userLocation, board } = context;
          if (userLocation) {
            const res = executeTurn(
              pbLastTurn,
              userLocation,
              board,
              moveUser,
              roleDiceFunc
            );
            context.board = res.board;
            context.userLastTurn = res.playerLastTurn;
            context.userLocation = res.playerLocation;
            context.step = res.step;
            context.directionNumber = res.directionNumber;
            return res;
          }
        },
        initTurn: (context, _) => {
          const { board, pbLocation } = context;
          if (pbLocation) {
            const turn = playFirstTurn(initDiceFunc);
            const [newBoard, location] = movePB(turn, board, pbLocation);
            context.board = newBoard;
            context.pbLocation = location[0];
            context.pbLastTurn = turn.direction;

            return {
              pbLastTurn: turn.direction,
              board: newBoard,
              PbLocation: location[0],
              step: turn.step,
            };
          }
        },
        initBoard: (context, _) => {
          const [board, [userLocation, PbLocation, GPgpLocation]] =
            initBoard(genBoardLocation);
          context.board = board;
          context.userLocation = userLocation[0];
          console.log(context.userLocation, "init board");
          context.pbLocation = PbLocation[0];
          context.GPgpLocation = GPgpLocation;
          return {
            board: board,
            userLocation: userLocation[0],
            pbLocation: PbLocation[0],
            GPgpLocation: GPgpLocation,
          };
        },
      },
    }
  );
}
