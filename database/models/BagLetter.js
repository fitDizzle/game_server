"use strict";
const { DataTypes } = require("sequelize");
const { db } = require("./index");

const BagLetter = db.define("BagLetter", {
  bag_letter_tile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bag_letter_value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

BagLetter.associate = (models) => {
  BagLetter.belongsTo(models.TileObject, {
    onDelete: "CASCADE",
  });
};

try {
  BagLetter.sync();
  console.log("BagLetter model successfully created");
} catch (error) {
  console.log("Error creating BagLetter model: ", error);
}

module.exports = BagLetter;
