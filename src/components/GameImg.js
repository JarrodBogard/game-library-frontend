const GameImg = ({ game }) => {
  const base64String = btoa(
    String.fromCharCode(...new Uint8Array(game.img.data.data))
  );
  console.log(game);

  return (
    <img
      style={{ width: "200px", height: "200px", alignSelf: "center" }}
      src={
        game &&
        game.img &&
        `data:${game.img.contentType};base64,${base64String}`
      }
      alt={`Cover: ${game.title}`}
    />
  );
};

export default GameImg;
