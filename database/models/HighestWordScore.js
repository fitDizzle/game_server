"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HighestWordScore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HighestWordScore.belongsTo(models.SavedGame, {
        onDelete: "CASCADE"
      })
    }

  }
  HighestWordScore.init(
    {
      highest_word_score_word: { type: DataTypes.STRING, allowNull: false },
      highest_word_score_score: { type: DataTypes.INTEGER, allowNull: false },
      highest_word_score_multiplier: { type: DataTypes.STRING, allowNull: false },
      highest_word_score_isPlayer: { type: DataTypes.INTEGER, allowNull: false }, 
    },
    { 
      sequelize,
      modelName: "HighestWordScore",
    }
  );

  return HighestWordScore;
};
 