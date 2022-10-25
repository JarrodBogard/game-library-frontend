import { useAuthContext } from "./useAuthContext";
// import { useGameContext } from "./useGameContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  //   const { dispatch: gameDispatch } = useGameContext();

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
  };
  return { logout };
};
