const express = require(`express`);
const userController = require(`../controllers/userController`);
const authController = require(`../controllers/authController`);

const router = express.Router();

// User routes
router.route(`/signUp`).post(authController.signUp);

router.route(`/signIn`).post(authController.signIn);

// Admin routes
router
  .route(`/`)
  .post(userController.createUser)
  .get(authController.isAuthenticated, userController.getAllUsers);

router.route(`/:id`).patch(userController.updateUser);

module.exports = router;
