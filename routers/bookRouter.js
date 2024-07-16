const express = require("express");
const bookController = require("../controllers/bookController");

const reviewRouter = require(`./reviewRouter`);

const router = express.Router({ mergeParams: true });

// These routes for regular CRUD routes not specific

// For using `/bookId/reviews` create review on book
router.use(`/:bookId/reviews`, reviewRouter);

router
  .route(`/`)
  .get(bookController.getAllBooks)
  .post(bookController.createBook);

router
  .route(`/:id`)
  .get(bookController.getBook)
  .patch(bookController.updateBook) // Restrict Admin
  .delete(bookController.deleteBook); // Restrict Admin

module.exports = router;
