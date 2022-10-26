import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGameContext } from "../hooks/useGameContext";

const GameInfo = ({ game }) => {
  const [file, setFile] = useState([]);
  const [fileName, setFileName] = useState("");
  const { user } = useAuthContext();
  const { dispatch } = useGameContext();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const formData = new FormData();
    formData.append("file", file, file.name);

    console.log(formData.get("file"), "formData");
    const response = await fetch(
      "http://localhost:4000/api/games/image/" + game._id,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${user.token}` },
        body: formData,
      }
    );
    // "https://game-library-backend.vercel.app/api/games/image/" + game._id,

    const json = await response.json();

    console.log(json, "json in patch request");
    if (response.ok) {
      console.log("worked");
      dispatch({ type: "UPDATE_GAME", payload: json });
      setFileName("");
      setFile([]);
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
    console.log(file, file.name, "name");
    console.log(fileName);
    console.log("file and fileName");
  }, [file, fileName]);

  return (
    <div className="game-info">
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
      <div>{game.fileName}</div>
      <input type="file" onChange={handleFile}></input>
      <button onClick={handleFileSubmit}>Upload</button>
      <h2>{game.title}</h2>
      <p>Price: ${game.price}</p>
    </div>
  );
};

export default GameInfo;
