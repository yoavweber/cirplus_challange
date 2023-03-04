import { assign, createMachine } from "xstate";
import { initBoard, GenBoardLocationPerEntitiy } from "../Board/location";
import { Board } from "../Board/board";
import { Maybe } from "../logic/types";
import { Location } from "../Enteties/enteties";

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
          on: {
            PB_TURN: [
              {
                target: "pbWon",
                cond: "ifPbWon",
              },
              {
                actions: assign((context) => {
                  // TODO: move this to one function
                  const turn = playTurn(
                    context.userLastTurn,
                    context.pbLastTurn,
                    roleDiceFunc
                  );

                  const [board, location] = movePB(turn, context.board);
                  context.pbLastTurn = turn.direction;
                  context.board = board;
                  context.pbLocation = location[0];

                  return {
                    pbLastTurn: turn.direction,
                    board: board,
                    pbLocation: location[0],
                  };
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
                  // TODO: move this to one function
                  const turn = playTurn(
                    context.userLastTurn,
                    context.pbLastTurn,
                    roleDiceFunc
                  );
                  //TODO: in this state board must be initilize, this if is only to remove ts error
                  const [board, location] = moveUser(turn, context.board);
                  context.userLastTurn = turn.direction;
                  context.board = board;
                  context.pbLocation = location[0];
                  return {
                    userLastTurn: turn.direction,
                    board: board,
                    pbLocation: location[0],
                  };
                }),
              },
            ],
          },
        },
      },
      playGame: {
        type: "final",
      },
      // on: MAKE_MOVE: {

      // }
      // },
      // win: { type: 'final' },
      // lose: { type: 'final' }
    },
  });
}
