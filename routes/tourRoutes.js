const express = require("express");
const router = express.Router();
const tourController = require("./../controllers/tourController");
const { checkBody } = require("./../middlewares/tourMiddleWares");

//router.param("id", tourController.checkID);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(checkBody, tourController.createTour);
router
  .route("/:id")
  .get(tourController.getSingelTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
module.exports = router;
