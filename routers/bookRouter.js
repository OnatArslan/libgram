const express = require("express");
const bookController = require("./../controllers/bookController");

const router = express.Router();

router.route(`/`).get(bookController.getAllTours);

module.exports = router;
