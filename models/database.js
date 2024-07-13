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

User.belongsToMany(Book, { through: `userBook`, as: `books` });
Book.belongsToMany(User, { through: `userBook`, as: `owners` });
