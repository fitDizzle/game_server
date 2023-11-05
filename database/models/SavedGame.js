"use strict";
const { DataTypes } = require("sequelize");
const { db } = require("./index");

const SavedGame = db.define("SavedGame", {
  game_isActive: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  game_username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  game_player_score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  game_ai_score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  game_isPlayerActive: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  game_level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

SavedGame.associate = (models) => {
  SavedGame.belongsTo(models.User, {
    onDelete: "CASCADE",
  });
  SavedGame.hasMany(models.Move, {
    onDelete: "CASCADE",
  });
  SavedGame.hasMany(models.TileObject, {
    onDelete: "CASCADE",
  });
  SavedGame.hasMany(models.Tile, {
    onDelete: "CASCADE",
  });
  SavedGame.hasMany(models.PlayedWord, {
    onDelete: "CASCADE",
  });
  SavedGame.hasMany(models.HighestWordScore, {
    onDelete: "CASCADE",
  });
};

try {
  SavedGame.sync();
  console.log("SavedGame model successfully created");
} catch (error) {
  console.log("Error creating SavedGame model: ", error);
}

module.exports = SavedGame;
