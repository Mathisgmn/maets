import Game from "./gameModel.js";
import User from "./userModel.js";
import UserGame from "./userGameModel.js";

const associate = () => {

  User.belongsToMany(Game, {
    through: UserGame,
    foreignKey: "idUser",
    as: "games",
  });

  Game.belongsToMany(User, {
    through: UserGame,
    foreignKey: "idGame",
    as: "users",
  });
};

export { associate };
