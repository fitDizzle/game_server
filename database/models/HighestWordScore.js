"use strict";
const { DataTypes } = require("sequelize");
const { db } = require("./index");

const HighestWordScore = db.define("HighestWordScore", {
  highest_word_score_word: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  highest_word_score_score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  highest_word_score_multiplier: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  highest_word_score_isPlayer: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

HighestWordScore.associate = (models) => {
  HighestWordScore.belongsTo(models.SavedGame, {
    onDelete: "CASCADE",
  });
};

try {
  HighestWordScore.sync();
  console.log("HighestWordScore model successfully created");
} catch (error) {
  console.log("Error creating HighestWordScore model: ", error);
}

module.exports = HighestWordScore;
