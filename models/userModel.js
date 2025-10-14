import { DataTypes } from "sequelize";

export default (sequelize) => 
  sequelize.define('User', {
    id: {
      type: DataTypes.UUID,           
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'users',
    timestamps: true
  });
