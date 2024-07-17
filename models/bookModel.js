const { Sequelize, DataTypes, Model } = require(`sequelize`);
const sequelize = require(`./database`);

class Book extends Model {}

Book.init(
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
      type: DataTypes.STRING(20),
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
    modelName: `Book`,
    sequelize,
  }
);

module.exports = Book;
