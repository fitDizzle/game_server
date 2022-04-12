"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PlayedWord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      PlayedWord.belongsTo(models.SavedGame,{
        onDelete: "CASCADE"
      })
    }
 
  }
  PlayedWord.init(
    {
      word_played_word: { type: DataTypes.STRING, allowNull: false },
      word_played_isPlayer: { type: DataTypes.INTEGER, allowNull: false },
 
    },
    {
      sequelize,
      modelName: "PlayedWord",
    }
  );

  return PlayedWord;
};
 