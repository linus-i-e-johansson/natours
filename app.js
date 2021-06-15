// request is received here, based on the route is either goes to
// tours or user. (app) ==> (tourRouter) ==> (controller) ==> makes the call and sends back response.
//
const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController")
const app = express();

//1) MIDDLEWARES
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json()); // middleware, needed so that the data from the body is added to the request-obj
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);
  next();
});

// 2) ROUTES
app.use("/api/v1/tours", tourRouter); // mounting the router
app.use("/api/v1/users", userRouter); // mounting the router

app.all("*",(req, res, next) => {
/*
  const err = new Error(`Cant find ${req.originalUrl} on this server!`);
  err.status = "fail";
  err.statusCode = 404;
  next(err);*/
  next(new AppError(`Cant find ${req.originalUrl} on this server!`,404));
});
app.use(globalErrorHandler)
module.exports = app;
