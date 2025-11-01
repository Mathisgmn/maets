import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

const Role = sequelize.define(
  "roles",
  {
    id_role: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "roles",
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

export default Role;