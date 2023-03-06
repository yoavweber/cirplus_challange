import React, { useMemo } from "react";

import { useMachine } from "@xstate/react";
import { createIOMachine } from "../logic/io";
import { GameBoard } from "./gameBoard/GameBoard";
import { Header } from "./header/Header";

export const LastBottlePage: React.FC = () => {
  const machine = useMemo(() => createIOMachine, []);
  const [state, send] = useMachine(machine);

  const { board, userLastTurn, step } = state.context;
  const rollDice = () => {
    const res = send("TURN");
    return res.context;
  };
  return (
    <div>
      <button onClick={() => send("START_GAME")}>start game</button>

      <Header rollDice={rollDice} />
      <Footer startGame={() => send("START_GAME")} />
    </div>
  );
};
