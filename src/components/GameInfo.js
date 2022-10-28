import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGameContext } from "../hooks/useGameContext";
import GameImg from "./GameImg";

const GameInfo = ({ game }) => {
  const [file, setFile] = useState([]);
  const { user } = useAuthContext();
  const { games, dispatch } = useGameContext();

  const handleFile = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData();
    formData.append("file", file, file.name);

    console.log(formData.get("file", "formData"));
    const response = await fetch(
      "http://localhost:4000/api/games/image/" + game._id,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      }
    );
    // "https://game-library-backend.vercel.app/api/games/image/" + game._id,

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_GAME", payload: json });
      setFile([]);
      e.target.file = null;
    } else throw Error("Unable to upload image");
  };

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

  useEffect(() => {
    console.log(game);
    console.log(game.img);
  }, [file, game]);

  return (
    <div className="game-info">
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
      {game && game.img && <GameImg game={game} />}
      {!game.img && (
        <div>
          <input type="file" name="gameImg" onChange={handleFile}></input>
          <button onClick={handleFileSubmit}>Upload</button>
        </div>
      )}
      <h2>{game.title}</h2>
      <p>Price: ${game.price}</p>
    </div>
  );
};

export default GameInfo;
