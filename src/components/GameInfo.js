import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGameContext } from "../hooks/useGameContext";
import GameImg from "./GameImg";

const GameInfo = ({ game }) => {
  const [file, setFile] = useState([]);
  const { user } = useAuthContext();
  const { dispatch } = useGameContext();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData();
    formData.append("gameImg", file, file.name); // multer is looking at the "file" name in this formData

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

      const fetchData = async () => {
        const response = await fetch(
          "https://game-library-backend.vercel.app/api/games",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        const json = await response.json();

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
    console.log(game, game.img);
  }, [file, game]);

  return (
    <div className="game-info">
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
      {game && game.img && <GameImg game={game} />}
      {!game.img && (
        <div>
          <input type="file" onChange={handleFile}></input>
          <button onClick={handleFileSubmit}>Upload</button>
        </div>
      )}
      <h2>{game.title}</h2>
      <p>Price: ${game.price}</p>
    </div>
  );
};

export default GameInfo;
