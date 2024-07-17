const express = require(`express`);
const userController = require(`../controllers/adminController`);
const authController = require(`../controllers/authController`);

const bookRouter = require(`./bookRouter`);

const router = express.Router({ mergeParams: true });

router.use(`/:userId/books`, bookRouter);

// User routes
router.route(`/signUp`).post(authController.signUp);
router.route(`/signIn`).post(authController.signIn);

// Friendship routes
router
  .route(`/getMe`)
  .get(authController.isAuthenticated, authController.getProfile);

router
  .route(`/addFriend/:followingId`)
  .get(authController.isAuthenticated, authController.addFriend);

router
  .route(`/addBook/:bookId`)
  .post(authController.isAuthenticated, authController.addBookToLibrary);

// router.route(`/removeBook/:bookId`).get(authController.isAuthenticated,);

// Admin routes

module.exports = router;
