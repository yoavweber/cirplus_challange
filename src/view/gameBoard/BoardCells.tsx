import React from "react";
import { Cell } from "./Cell";

const cellStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "rgb(119,119,119)",
  fontSize: "10px",
};

export const ColumnHeader = (colIndex: number, cellId: string) => {
  return (
    <div
      style={{
        ...cellStyle,
        justifySelf: "right",
      }}
      key={cellId}
    >
      C{colIndex + 1}
    </div>
  );
};

export const RowHeadersAndCells = (
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
