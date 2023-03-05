import { assign, createMachine } from "xstate";
import { initBoard, GenBoardLocationPerEntitiy } from "../Board/location";
import { Board } from "../Board/board";
import { Maybe } from "../logic/types";
import {
  Location,
  movePB,
  moveUser,
  EntityLocation,
} from "../Enteties/enteties";
import { Direction, playTurn, DiceFuncs, Turn } from "../Dice/dice";


const playerWon = (playerLocation: Location, GPgpLocation: Location[]) => {
  return GPgpLocation.some(
    (location) =>
      location.Row === playerLocation.Row &&
      location.Column === playerLocation.Column
  );
};

function executeTurn(
  context: Context,
  movePlayer: (
    turn: Turn,
    board: Board,
    prevLocation: Location
  ) => EntityLocation,
  roleDiceFunc: DiceFuncs
) {
  const turn = playTurn(context.userLastTurn, context.pbLastTurn, roleDiceFunc);
  const [board, location] = movePlayer(turn, context.board, context.pbLocation);
  context.pbLastTurn = turn.direction;
  context.board = board;
  context.pbLocation = location[0];

  return {
    pbLastTurn: turn.direction,
    board: board,
    pbLocation: location[0],
  };
}

export function createGameMachine(
  genBoardLocation: GenBoardLocationPerEntitiy,
  roleDiceFunc: DiceFuncs
) {
  const [board, [userLocation, PbLocation, GPgpLocation]] =
    initBoard(genBoardLocation);
  return createMachine(
    {
      initial: "playGame",
      schema: {
        context: {} as Context,
      },
      context: {
        board: board,
        userLocation: userLocation[0],
        pbLocation: PbLocation[0],
        GPgpLocation: GPgpLocation,
        // TODO: ask him what is the default
        pbLastTurn: Direction.North,
        userLastTurn: Direction.South,
      },

      states: {
        playGame: {
          always: [
            { target: "userWon", cond: "ifUserWon" },
            { target: "pbWon", cond: "ifPbWon" },
          ],
          on: {
            PB_TURN: [
              {
                target: "pbWon",
                cond: "ifPbWon",
              },
              {
                actions: assign((context) => {
                  return executeTurn(context, movePB, roleDiceFunc);
                }),
              },
            ],
            PLAYER_TURN: [
              {
                target: "userWon",
                cond: "ifUserWon",
              },
              {
                actions: assign((context) => {
                  return executeTurn(context, moveUser, roleDiceFunc);
                }),
              },
            ],
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
        ifUserWon: (context, event) => {
          return playerWon(context.userLocation, context.GPgpLocation);
        },
        ifPbWon: (context, event) => {
          return playerWon(context.pbLocation, context.GPgpLocation);
        },
      },
    }
  );
}

      // }
      // },
      // win: { type: 'final' },
      // lose: { type: 'final' }
    },
  });
}
