const express = require("express");
const router = express.Router();

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

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getSingleUser).patch(updateUser).delete(deleteUser);

module.exports = router;
