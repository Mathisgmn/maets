import { DataTypes } from "sequelize";

export default (sequelize) =>
  sequelize.define("UserRole", {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    tableName: "user_roles",
    timestamps: false,
  });
