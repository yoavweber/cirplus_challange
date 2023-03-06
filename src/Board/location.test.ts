import { generateEmptyBoard, COLUMN_BOARD_SIZE, ROW_BOARD_SIZE } from "./board";
import { Entities, Location } from "../Enteties/enteties";
import { _updateEntityLocation } from "./location";

describe("testing entity location", () => {
  test("testing negative value", () => {
    const board = generateEmptyBoard();
    const location: Location = { Column: -1, Row: 2 };
    const expectedRes: Location = { Column: 40, Row: 2 };
    const [_, locationRes] = _updateEntityLocation(
      location,
      board,
      Entities.User
    );
    expect(locationRes[0].Column).toBe(expectedRes.Column);
  });
});
