const { Sequelize, DataTypes, Model } = require(`sequelize`);
const sequelize = require(`./index`);

class Book extends Model {}

Book.init(
  {
    // Attiributes goes here
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
    sequelize, // Need add sequelize here
    modelName: `books`, // books is plural model name
  }
);

Book.sync({ alter: true });

module.exports = Book;
