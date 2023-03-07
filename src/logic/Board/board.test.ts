import { generateEmptyBoard, COLUMN_BOARD_SIZE, ROW_BOARD_SIZE } from "./board";
import { Entities } from "../Enteties/enteties";

describe("generateBoard", () => {
  test("should return a 2D array with the correct dimensions", () => {
    const board = generateEmptyBoard();
    expect(board.length).toBe(ROW_BOARD_SIZE);
    expect(board[0].length).toBe(COLUMN_BOARD_SIZE);
  });

  test("should return a 2D array with all elements initialized to false", () => {
    const board = generateEmptyBoard();
    const flatBoard = board.flat();
    expect(flatBoard.every((element) => element === Entities.Empty)).toBe(true);
  });
});

