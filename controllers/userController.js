const User = require("../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

/* Helper function
 * Loops through all the fields in obj,
 * each field is checked if it is
 * one of the allowed fields, if true a new field is created
 * inside the new object (newObj) with the same field name */
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};
// update the currently authenticated user.
exports.updateMe = catchAsync(async (req, res, next) => {
  //1. create an error if user POSTS password data.
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }
  //2. filtered out unwanted field names that are not allowed to be updated.
  const filterdBody = filterObj(req.body, "name", "email");

  //3. Update user document.
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filterdBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

// GET all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
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
