import React from "react";
import { Entities } from "../../Enteties/enteties";

interface CellProps {
  entity: Entities;
}

const Colors = ["white", "blue", "green", "rgb(242,167,167)"];
export const Cell: React.FC<CellProps> = ({ entity }) => {
  return (
    <div
      style={{
        border: ".5px solid",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30px",
        width: "30px",
        backgroundColor: `${Colors[entity]}`,
      }}
    />

    // </div>
  );
};
