import { useAuthContext } from "./useAuthContext";
import { useGameContext } from "./useGameContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: gamesDispatch } = useGameContext();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
    gamesDispatch({ type: "SET_GAMES", payload: null });
  };

  return { logout };
};
