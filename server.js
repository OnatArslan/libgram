// Setting dotenv on config.env
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// require sequelize
const sequelize = require("./models/database");

// require app from app.js file
const app = require("./app");

// CREATE TABLES

// RUN SERVER IF DATABASE CONNECTED ---------------------------
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
