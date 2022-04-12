"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Settings extends Model {
    static associate(models) {
      Settings.belongsTo(models.User, {
        onDelete: "CASCADE"
      });
    }
  }
  Settings.init(
    {
      username: { type: DataTypes.STRING, allowNull: false },
      wordSuggestions: { type: DataTypes.BOOLEAN, allowNull: false },
      wordSearch: { type: DataTypes.BOOLEAN, allowNull: false },
      bagCount: { type: DataTypes.BOOLEAN, allowNull: false },
      lifeLines: { type: DataTypes.BOOLEAN, allowNull: false },
    },
    {
      sequelize,
      modelName: "Settings",
    }
  );
  return Settings;
};
