const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const { Sequelize } = require(`sequelize`);

// DATABASE CONNECTION
const sequelize = new Sequelize(process.env.DATABASE_URL);
// Export the sequelize object
module.exports = sequelize;

// Test connection and sync models
async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("DATABASE CONNECTED SUCCESSFULLY");
    await sequelize.sync({ alter: true, logging: false });
    console.log("Database synchronization successful");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// RELEATIONSHIPS DEFINED HERE
const User = require("./userModel");
const Book = require("./bookModel");

// Place model associations here
User.belongsToMany(Book, {
  through: "userbook",
  as: "books",
  foreignKey: "userId",
  otherKey: "bookId",
});
Book.belongsToMany(User, {
  through: "userbook",
  as: "owners",
  foreignKey: "bookId",
  otherKey: "userId",
});

syncDatabase(); // This must be here end of the file because it checks all releationships and database configs
