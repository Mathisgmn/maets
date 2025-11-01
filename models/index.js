import { sequelize } from "../config/database.js";
import Game from "./gameModel.js";
import User from "./userModel.js";
import Role from "./roleModel.js";
import UserRole from "./userRoleModel.js";
import UserGame from "./userGameModel.js";
import GameConfig from "./gameConfigModel.js";

/**
 * Associations
 */
// User <-> Role (many-to-many)
User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "user_id",
  otherKey: "role_id",
});
Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "role_id",
  otherKey: "user_id",
});

// User <-> Game (many-to-many)
User.belongsToMany(Game, {
  through: UserGame,
  foreignKey: "user_id",
  otherKey: "game_id",
});
Game.belongsToMany(User, {
  through: UserGame,
  foreignKey: "game_id",
  otherKey: "user_id",
});

// Game -> GameConfig (one-to-many)
Game.hasMany(GameConfig, { foreignKey: "game_id" });
GameConfig.belongsTo(Game, { foreignKey: "game_id" });

export {
  sequelize,
  Game,
  User,
  Role,
  UserRole,
  UserGame,
  GameConfig,
};