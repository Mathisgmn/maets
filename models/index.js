import Game from "./gameModel.js";
import User from "./userModel.js";
import UserGame from "./userGameModel.js";

export const associate = () => {
  User.belongsToMany(Game, {
    through: UserGame,
    foreignKey: "idUser",
    otherKey: "idGame",
    as: "games",
  });

  Game.belongsToMany(User, {
    through: UserGame,
    foreignKey: "idGame",
    otherKey: "idUser",
    as: "users",
  });

  UserGame.belongsTo(User, { foreignKey: "idUser", as: "user" });
  UserGame.belongsTo(Game, { foreignKey: "idGame", as: "game" });

  User.hasMany(UserGame, { foreignKey: "idUser", as: "userGames" });
  Game.hasMany(UserGame, { foreignKey: "idGame", as: "userGames" });
};

export { Game, User, UserGame };
