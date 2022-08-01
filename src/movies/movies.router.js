const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../error/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:movieId").all(methodNotAllowed);


module.exports = {
  router,
};
