"use strict";
const { Model } = require("sequelize");
const TileObject = require("./TileObject");
module.exports = (sequelize, DataTypes) => {
  class SavedGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      SavedGame.belongsTo(models.User, {
        onDelete: "CASCADE"
      })
      SavedGame.hasMany(models.Move, {
        onDelete: "CASCADE"
      })
      SavedGame.hasMany(models.TileObject, {
        onDelete: "CASCADE"
      })
      SavedGame.hasMany(models.Tile,{
        onDelete: "CASCADE"
      })
      SavedGame.hasMany(models.PlayedWord,{
        onDelete: "CASCADE"
      }) 
      SavedGame.hasMany(models.HighestWordScore, {
        onDelete: "CASCADE"
      })
    }

  }
  SavedGame.init(
    {
      game_isActive: { type: DataTypes.INTEGER, allowNull: false },
      game_username: { type: DataTypes.STRING, allowNull: false },
      game_player_score: { type: DataTypes.INTEGER, allowNull: false },
      game_ai_score: { type: DataTypes.INTEGER, allowNull: false },
      game_isPlayerActive: { type: DataTypes.INTEGER, allowNull: false },
      game_level: { type: DataTypes.STRING, allowNull: false }
      
 
    },
    {
      sequelize,
      modelName: "SavedGame",
    }
  );

  return SavedGame;
};
 