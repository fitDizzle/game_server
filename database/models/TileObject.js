"use strict";
const { DataTypes } = require("sequelize");
const { db } = require("./index");

const TileObject = db.define("TileObject", {
  tile_object_isBag: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

TileObject.associate = (models) => {
  TileObject.belongsTo(models.SavedGame, {
    onDelete: "CASCADE",
  });
  TileObject.hasMany(models.BagLetter, {
    onDelete: "CASCADE",
  });
};

try {
  TileObject.sync();
  console.log("TileObject model successfully created");
} catch (error) {
  console.log("Error creating TileObject model: ", error);
}

module.exports = TileObject;
