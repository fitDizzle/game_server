"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Move extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Move.belongsTo(models.SavedGame, {
        onDelete: "CASCADE"
      });
    }
  }
  Move.init(
    {
      tile: { type: DataTypes.STRING, allowNull: false },
      tile_value: { type: DataTypes.INTEGER, allowNull: false },
      tile_id: { type: DataTypes.STRING, allowNull: false },
      tile_parent_x: { type: DataTypes.INTEGER, allowNull: false },
      tile_parent_y: { type: DataTypes.INTEGER, allowNull: false },
      tile_tilestate: { type: DataTypes.STRING, allowNull: false },
      tile_isAI: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Move",
    }
  );

  return Move;
};
