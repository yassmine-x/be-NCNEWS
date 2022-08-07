const JSONEndpoints = require("../endpoints.json");

const getAllAPI = (req, res) => {
  console.log(JSONEndpoints);
  res.send(JSONEndpoints);
};

module.exports = getAllAPI;
