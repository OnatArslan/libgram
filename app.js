// IMPORT GLOBAL REQUERIMENTS
const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
// IMPORT ROUTES
const bookRouter = require("./routers/bookRouter");
const userRouter = require("./routers/userRouter");
// DEFINE APP
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(morgan(`dev`));

// Limit for brutforce attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use(helmet()); // Helmet helps secure your Express apps by setting various HTTP headers.

// ROUTINGS
app.use(`/api/v1/books`, bookRouter);
app.use(`/api/v1/users`, userRouter);

app.use("*", (req, res, next) => {
  res.status(200).json({
    status: `fail`,
    message: `Can't find this route`,
  });
});

module.exports = app;
