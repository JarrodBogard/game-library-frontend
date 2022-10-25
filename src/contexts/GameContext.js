import { createContext, useReducer } from "react";
// import { useAuthContext } from "../hooks/useAuthContext";

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
    default:
      return state;
  }
};

export const GameContextProvider = ({ children }) => {
  //   const { user } = useAuthContext();
  const [state, dispatch] = useReducer(gameReducer, {
    games: null,
  });

  //   useEffect(() => {
  //     const games = JSON.parse(localStorage.getItem("games"));

  //     if (user) {
  //       dispatch({ type: "SET_GAMES", payload: games });
  //     }
  //   }, [user]);

  console.log("GameContext state: ", state);

  return (
    <GameContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};