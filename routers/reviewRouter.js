const express = require("express");
const reviewController = require(`../controllers/reviewController`);
const authController = require(`../controllers/authController`);

// This mergeParams:true because of
const router = express.Router({ mergeParams: true });

// These routes are not
router
  .route(`/`)
  .get(authController.isAuthenticated, reviewController.getAllReviews)
  .post(authController.isAuthenticated, reviewController.createReview);

module.exports = router;
