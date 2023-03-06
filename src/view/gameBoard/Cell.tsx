import React from "react";
import { Entities } from "../../Enteties/enteties";

interface CellProps {
  entity: Entities;
}

const Colors = ["white", "blue", "green", "red"];
export const Cell: React.FC<CellProps> = ({ entity }) => {
  return (
    <div
      style={{
        border: "1px solid",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "30px",
        width: "30px",
        backgroundColor: `${Colors[entity]}`,
      }}
    >
      {entity != 0 && entity}
    </div>
  );
};
