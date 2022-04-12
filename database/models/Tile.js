"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Tile.belongsTo(models.SavedGame, {
        onDelete: "CASCADE"
      })
    }

  }
  Tile.init(
    {
      tile_tile: { type: DataTypes.STRING, allowNull: false },
      tile_value: { type: DataTypes.INTEGER, allowNull: false },
      tile_id: { type: DataTypes.STRING, allowNull: false },
      tile_isPlayerTile: { type: DataTypes.INTEGER, allowNull: false },
      tile_isExchangeCache: { type: DataTypes.INTEGER, allowNull: false }
 
    },
    {
      sequelize,
      modelName: "Tile",
    }
  );

  return Tile;
};
 