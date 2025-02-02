const express = require(`express`);
const authController = require(`../controllers/authController`);
const profileRouter = require(`./profileRouter`);

const bookRouter = require(`./bookRouter`);

const router = express.Router({ mergeParams: true });

router.use(`/:userId/books`, bookRouter);

// User routes
router.route(`/signUp`).post(authController.signUp);
router.route(`/signIn`).post(authController.signIn);

// Password reset
router.route(`/forgot-password`).post(authController.sendPasswordToken);
router.route(`/change-password`).post(authController.resetPassword);

module.exports = router;
