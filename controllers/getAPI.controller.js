const JSONEndpoints = require("../endpoints.json");

const getAllAPI = (req, res) => {
  res.send(JSONEndpoints);
};

module.exports = getAllAPI;
