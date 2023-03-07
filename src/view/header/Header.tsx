import React, { useState } from "react";
import { Direction } from "../../logic/Dice/dice";
import { MachineContext } from "../../logic/Game/stateMachine";
interface HeaderProps {
  rollDice: () => MachineContext;
}

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
const RollDiceButton: React.FC<RollDiceButtonProps> = ({ updateState }) => {
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
const DirectionContainer: React.FC<DirectionBoxProps> = ({
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

const StepContainer: React.FC<{ number: number }> = ({ number }) => {
  return (
    <div style={{ ...containerStyle }}>
      <p>STEPS:</p> <div style={{ ...boxStyle }}>{number}</div>
    </div>
  );
};

export const Header: React.FC<HeaderProps> = ({ rollDice }) => {
  const [direction, setDirection] = useState<Direction>(Direction.North);
  const [directionNumber, setDirectionNumber] = useState<number>(0);
  const [step, setStep] = useState<number>(0);

  const updateState = () => {
    const context = rollDice();
    setDirection(context.userLastTurn);
    setDirectionNumber(context.directionNumber);
    setStep(context.step);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0 50px",
      }}
    >
      <div>
        <h1 style={{ color: "rgb(121,121,121)" }}>The Last Bottle</h1>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <DirectionContainer number={directionNumber} direction={direction} />
        <StepContainer number={step} />
        <RollDiceButton updateState={updateState} />
      </div>
    </div>
  );
};
