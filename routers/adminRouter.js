const express = require("express");

const userController = require(`../controllers/adminController`);

const router = express.Router();

router.route(`/`).get().post().patch().delete();

module.exports = router;
