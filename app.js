const express = require("express");
const app = express();

const port = 3000;

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({ msg: "This is the start point" });
});

app.listen(port, () => {
  console.log(`Server listens on port ${port}`);
});
