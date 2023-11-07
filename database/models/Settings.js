"use strict";
const { DataTypes } = require("sequelize");
const { db } = require("./index");

const Settings = db.define("Settings", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  wordSuggestions: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  wordSearch: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  bagCount: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  lifeLines: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

Settings.associate = (models) => {
  Settings.belongsTo(models.User, {
    onDelete: "CASCADE",
  });
};

try {
  Settings.sync();
  console.log("Settings model successfully created");
} catch (error) {
  console.log("Error creating Settings model: ", error);
}

module.exports = Settings;
