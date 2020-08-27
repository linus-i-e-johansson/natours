const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json()); // middleware, needed so that the data from the body is added to the request-obj

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
//GET all tours.
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

//GET a Single Tour
app.get("/api/v1/tours/:id", (req, res) => {
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
});

//Add a new tour.
app.post("/api/v1/tours", (req, res) => {
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
});

app.patch("/api/v1/tours/:id", (req, res) => {
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
});

app.delete("/api/v1/tours/:id", (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listens on port ${port}`);
});
