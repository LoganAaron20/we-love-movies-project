const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties");

const addMovie = mapProperties({
  rating: "movie.rating",
  runtime_in_minutes: "movie.runtime_in_minutes",
  title: "movie.title"
});

const list = () => {
    return knex("theaters").select("*")
}

module.exports = {
    list,
}