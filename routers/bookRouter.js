const express = require("express");
const bookController = require("../controllers/bookController");

const authController = require(`../controllers/authController`);

const reviewRouter = require(`./reviewRouter`);

const router = express.Router({ mergeParams: true });

router.use(`/:bookId/reviews`, reviewRouter);

// These routes for regular CRUD routes not specific

// For using `/bookId/reviews` create review on book

router
  .route(`/`)
  .get(bookController.getAllBooks)
  .post(
    authController.isAuthenticated,
    authController.isAdmin,
    bookController.createBook
  );

router
  .route(`/:id`)
  .get(bookController.getBook)
  .patch(bookController.updateBook) // Restrict Admin
  .delete(
    authController.isAuthenticated,
    authController.isAdmin,
    bookController.deleteBook
  ); // Restrict Admin

module.exports = router;
