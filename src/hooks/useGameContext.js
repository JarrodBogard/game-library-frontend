import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";

export const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw Error("useGameContext must be used inside the GameContextProvider");
  }

  return context;
};
