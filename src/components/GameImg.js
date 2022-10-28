const GameImg = ({ game }) => {
  console.log(game);
  return (
    <img
      style={{ width: "200px", height: "200px", alignSelf: "center" }}
      src={
        game &&
        game.img &&
        `data:${game.img.contentType};base64,${game.img.data}`
      }
      alt={`Cover: ${game.title}`}
    />
  );
};

export default GameImg;
