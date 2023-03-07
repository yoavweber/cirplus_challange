import React from "react";

interface RollDiceButtonProps {
  updateState: () => void;
}

export const RollDiceButton: React.FC<RollDiceButtonProps> = ({
  updateState,
}) => {
  return (
    <button
      style={{
        backgroundColor: "black",
        cursor: "pointer",
        width: "182px",
        height: "48px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => updateState()}
    >
      <h4 style={{ color: "white" }}>ROLL DICE</h4>
    </button>
  );
};
