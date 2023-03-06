import React, { useState } from "react";
import { Direction } from "../../Dice/dice";
import { MachineContext } from "../../Game/stateMachine";

interface HeaderProps {
  rollDice: () => MachineContext;
}

export const Header: React.FC<HeaderProps> = ({ rollDice }) => {
  const [direction, setDirectionn] = useState<Direction>(Direction.North);
  const [step, setStep] = useState<number>(0);

  const updateState = () => {
    const context = rollDice();
    setDirectionn(context.userLastTurn);
    setStep(context.step);
  };
  return (
    <div>
      <div>The Last Bottle</div>
      <button onClick={() => updateState()}>send state</button>
      <div>{direction}</div>
      <div>{step}</div>
    </div>
  );
};
