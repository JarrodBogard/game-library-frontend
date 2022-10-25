import { useAuthContext } from "../hooks/useAuthContext";
import { useGameContext } from "../hooks/useGameContext";

const GameInfo = ({ game }) => {
  const { user } = useAuthContext();
  const { dispatch } = useGameContext();

  const handleClick = async () => {
    if (!user) return;

    const response = await fetch(
      "https://game-library-backend.vercel.app/api/games/" + game._id,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    const json = await response.json();

    if (response.ok) dispatch({ type: "REMOVE_GAME", payload: json });
    else throw Error("Game not found");
  };

  return (
    <div className="game-info">
      <span onClick={handleClick}>Remove</span>
      <h2>{game.title}</h2>
      <span>{game.price}</span>
    </div>
  );
};

export default GameInfo;
