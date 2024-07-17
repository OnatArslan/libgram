const express = require(`express`);
const userController = require(`../controllers/adminController`);
const authController = require(`../controllers/authController`);

const bookRouter = require(`./bookRouter`);

const router = express.Router({ mergeParams: true });

router.use(`/:userId/books`, bookRouter);

// User routes
router.route(`/signUp`).post(authController.signUp);
router.route(`/signIn`).post(authController.signIn);

module.exports = router;
