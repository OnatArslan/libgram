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

module.exports = app;
