import React, { useState } from "react";
import { Direction } from "../../logic/Dice/dice";
import { MachineContext } from "../../logic/Game/stateMachine";
import { DirectionContainer, StepContainer } from "./Containers";
import { RollDiceButton } from "./Containers";
interface HeaderProps {
  rollDice: () => MachineContext;
}

export const Header: React.FC<HeaderProps> = ({ rollDice }) => {
  const [direction, setDirection] = useState<Direction>(Direction.North);
  const [directionNumber, setDirectionNumber] = useState<number>(0);
  const [step, setStep] = useState<number>(0);

  const updateState = () => {
    const context = rollDice();
    if (context.userLastTurn) {
      setDirection(context.userLastTurn);
      setDirectionNumber(context.directionNumber);
      setStep(context.step);
    }
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
