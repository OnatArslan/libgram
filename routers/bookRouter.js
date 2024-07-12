const express = require("express");
const bookController = require("./../controllers/bookController");

const router = express.Router();

router
  .route(`/`)
  .get(bookController.getAllBooks)
  .post(bookController.createBook);

router
  .route(`/:id`)
  .get(bookController.getBook)
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

module.exports = router;
