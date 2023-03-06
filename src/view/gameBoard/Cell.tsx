import React from "react";
import { Entities } from "../../Enteties/enteties";
import userIcon from "../../assets/user_icon.png";
import bottleIcon from "../../assets/bottle_icon.png";

interface CellProps {
  entity: Entities;
}

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
        backgroundColor: `${
          entity === Entities.GPgp ? "rgb(242,167,167)" : "white"
        }`,
      }}
    >
      {entity === Entities.User && <img src={userIcon} />}
      {entity === Entities.PB && <img src={bottleIcon} />}
    </div>
  );
};
