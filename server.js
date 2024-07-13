// Setting dotenv on config.env
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// require sequelize object which i declere in database.js
const sequelize = require(`./models/database`);
// require app from app.js file
const app = require("./app");

// CREATE TABLES

// RUN SERVER IF DATABASE CONNECTED ---------------------------
const port = process.env.PORT || 5000;

sequelize
  .sync({ alter: true, logging: false })
  .then(() => {
    console.log(`Database synchronization succesfuly done`);
    app.listen(port, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(`Failed to synchronization database models:`, error);
  });
