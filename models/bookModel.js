const { Sequelize, DataTypes, Model } = require(`sequelize`);
const sequelize = require(`./database`);

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
    },
    isbn: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
  },
  {
    // Options goes here
    tableName: `books`,
  }
);

// Book.sync({ alter: true });

module.exports = Book;
