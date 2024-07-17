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

// IMPORT MODELS FOR REL
const User = require("./userModel");
const userFollower = require(`./userFollowerModel`);
const Book = require("./bookModel");
const userBook = require("./userBookModel");
const Review = require(`./reviewModel`);

// PLACE MODEL RELEATIONSHIPS HERE

// Releationship between User and Book model to 47
User.belongsToMany(Book, {
  through: userBook,
  as: "book",
  foreignKey: `userId`,
  otherKey: `bookId`,
});

Book.belongsToMany(User, {
  through: userBook,
  as: "owner",
  foreignKey: `bookId`,
  otherKey: `userId`,
});

User.hasMany(userBook, { foreignKey: `userId` });
Book.hasMany(userBook, { foreignKey: `bookId` });

userBook.belongsTo(User, { foreignKey: `userId` });
userBook.belongsTo(Book, { foreignKey: `bookId` });
// --------------------------------------------------------------------------------

// Relationship between User and User as friends
// Followers
User.belongsToMany(User, {
  through: userFollower,
  as: `follower`,
  foreignKey: `followingId`,
  otherKey: `followerId`,
});

// Followings
User.belongsToMany(User, {
  through: userFollower,
  as: `following`,
  foreignKey: `followerId`,
  otherKey: `followingId`,
});

User.hasMany(userFollower, { foreignKey: `followingId` });
User.hasMany(userFollower, { foreignKey: `followerId` });

userFollower.belongsTo(User, { foreignKey: `followingId` });
userFollower.belongsTo(User, { foreignKey: `followerId` });

// --------------------------------------------------------------------------------------------------------
// Relationship between User and Review models
User.hasMany(Review, {
  foreignKey: `userId`,
  onDelete: `CASCADE`,
  onUpdate: `NO ACTION`,
  as: `reviews`,
});

Review.belongsTo(User, { foreignKey: `userId`, as: `owner` });

// Relationship between Book and Review Model
Book.hasMany(Review, {
  foreignKey: `bookId`,
  onDelete: `CASCADE`,
  onUpdate: `NO ACTION`,
  as: `reviews`,
});

Review.belongsTo(Book, { foreignKey: `bookId`, as: `relatedBook` });
syncDatabase(); // This must be here end of the file because it checks all releationships and database configs
