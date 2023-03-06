import React from "react";
import { Entities } from "../../Enteties/enteties";
import { Board, COLUMN_BOARD_SIZE, ROW_BOARD_SIZE } from "../../Board/board";
import { Cell } from "./Cell";

interface GameBoardProps {
  board: Board;
}

const boardStyle = {
  display: "grid",
  gridTemplateColumns: `repeat(${COLUMN_BOARD_SIZE}, 30px)`,
  gridTemplateRows: `repeat(${ROW_BOARD_SIZE}, 30px)`,
};
};

export const GameBoard: React.FC<GameBoardProps> = ({ board }) => {
  const renderBoard = board.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      const cellId = `cell-${rowIndex}-${colIndex}`;
      return (
        <>
          {colIndex === 0 ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgb(119,119,119)",
                }}
              >
                R{rowIndex + 1}
              </div>
            </>
          ) : (
            <Cell entity={cell} key={cellId} />
          )}
        </>
      );
    })
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "50px",
        background: "white",
        width: "1364px",
        height: "795px",
        boxShadow: "10px 10px 26px #0000001F",
        borderRadius: "12px",
      }}
    >
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
