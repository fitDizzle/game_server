"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TileObject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      TileObject.belongsTo(models.SavedGame,{
        onDelete: "CASCADE"
      })
      TileObject.hasMany(models.BagLetter, {
        onDelete: "CASCADE"
      })
    }

  }
  TileObject.init(
    {
      tile_object_isBag: { type: DataTypes.INTEGER, allowNull: false },

      
      
 
    },
    {
      sequelize,
      modelName: "TileObject",
    }
  );

  return TileObject;
};
 