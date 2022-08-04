if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");
const cors = require("cors");
const router = require("express").Router();

app.use(cors());
app.use(express.json());

router.get("/", cors(), (req, res) => {
  res.json({
    message:
      "Welcome! You can access data via the following routes: /movies, /reviews, /theaters, /reviews/:reviewId, /movies/:movieId, /movies/:movieId/theaters, /movies/:movieId/reviews.",
  });
});

app.use("/movies", moviesRouter.router);

app.use("/reviews", reviewsRouter);

app.use("/theaters", theatersRouter);

app.use((req, res, next) => {
  next({
    status: 404,
    message: `Not found: ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  // console.log(error);
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).json({ error: message });
});

module.exports = app;
