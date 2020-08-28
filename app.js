const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
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

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//2) ROUTEHANDLERS
//GET all tours.
const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
      requestedAt: req.requestTime,
    },
  });
};

//GET a Single Tour
const getSingelTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tour,
    },
  });
};
//Add a new tour.
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: { tour: newTour },
      });
    }
  );
};
// UPDATE a tour
const updateTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: {
        tour: "<Updated tour here>",
      },
    });
  }
};
//DELETE a tour
const deleteTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  } else {
    res.status(204).json({
      status: "success",
      data: null,
    });
  }
};
// GET all users
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};
// GET a single user
const getSingleUser = (req, res, next) => {
  res.status(500).json({
    status: "success",
    message: "This route is not yet implemented",
  });
};

// CREATE a user
const createUser = (req, res, next) => {
  res.status(500).json({
    status: "success",
    message: "This route is not yet implemented",
  });
};
//UPDATE a user
const updateUser = (req, res, next) => {
  res.status(500).json({
    status: "success",
    message: "This route is not yet implemented",
  });
};
//DELETE a user
const deleteUser = (req, res, next) => {
  res.status(500).json({
    status: "success",
    message: "This route is not yet implemented",
  });
};

// 3) ROUTES

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter
  .route("/:id")
  .get(getSingelTour)
  .patch(updateTour)
  .delete(deleteTour);

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter
  .route("/:id")
  .get(getSingleUser)
  .patch(updateUser)
  .delete(deleteUser);

app.use("/api/v1/tours", tourRouter); // mounting the router
app.use("/api/v1/users", userRouter); // mounting the router

// 4) START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`Server listens on port ${port}`);
});
