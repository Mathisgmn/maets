import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const UserGame = sequelize.define(
  "user_game",
  {
    id_user_game: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    progress: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    tableName: "user_game",
    timestamps: false,
  }
);

export default UserGame;