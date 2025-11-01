import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const User = sequelize.define(
  "users",
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
    defaultScope: {
      where: { isDeleted: false },
    },
    scopes: {
      deleted: { where: { isDeleted: true } },
      withDeleted: {},
    },
  }
);

export default User;