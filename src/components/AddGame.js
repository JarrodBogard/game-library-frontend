import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useGameContext } from "../hooks/useGameContext";

const AddGame = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [release_date, setReleaseDate] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const { user } = useAuthContext();
  const { dispatch } = useGameContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Must be logged in");
      return;
    }

    const game = { title, price, release_date };

    const response = await fetch(
      "https://game-library-backend.vercel.app/api/games",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(game),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      dispatch({ type: "ADD_GAME", payload: json });
      setTitle("");
      setPrice("");
      setReleaseDate("");
      setError(null);
      setEmptyFields([]);
    }
  };

  return (
    <form className="add-game" onSubmit={handleSubmit}>
      <h3>Add Game</h3>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={emptyFields.includes("title") ? "error" : ""}
        required
      />
      <label htmlFor="price">Price:</label>
      <input
        type="number"
        name="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className={emptyFields.includes("price") ? "error" : ""}
        required
      />
      <label htmlFor="release_date">Release Date:</label>
      <input
        type="text"
        name="release_date"
        value={release_date}
        onChange={(e) => setReleaseDate(e.target.value)}
        className={emptyFields.includes("release_date") ? "error" : ""}
        required
      />
      <button>Add Game</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AddGame;
