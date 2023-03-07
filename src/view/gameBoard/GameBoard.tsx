import React from "react";
import {
  Board,
  COLUMN_BOARD_SIZE,
  ROW_BOARD_SIZE,
} from "../..//logic/Board/board";
import { Cell } from "./Cell";

interface GameBoardProps {
  board: Board;
}

const boardStyle = {
  display: "grid",
  gridTemplateColumns: `repeat(${COLUMN_BOARD_SIZE}, 30px)`,
  gridTemplateRows: `repeat(${ROW_BOARD_SIZE}, 30px)`,
};

const cellStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "rgb(119,119,119)",
  fontSize: "10px",
};

const RowHeaders = (
  colIndex: number,
  rowIndex: number,
  cell: number,
  cellId: string
) => {
  return (
    <>
      {colIndex === 0 ? (
        <>
          <div
            style={{
              ...cellStyle,
            }}
            key={cellId}
          >
            R{rowIndex}
          </div>
        </>
      ) : (
        <Cell entity={cell} key={cellId} />
      )}
    </>
  );
};

export const GameBoard: React.FC<GameBoardProps> = ({ board }) => {
  const columnHeader = Array.from(Array(COLUMN_BOARD_SIZE).keys());
  const newBoard: number[] | Board = [columnHeader, ...board];
  const renderBoard = newBoard.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      const cellId = `cell-${rowIndex}-${colIndex}`;
      return (
        <>
          {rowIndex === 0 ? (
            <div
              style={{
                ...cellStyle,
                justifySelf: "right",
              }}
              key={cellId}
            >
              C{colIndex + 1}
            </div>
          ) : (
            RowHeaders(colIndex, rowIndex, cell, cellId)
          )}
        </>
      );
    })
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
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
