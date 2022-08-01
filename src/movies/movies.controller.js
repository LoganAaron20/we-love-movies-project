const moviesService = require("./movies.service")

const list = (req, res, next) => {
    moviesService
    .list()
    .then((data) => res.json({data}))
    .catch(next)
}


module.exports = {
    list,
};
