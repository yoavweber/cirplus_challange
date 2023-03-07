import React from "react";
import { Direction } from "../../logic/Dice/dice";

interface RollDiceButtonProps {
  updateState: () => void;
}

interface DirectionBoxProps {
  number: number;
  direction: Direction;
}

const BOX_MARGIN = "10px";

const containerStyle = {
  backgroundColor: "white",
  display: "flex",
  border: "2px rgb(240,240,240) solid",
  margin: BOX_MARGIN,
  borderRadius: "5%",
  gap: "10px",
  padding: "10px",
  alignItems: "center",
  height: "69px",
};

const boxStyle = {
  width: "30px",
  height: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "2px solid",
};
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

export const DirectionContainer: React.FC<DirectionBoxProps> = ({
  number,
  direction,
}) => {
  return (
    <div
      style={{
        ...containerStyle,
      }}
    >
      <p>DIRECTION</p>
      <div style={{ ...boxStyle }}>{number}</div>
      <h4>{direction}</h4>
    </div>
  );
};

export const StepContainer: React.FC<{ number: number }> = ({ number }) => {
  return (
    <div style={{ ...containerStyle }}>
      <p>STEPS:</p> <div style={{ ...boxStyle }}>{number}</div>
    </div>
  );
};
