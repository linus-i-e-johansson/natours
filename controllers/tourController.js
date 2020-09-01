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
exports.createTour = (req, res) => {
  res.status(201).json({
    status: "success",
    /*data: { tour: newTour },*/
  });
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
