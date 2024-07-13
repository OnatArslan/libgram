const dotenv = require("dotenv");

dotenv.config({ path: "../config.env" });
const { Sequelize } = require(`sequelize`);

// DATABASE CONFIG
const sequelize = new Sequelize(process.env.DATABASE_URL);

// Test the connection
try {
  sequelize.authenticate();
  console.log(`DATABASE CONNECTED SUCCESFULY`);
} catch (error) {
  console.log(`Unable to connect to the database:`, error);
}

// Export the sequelize object
module.exports = sequelize;

const User = require(`./userModel`);
const Book = require(`./bookModel`);

User.belongsToMany(Book, {
  through: { model: "userbook", unique: false },
  as: "books",
  foreignKey: "userId",
  otherKey: "bookId",
});
Book.belongsToMany(User, {
  through: { model: "userbook", unique: false },
  as: "owners",
  foreignKey: "bookId",
  otherKey: "userId",
});
