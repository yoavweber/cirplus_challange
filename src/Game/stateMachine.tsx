import { assign, createMachine } from "xstate";
import { initBoard, GenBoardLocationPerEntitiy } from "../Board/location";
import { Board } from "../Board/board";

export function createGameMachine(
  genBoardLocation: GenBoardLocationPerEntitiy
) {
  return createMachine({
    initial: "idle",
    schema: {
      context: {} as { board: Board | null },
    },
    context: {
      board: null,
    },
    states: {
      idle: {
        on: {
          START: {
            target: "startGame",
            actions: assign({
              board: (context, event) =>
                (context.board = initBoard(genBoardLocation)), //TODO: accept genrandomboard as parameter
            }),
          },
        },
      },
      startGame: {
        type: "final",
      },
      // playGame: {},
      // endGame: {},
    },
  });
}
