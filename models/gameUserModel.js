import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define("UserGame", {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    gameId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    configId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: "user_games",
    timestamps: true,
  });

