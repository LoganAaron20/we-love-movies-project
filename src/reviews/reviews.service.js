const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

const destroy = (review_id) => {
  return knex("reviews").where({ review_id }).del();
};

const read = (review_id) => {
  return knex("reviews")
    .join("critics", "critics.critic_id", "reviews.critic_id")
    .select("reviews.*", "critics.*")
    .where({ "reviews.review_id": review_id })
    .first()
    .then(addCritic);
};

const update = (updatedReview) => {
  return knex("reviews as r")
    .select("r.*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview)
    .then(() => read(updatedReview.review_id));
};

module.exports = {
  delete: destroy,
  read,
  update,
};
