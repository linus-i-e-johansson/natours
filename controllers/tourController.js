// MIDDLEWARES
const Tour = require("../models/tourModel");

//GET ALL TOURS.
exports.getAllTours = async (req, res) => {
  try {
    console.log(req.query);
    // BUILD QUERY
    // 1.A) Filtering
    const queryObject = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObject[el]);

    // 1.B)Advanced filtering - gte,gt,lt,lte will be replaced with: $gte, $gt, $lt, $lte
    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g,match => `$${match}`);
    let query = Tour.find(JSON.parse(queryString));
    // Tour.find() returns a query, so that we can keep chaining methods to it.

    // 2.) Sorting
    if (req.query.sort){
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    }else{
      query= query.sort("-createdAt");
    }

    // 3.) Field limiting
    if(req.query.fields){
      const fields = req.query.fields.split(",").join(" ");
      query =  query.select(fields);
    }else {
      query.select("-__v")
    }

    // 4). Pagination
    const page = req.query.page * 1 || 1;//page & default page if not requested.
    const limit = req.query.limit * 1 || 100;// how many results on each page & 100 is default number.
    const skipValue = (page - 1 ) * limit;// calc of the pages to be ignored, I.E previous results.
    //console.log(skipValue)
    query = query.skip(skipValue).limit(limit);

    if(req.query.page){
      //check to see if we are skipping more tours than we have in DB.
      const numTours = await Tour.countDocuments();
      if(skipValue >= numTours) throw new Error("This page dosent exsist.")

    }


    //EXECUTE QUERY
    const tours = await query;
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
