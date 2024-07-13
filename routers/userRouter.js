const express = require(`express`);
const userController = require(`../controllers/userController`);

const router = express.Router();

router.route(`/`).post().get();

module.exports = router;
