const express = require("express");
const router = express.Router();
const fs = require("fs");
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

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

router.route("/").get(getAllTours).post(createTour);
router.route("/:id").get(getSingelTour).patch(updateTour).delete(deleteTour);
module.exports = router;
