const knex = require("../db/connection");

const destroy = (review_id) => {
  return knex("reviews").where({ review_id }).del();
};

const read = (review_id) => {
  return knex("reviews")
    .select("*")
    .where({ "reviews.review_id": review_id })
    .first();
};

const update = (updatedReview) => {
  return knex("reviews as r")
    .select("r.*")
    .where({ review_id : updatedReview.review_id })
    .update(updatedReview, "*")
    .then((updatedReview) => updatedReview[0]);

    //! Does not work
  // .join("critics as c", "c.critic_id", "r.critic_id")
  // .select("r.*", "c.*")

  // TODO: figure out why works in postman locally but not in test

};

module.exports = {
  delete: destroy,
  read,
  update,
};
