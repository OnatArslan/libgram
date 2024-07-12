// Setting dotenv on config.env
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
// require app from app.js file
const app = require("./app");

// RUN SERVER ---------------------------
const port = process.env.PORT || 5000;
try {
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
} catch (error) {
  console.error(error.message);
}
