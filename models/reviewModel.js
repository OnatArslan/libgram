const { Sequelize, DataTypes, Model } = require("sequelize");

const sequelize = require(`./database`);

class Review extends Model {}

Review.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: `Review`,
    tableName: `reviews`,
  }
);

module.exports = Review;
