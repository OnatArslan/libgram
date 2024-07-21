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
    title: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    isbn: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: true, // this must be false but for production best like this
      validate: {
        // isISBN: true, This is not neccessary for now COME BACK LATER
      },
    },
    authors: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    categories: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    publishedData: {
      type: DataTypes.DATE,
    },
  },
  {
    // Options goes here
    tableName: `books`,
    modelName: `Book`,
    sequelize,
    paranoid: true,
  }
);

module.exports = Book;
