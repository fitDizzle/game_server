"use strict";
const { DataTypes } = require("sequelize");
const { db } = require("./index");

const Move = db.define("Move", {
  tile: {
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
  tile_parent_x: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tile_parent_y: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tile_tilestate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tile_isAI: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Move.associate = (models) => {
  Move.belongsTo(models.SavedGame, {
    onDelete: "CASCADE",
  });
};

try {
  Move.sync();
  console.log("Move model successfully created");
} catch (error) {
  console.log("Error creating Move model: ", error);
}

module.exports = Move;
