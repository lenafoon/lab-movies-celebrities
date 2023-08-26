const router = require("express").Router();

const celebritiesRoutes = require("./celebrities.routes")

const moviesRoutes = require("./movies.routes")

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
