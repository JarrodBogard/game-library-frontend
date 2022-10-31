import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGameContext } from "../hooks/useGameContext";

export const useFetchData = () => {
  const { user } = useAuthContext();
  const { dispatch } = useGameContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://game-library-backend.vercel.app/api/games",
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      const json = await response.json();
      console.log(json);

      if (response.ok) {
        dispatch({
          type: "SET_GAMES",
          payload: json,
        });
      } else throw Error("Unable to find data");
    };

    if (user) {
      fetchData();
    }
  }, [user, dispatch]);

  return { useFetchData };
};
