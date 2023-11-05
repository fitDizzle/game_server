"use strict";
const { DataTypes } = require("sequelize");
const { db } = require("./index");

const PlayedWord = db.define("PlayedWord", {
  word_played_word: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  word_played_isPlayer: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

PlayedWord.associate = (models) => {
  PlayedWord.belongsTo(models.SavedGame, {
    onDelete: "CASCADE",
  });
};

try {
  PlayedWord.sync();
  console.log("PlayedWord model successfully created");
} catch (error) {
  console.log("Error creating PlayedWord model: ", error);
}

module.exports = PlayedWord;
