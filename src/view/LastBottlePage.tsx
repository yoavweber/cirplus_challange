import React, { useMemo, useEffect } from "react";

import { useMachine } from "@xstate/react";
import { createIOMachine } from "../logic/io";
import { GameBoard } from "./gameBoard/GameBoard";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";

export const LastBottlePage: React.FC = () => {
  const machine = useMemo(() => createIOMachine, []);
  const [state, send] = useMachine(machine);

  const { board } = state.context;
  const rollDice = () => {
    const res = send("TURN");
    return res.context;
  };

  useEffect(() => {
    if (state.matches("pbWon")) {
      alert("Plastic bottle won, please refresh the page to play again");
    } else if (state.matches("userWon")) {
      alert("you won! please refresh the page to play again");
    }
  }, [state]);

  return (
    <div style={{ maxWidth: "1350px", maxHeight: "850px" }}>
      <Header rollDice={rollDice} />
      <div style={{ margin: "10px" }}>
        <GameBoard board={board} />
      </div>
      <Footer startGame={() => send("START_GAME")} />
    </div>
  );
};
