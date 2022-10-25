// react hooks and context
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGameContext } from "../hooks/useGameContext";

import GameInfo from "../components/GameInfo";
import AddGame from "../components/AddGame";

const Home = () => {
  const { user } = useAuthContext();
  const { games, dispatch } = useGameContext();

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
  }, [dispatch, user]);

  useEffect(() => console.log(games), [games]);

  return (
    <div className="home">
      <div className="games">
        {games && games.map((game) => <GameInfo key={game._id} game={game} />)}
      </div>
      {user && <AddGame />}
    </div>
  );
};

export default Home;
