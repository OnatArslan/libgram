const express = require(`express`);

const authController = require(`../controllers/authController`);
const profileController = require(`../controllers/profileController`);

const router = express.Router({ mergeParams: true });

router
  .route(`/`)
  .get(authController.isAuthenticated, profileController.getProfile);

// Friendship routes
router
  .route(`/follow/:followingId`)
  .get(authController.isAuthenticated, profileController.follow);

// Book Routes
router
  .route(`/addBook/:bookId`)
  .post(authController.isAuthenticated, profileController.addBookToLibrary);

// router.route(`/removeBook/:bookId`).get(authController.isAuthenticated,);

// Admin routes

module.exports = router;
