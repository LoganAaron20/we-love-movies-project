const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../error/asyncErrorBoundary");

// async function movieExists(req, res, next) {
//   const movieId = req.params.movieId;
//   const movie = await moviesService.read(movieId);
//   if (movie) {
//     res.locals.movie = movie;
//     return next();
//   } else {
//     return next({
//       status: 404,
//       message: `Movie cannot be found.`,
//     });
//   }
// }

const movieExists = (req, res, next) => {
  const movieId = req.params.movieId;
  moviesService
    .read(movieId)
    .then((movie) => {
      if (movie) {
        res.locals.movie = movie;
        return next();
      }
      next({
        status: 404,
        message: `Movie cannot be found.`,
      });
    })
    .catch(next);
};

const list = (req, res, next) => {
  moviesService
    .list()
    .then((data) => res.json({ data }))
    .catch(next);
};

const listIsShowing = (req, res, next) => {
  if (req.query.is_showing) {
    moviesService
      .listIsShowing()
      .then((data) => res.json({ data }))
      .catch(next);
  }
  next();
};

const read = (req, res, next) => {
  const { movie } = res.locals;

  res.json({ data: movie });
};

const readMovieTheaters = (req, res, next) => {
  const { movieId } = req.params;
  moviesService
    .readMovieTheaters(movieId)
    .then((data) => res.json({ data: data }));
};

// async function readMovieTheaters(req, res, next) {
//   const movieId = req.params.movieId;
//   res.json({ data: await moviesService.readMovieTheaters(movieId) });
// };

async function readMovieReviews(req, res, next) {
  const movieId = req.params.movieId;
  res.json({ data: await moviesService.readMovieReviews(movieId) });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(movieExists), read],
  listIsShowing: [asyncErrorBoundary(listIsShowing)],
  readMovieTheaters: [asyncErrorBoundary(movieExists), readMovieTheaters],
  readMovieReviews: [asyncErrorBoundary(movieExists), readMovieReviews],
};
