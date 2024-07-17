const express = require("express");

const authController = require(`../controllers/authController`);
const adminController = require(`../controllers/adminController`);

const router = express.Router();

router.use(authController.isAuthenticated, authController.isAdmin);
router
  .route(`/`)
  .get(adminController.getAllUsers)
  .post(adminController.createUser)
  .patch(adminController.updateUser)
  .delete(adminController.deleteUser);

module.exports = router;
