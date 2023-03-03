import { generateEmptyBoard, COLUMN_BOARD_SIZE, ROW_BOARD_SIZE } from "./board";
import { Entities } from "../Enteties/enteties";

describe("generateBoard", () => {
  test("should return a 2D array with the correct dimensions", () => {
    const board = generateEmptyBoard();
    expect(board.length).toBe(COLUMN_BOARD_SIZE);
    expect(board[0].length).toBe(ROW_BOARD_SIZE);
  });

  test("should return a 2D array with all elements initialized to false", () => {
    const board = generateEmptyBoard();
    const flatBoard = board.flat();
    expect(flatBoard.every((element) => element === Entities.Empty)).toBe(true);
  });
});

// describe("dir", () => {
//   test("North should return the correct coordinates", () => {
//     const move = 2;
//     const [x, y] = dir.North(move);
//     expect(x).toBe(move);
//     expect(y).toBe(0);
//   });

//   test("Northeast should return the correct coordinates", () => {
//     const move = 2;
//     const [x, y] = dir.Northeast(move);
//     expect(x).toBe(move);
//     expect(y).toBe(move);
//   });

//   test("Northwest should return the correct coordinates", () => {
//     const move = 2;
//     const [x, y] = dir.Northwest(move);
//     expect(x).toBe(move);
//     expect(y).toBe(-move);
//   });

//   test("West should return the correct coordinates", () => {
//     const move = 2;
//     const [x, y] = dir.West(move);
//     expect(x).toBe(0);
//     expect(y).toBe(-move);
//   });

//   test("East should return the correct coordinates", () => {
//     const move = 2;
//     const [x, y] = dir.East(move);
//     expect(x).toBe(0);
//     expect(y).toBe(move);
//   });

//   test("South should return the correct coordinates", () => {
//     const move = 2;
//     const [x, y] = dir.South(move);
//     expect(x).toBe(-move);
//     expect(y).toBe(0);
//   });

//   test("Southeast should return the correct coordinates", () => {
//     const move = 2;
//     const [x, y] = dir.Southeast(move);
//     expect(x).toBe(-move);
//     expect(y).toBe(move);
//   });

//   test("Southwest should return the correct coordinates", () => {
//     const move = 2;
//     const [x, y] = dir.Southwest(move);
//     expect(x).toBe(-move);
//     expect(y).toBe(-move);
//   });
// });
