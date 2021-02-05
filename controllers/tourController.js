// MIDDLEWARES
const Tour = require("../models/tourModel");
const APIFeatures = require("./../utils/apiFeatures");

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = "5";
  req.query.sort = "-ratingsAverage,price";
  req.query.fields ="name,price,ratingsAverage,summary,difficulty";
  next();
}




//GET ALL TOURS.
exports.getAllTours = async (req, res) => {
  try {
    //EXECUTE QUERY
    //const tours = await query;
    const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const tours = await features.query;
    //SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    }); //HANDLE POTENTIAL ERRORS
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

//GET A SINGLE TOUR
exports.getSingleTour = async (req, res) => {
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

//ADD A NEW TOUR.
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

// UPDATE A TOUR
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
//DELETE A TOUR
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

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: { $toUpper: "$difficulty" },
          numTours: { $sum: 1 },
          numRatings: { $sum: "$ratingsQuantity" },
          avgRating: { $avg: "$ratingsAverage" },
          avgPrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
      {
        $sort: {
          avgPrice: 1,
        },
      },
      //{$match:{_id: { $ne: "EASY"}}}
    ]);

    res.status(201).json({
      status: "success",
      data: {
        stats,
      },
    });

  }catch (err){
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}

exports.getMonthlyPlan = async (req,res) => {
  try {
    const year = req.params.year*1;
    const plan = await Tour.aggregate([
      { $unwind: "$startDates" },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$startDates" },
          numTourStarts: { $sum: 1 },
          tours: { $push: "$name" },
        },
      },
    ]);

    res.status(201).json({
      status: "success",
      data: {
        plan,
      },
    });

  }catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
}