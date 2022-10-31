import { useEffect, useState } from "react";
const GameImg = ({ game }) => {
  const [state, setState] = useState("");

  useEffect(() => {
    const base64String = btoa(
      new Uint8Array(game.img.data.data).reduce(function (data, byte) {
        return data + String.fromCharCode(byte);
      }, "")
    );
    // const base64String = btoa(
    //   String.fromCharCode(...new Uint8Array(game.img.data.data))
    // );

    setState(base64String);
  }, [game]);

  return (
    <img
      style={{ width: "200px", height: "200px", alignSelf: "center" }}
      src={game && game.img && `data:${game.img.contentType};base64,${state}`}
      alt={`Cover: ${game.title}`}
    />
  );
};

export default GameImg;
