"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BagLetter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      BagLetter.belongsTo(models.TileObject, {
        onDelete: "CASCADE"
      })
    }

  }
  BagLetter.init(
    {
      bag_letter_tile: { type: DataTypes.STRING, allowNull: false },
      bag_letter_value: { type: DataTypes.INTEGER, allowNull: false }
 
    },
    {
      sequelize,
      modelName: "BagLetter",
    }
  );

  return BagLetter;
};
 