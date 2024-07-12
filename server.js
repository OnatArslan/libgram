const dotenv = require("dotenv");
const { Sequelize } = require(`sequelize`);
dotenv.config({ path: "./config.env" });
const app = require("./app");

// DATABASE CONFIG
const sequelize = new Sequelize(process.env.DATABASE_URL);
// Test the connection
try {
  sequelize.authenticate();
  console.log(`Connection has been established successfully.`);
} catch (error) {
  console.log(`Unable to connect to the database:`, error);
}

// RUN SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
