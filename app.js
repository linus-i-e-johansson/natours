// request is recived here, based on the route is either goes to
// tours or user. (app) ==> (tourRouter) ==> (controller) ==> makes the call and sends back response

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

module.exports = app;
