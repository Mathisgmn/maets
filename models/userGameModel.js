import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const userGameModel = sequelize.define("user_game", {
  idConfig: { type: DataTypes.UUID, allowNull: false },
  idUser: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
  idGame: { type: DataTypes.UUID, primaryKey: true, allowNull: false },
}, { timestamps: false });

export default userGameModel;
