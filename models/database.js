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
  foreignKey: { name: `userId`, field: `user_id` },
  otherKey: { name: `bookId`, field: `book_id` },
});

Book.belongsToMany(User, {
  through: userBook,
  as: "owner",
  foreignKey: { name: `bookId`, field: `book_id` },
  otherKey: { name: `userId`, field: `user_id` },
});

User.hasMany(userBook, {
  foreignKey: { name: `userId`, field: `user_id` },
  onDelete: `CASCADE`,
  onUpdate: `CASCADE`,
});
Book.hasMany(userBook, {
  foreignKey: { name: `bookId`, field: `book_id` },
  onDelete: `CASCADE`,
  onUpdate: `CASCADE`,
});

userBook.belongsTo(User, { foreignKey: { name: `userId`, field: `user_id` } });
userBook.belongsTo(Book, { foreignKey: { name: `bookId`, field: `book_id` } });
// --------------------------------------------------------------------------------

// Relationship between User and User as friends
// Followers
User.belongsToMany(User, {
  through: userFollower,
  as: `follower`,
  foreignKey: { name: `followingId`, field: `following_id` },
  otherKey: { name: `followerId`, field: `follower_id` },
});

// Followings
User.belongsToMany(User, {
  through: userFollower,
  as: `following`,
  foreignKey: { name: `followerId`, field: `follower_id` },
  otherKey: { name: `followingId`, field: `following_id` },
});

User.hasMany(userFollower, {
  foreignKey: { name: `followingId`, field: `following_id` },
  onDelete: `CASCADE`,
  onUpdate: `CASCADE`,
});
User.hasMany(userFollower, {
  foreignKey: { name: `followerId`, field: `follower_id` },
  onDelete: `CASCADE`,
  onUpdate: `CASCADE`,
});

userFollower.belongsTo(User, {
  foreignKey: { name: `followingId`, field: `following_id` },
});

userFollower.belongsTo(User, {
  foreignKey: { name: `followerId`, field: `follower_id` },
});

// --------------------------------------------------------------------------------------------------------
// Relationship between User and Review models
User.hasMany(Review, {
  foreignKey: { name: `userId`, field: `user_id` },
  onDelete: `CASCADE`,
  onUpdate: `CASCADE`,
  as: `reviews`,
});

Review.belongsTo(User, {
  foreignKey: { name: `userId`, field: `user_id` },
  as: `owner`,
});

// Relationship between Book and Review Model
Book.hasMany(Review, {
  foreignKey: { name: `bookId`, field: `book_id` },
  onDelete: `CASCADE`,
  onUpdate: `CASCADE`,
  as: `reviews`,
});

Review.belongsTo(Book, {
  foreignKey: { name: `book_id`, field: `book_id` },
  as: `relatedBook`,
});
syncDatabase(); // This must be here end of the file because it checks all releationships and database configs
