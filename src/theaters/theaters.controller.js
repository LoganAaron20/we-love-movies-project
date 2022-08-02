const theatersService = require("./theaters.service");

const list = (req, res, next) => {
  theatersService.list().then((data) => res.json({ data }));
};

module.exports = {
  list,
};
