//staring file
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

// 1) START SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listens on port ${port}`);
});
