//staring file
const app = require("./app");
// 1) START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Server listens on port ${port}`);
});
