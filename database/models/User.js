"use strict";
const { DataTypes } = require("sequelize");
const { db } = require("./index");

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

User.associate = (models) => {
  User.hasMany(models.SavedGame, {
    onDelete: "CASCADE",
  });
  User.hasOne(models.Settings, {
    onDelete: "CASCADE",
  });
};

try {
  User.sync();
  console.log("User model successfully created");
} catch (error) {
  console.log("Error creating User model: ", error);
}

module.exports = User;
