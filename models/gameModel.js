import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const Game = sequelize.define("game", {
  id_game: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  }
}, {
  tableName: "game",
  timestamps: false
});

export default Game;
// ...existing code...