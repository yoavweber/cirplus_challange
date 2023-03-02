import { generateBoard, COLUMN_BOARD_SIZE, ROW_BOARD_SIZE } from "./board";
import { Entities } from "../Enteties/enteties";

describe("generateBoard", () => {
  test("should return a 2D array with the correct dimensions", () => {
    const board = generateBoard();
    expect(board.length).toBe(COLUMN_BOARD_SIZE);
    expect(board[0].length).toBe(ROW_BOARD_SIZE);
  });

  test("should return a 2D array with all elements initialized to false", () => {
    const board = generateBoard();
    const flatBoard = board.flat();
    expect(flatBoard.every((element) => element === Entities.Empty)).toBe(true);
  });
});
