const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../error/methodNotAllowed");

router
  .route("/:movieId/theaters")
  .get(controller.readMovieTheaters)
  .all(methodNotAllowed);

router
  .route("/:movieId/reviews")
  .get(controller.readMovieReviews)
  .all(methodNotAllowed);

router.route("/:movieId").get(controller.read).all(methodNotAllowed);

router
  .route("/")
  .get(controller.listIsShowing)
  .get(controller.list)
  .all(methodNotAllowed);



module.exports = {
  router,
};
