const { Sequelize, DataTypes, Model } = require(`sequelize`);
const sequelize = require(`./database`);
const validator = require("validator");

const Book = sequelize.define(
  `Book`,
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      validate: {
        min: 3,
        max: 50,
      },
    },
    isbn: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: true, // this must be false but for production best like this
      validate: {
        // isISBN: true, This is not neccessary for now COME BACK LATER
      },
    },
  },
  {
    // Options goes here
    tableName: `books`,
  }
);

// Book.sync({ alter: true });

module.exports = Book;
