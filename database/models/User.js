"use strict";
const { DataTypes } = require("sequelize");
const { db } = require("./index");
const Settings = require('../models/Settings');
const SavedGame = require('../models/SavedGame');

const User = db.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(SavedGame, {
  onDelete: "CASCADE",
});
User.hasOne(Settings, {
  onDelete: "CASCADE",
});

try {
  User.sync();
  console.log("User model successfully created");
} catch (error) {
  console.log("Error creating User model: ", error);
}

module.exports = User;
