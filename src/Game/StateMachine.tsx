import { assign, createMachine } from "xstate";
import { initBoard, genRandomBoardLocation } from "../Board/location";
import { Board } from "../Board/board";

export const machine = createMachine({
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
          target: ".startGame",
          actions: assign({
            board: (context, event) =>
              (context.board = initBoard(genRandomBoardLocation)), //TODO: accept genrandomboard as parameter
          }),
        },
      },
    },
    startGame: {},
    // playGame: {},
    // endGame: {},
  },
});
