import { createContext, useReducer } from "react";

export const GameContext = createContext();

export const gameReducer = (state, action) => {
  switch (action.type) {
    case "SET_GAMES":
      return { games: action.payload };
    case "ADD_GAME":
      return { games: [action.payload, ...state.games] };
    case "REMOVE_GAME":
      return {
        games: state.games.filter((game) => game._id !== action.payload._id),
      };
    case "UPDATE_GAME":
      return { games: [...state.games] };
    default:
      return state;
  }
};

export const GameContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, {
    games: null,
  });

  // console.log("GameContext state: ", state);

  return (
    <GameContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
