const User = require("../models/userModel");
const catchAsync = require("./../utils/catchAsync");

// GET all users
exports.getAllUsers = catchAsync(async (req, res,next) => {
  const users = await User.find();
  //SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});
// GET a single user
exports.getSingleUser = (req, res, next) => {
  res.status(500).json({
    status: "success",
    message: "This route is not yet implemented",
  });
};

// CREATE a user
exports.createUser = (req, res, next) => {
  res.status(500).json({
    status: "success",
    message: "This route is not yet implemented",
  });
};
//UPDATE a user
exports.updateUser = (req, res, next) => {
  res.status(500).json({
    status: "success",
    message: "This route is not yet implemented",
  });
};
//DELETE a user
exports.deleteUser = (req, res, next) => {
  res.status(500).json({
    status: "success",
    message: "This route is not yet implemented",
  });
};
