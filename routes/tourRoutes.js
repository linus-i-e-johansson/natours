const express = require("express");
const router = express.Router();
const tourController = require("./../controllers/tourController");
//const { checkBody } = require("./../middlewares/tourMiddleWares");

//router.param("id", tourController.checkID);

//alias route
router.route("/top-5-cheap").get(tourController.aliasTopTours, tourController.getAllTours);
router.route("/tour-stats").get(tourController.getTourStats);
router.route("/monthly-plan/:year").get(tourController.getMonthlyPlan);

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getSingleTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
module.exports = router;
