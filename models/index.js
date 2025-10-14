import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import UserModel from "./userModel.js";
import GameModel from "./gameModel.js";
import RoleModel from "./roleModel.js";
import UserGameModel from "./userGameModel.js";
import UserRoleModel from "./userRoleModel.js";

dotenv.config();

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
    logging: false,
  }
);

// Initialisation
const User = UserModel(sequelize);
const Game = GameModel(sequelize);
const Role = RoleModel(sequelize);
const UserGame = UserGameModel(sequelize);
const UserRole = UserRoleModel(sequelize);


User.belongsToMany(Game, { through: UserGame, foreignKey: "userId" });
Game.belongsToMany(User, { through: UserGame, foreignKey: "gameId" });

User.belongsToMany(Role, { through: UserRole, foreignKey: "userId" });
Role.belongsToMany(User, { through: UserRole, foreignKey: "roleId" });

export { sequelize, User, Game, Role, UserGame, UserRole };
