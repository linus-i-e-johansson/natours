const Tour = require("../models/tourModel");

// MIDDLEWARES
//GET all tours.
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (eee) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

//GET a Single Tour
exports.getSingelTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findOne({
      _id: id,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
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
exports.updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedtour = await Tour.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        updatedtour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
//DELETE a tour
exports.deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    await Tour.findByIdAndDelete({ _id: id }, { rawResult: true });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
