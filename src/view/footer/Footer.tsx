import React from "react";

interface FooterProps {
  startGame: () => void;
}

const buttonStyle = {
  width: "182px",
  height: "48px",
  backgroundColor: "rgb(0,235,18)",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const Footer: React.FC<FooterProps> = ({ startGame }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row-reverse" }}>
      <button style={{ ...buttonStyle }} onClick={startGame}>
        <h4>START</h4>
      </button>
    </div>
  );
};
