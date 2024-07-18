const express = require(`express`);

const authController = require(`../controllers/authController`);
const profileController = require(`../controllers/profileController`);

const router = express.Router({ mergeParams: true });

router.use(authController.isAuthenticated);

router.route(`/`).get(profileController.getProfile);

// Friendship routes
router.route(`/follow/:followingId`).get(profileController.follow);

router.route(`/unfollow/:followingId`).get(profileController.follow);

router.route(`/followers`).get(profileController.getFollowers);

router.route(`/followings`).get(profileController.getFollowings);

// Book Routes
// Get all books which belongs to current user
router.route(`/book`).get(profileController.getBooks);

// Add book to my library and remove book from my library
router
  .route(`/book/:bookId`)
  .post(profileController.addBookToLibrary)
  .delete(profileController.removeBookFromLibrary);

// router.route(`/removeBook/:bookId`).get(authController.isAuthenticated,);

// Admin routes

module.exports = router;
