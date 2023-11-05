"use strict";
const { DataTypes } = require("sequelize");
const { db } = require("./index");

const Tile = db.define("Tile", {
  tile_tile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tile_value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tile_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tile_isPlayerTile: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tile_isExchangeCache: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Tile.associate = (models) => {
  Tile.belongsTo(models.SavedGame, {
    onDelete: "CASCADE",
  });
};

try {
  Tile.sync();
  console.log("Tile model successfully created");
} catch (error) {
  console.log("Error creating Tile model: ", error);
}

module.exports = Tile;
