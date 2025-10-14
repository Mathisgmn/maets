import { DataTypes } from "sequelize";

export default (sequelize) => 
  sequelize.define('Game', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'games',
    timestamps: false
  });
