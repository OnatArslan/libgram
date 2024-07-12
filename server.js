const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");

// RUN SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
