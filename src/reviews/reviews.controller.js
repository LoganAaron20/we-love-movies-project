const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../error/asyncErrorBoundary");

const reviewExists = (req, res, next) => {
  const reviewId = req.params.reviewId;
  reviewsService
    .read(reviewId)
    .then((review) => {
      if (review) {
        res.locals.review = review;
        return next();
      }
      next({
        status: 404,
        message: `cannot be found`,
      });
    })
    .catch(next);
};

// const movieExists = (req, res, next) => {
//   const movieId = req.params.movieId;
//   moviesService
//     .read(movieId)
//     .then((movie) => {
//       if (movie) {
//         res.locals.movie = movie;
//         return next();
//       }
//       next({
//         status: 404,
//         message: `Movie cannot be found.`,
//       });
//     })
//     .catch(next);
// };

function destroy(req, res, next) {
  const { reviewId } = req.params;
  reviewsService.delete(reviewId).then(() => res.sendStatus(204));
}

// function update(req, res, next) {
//   const { reviewId } = req.params;
//   reviewsService.update();
// }

const VALID_PROPERTIES = [
  "review_id",
  "content",
  "score",
  "created_at",
  "updated_at",
  "critic_id",
  "movie_id",
  "critic",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 404,
      message: `review not found: ${invalidFields.join(", ")}`,
    });
  } else {
    return next();
  }
}

async function update(req, res, next) {
  const { reviewId } = req.params;
  const reviewData = req.body.data;

  //   console.log(reviewData);

  const updatedReview = {
    ...reviewData,
    review_id: reviewId,
  };
  console.log(updatedReview);
  res.json({ data: await reviewsService.update(updatedReview) });
}

module.exports = {
  delete: [asyncErrorBoundary(reviewExists), destroy],
  update: [asyncErrorBoundary(reviewExists), hasOnlyValidProperties, update],
};
