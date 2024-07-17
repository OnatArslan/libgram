const express = require(`express`);
const userController = require(`../controllers/adminController`);
const authController = require(`../controllers/authController`);
const profileController = require(`../controllers/profileController`);

const bookRouter = require(`./bookRouter`);

const router = express.Router({ mergeParams: true });

router
  .route(`/getMe`)
  .get(authController.isAuthenticated, profileController.getProfile);

// Friendship routes
router
  .route(`/addFriend/:followingId`)
  .get(authController.isAuthenticated, profileController.addFriend);

// Book Routes
router
  .route(`/addBook/:bookId`)
  .post(authController.isAuthenticated, profileController.addBookToLibrary);

// router.route(`/removeBook/:bookId`).get(authController.isAuthenticated,);

// Admin routes

module.exports = router;
