import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const GameConfig = sequelize.define(
  "game_config",
  {
    id_game_config: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    key: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "game_config",
    timestamps: false,
  }
);

export default GameConfig;