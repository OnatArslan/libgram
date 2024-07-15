const express = require("express");
const reviewController = require(`../controllers/reviewController`);
const authController = require(`../controllers/authController`);

// This mergeParams:true because of
const router = express.Router();

// These routes are not
router
  .route(`/`)
  .get(authController.isAuthenticated, reviewController.getAllReviews);

// This is create a review based on a book
// And gets user from auth middleware
router
  .route(`/:id`)
  .post(authController.isAuthenticated, reviewController.createReview);

module.exports = router;
