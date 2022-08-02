const fetchTopics = require("../models/topics.model");

const getTopics = (req, res) => {
  fetchTopics().then((topics) => {
    if (Object.keys(topics) === 0) {
      return Promise.reject({ status: 400, msg: "Bad Request!" });
    }
    res.send(topics);
  });
};

module.exports = getTopics;
