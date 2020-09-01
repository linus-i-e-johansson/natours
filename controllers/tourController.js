const Tour = require("../models/tourModel");

// MIDDLEWARES
//GET all tours.
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    /*results: tours.length,
    data: {
      tours,
      requestedAt: req.requestTime,
    }*/
  });
};

//GET a Single Tour
exports.getSingelTour = (req, res) => {
  const id = req.params.id * 1;
  /* const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tour,
    },
  });*/
};

//Add a new tour.
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Invalid data sent!",
    });
  }
};

// UPDATE a tour
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here>",
    },
  });
};
//DELETE a tour
exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: "success",
    data: null,
  });
};
