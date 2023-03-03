import { assign, createMachine } from "xstate";
import { initBoard, GenBoardLocationPerEntitiy } from "../Board/location";
import { Board } from "../Board/board";
import { Maybe } from "../logic/types";
import { Location } from "../Enteties/enteties";

export function createGameMachine(
  genBoardLocation: GenBoardLocationPerEntitiy
) {
  return createMachine({
    initial: "idle",
    schema: {
      context: {} as {
        board: Maybe<Board>;
        userLocation: Maybe<Location>;
        PbLocation: Maybe<Location>;
        GPgpLocation: Maybe<Location[]>;
      },
    },
    context: {
      board: null,
      userLocation: null,
      PbLocation: null,
      GPgpLocation: null,
    },
    states: {
      idle: {
        on: {
          START: {
            target: "playGame",
            actions: assign((context) => {
              const [board, [userLocation, PbLocation, GPgpLocation]] =
                initBoard(genBoardLocation);
              context.board = board;
              context.userLocation = userLocation[0];
              context.PbLocation = PbLocation[0];
              context.GPgpLocation = GPgpLocation;

              return {
                board: board,
                userLocation: userLocation[0],
                PbLocation: PbLocation[0],
                GPgpLocation: GPgpLocation,
              };
            }),
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
