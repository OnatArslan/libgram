const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

// Import routers
const bookRouter = require("./routers/bookRouter");
// define app
const app = express();

app.use(express.json());

app.use(`/api/v1/books`, bookRouter);
// app.use(`/api/v1/users`, userRouter);

app.use("*", (req, res, next) => {
  res.status(200).json({
    status: `fail`,
    message: `Can't find this route`,
  });
});

module.exports = app;
