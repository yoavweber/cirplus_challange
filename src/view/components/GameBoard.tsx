import React from "react";
import { Entities } from "../../Enteties/enteties";
import { Board, COLUMN_BOARD_SIZE, ROW_BOARD_SIZE } from "../../Board/board";
import { Cell } from "./Cell";

interface GameBoardProps {
  board: Board;
}

const boardStyle = {
  display: "grid",
  gridTemplateColumns: `repeat(42, 30px)`,
  gridTemplateRows: `repeat(24, 30px)`,
};

export const GameBoard: React.FC<GameBoardProps> = ({ board }) => {
  const renderBoard = board.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      const cellId = `cell-${rowIndex}-${colIndex}`;
      return <Cell entity={cell} key={cellId} />;
    })
  );

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          ...boardStyle,
        }}
      >
        {renderBoard}
      </div>
    </div>
  );
};
