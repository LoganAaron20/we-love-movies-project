const router = require("express").Router();
const controller = require("./theaters.controller");
const methodNotAllowed = require("../error/methodNotAllowed");

router.route("/").all(methodNotAllowed);

module.exports = router;
