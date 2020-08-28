const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const app = express();

//1) MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json()); // middleware, needed so that the data from the body is added to the request-obj
app.use((req, res, next) => {
  console.log("Hello from the midddleware ;)");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTES

app.use("/api/v1/tours", tourRouter); // mounting the router
app.use("/api/v1/users", userRouter); // mounting the router

// 3) START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Server listens on port ${port}`);
});
