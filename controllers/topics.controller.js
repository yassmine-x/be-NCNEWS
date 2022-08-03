const fetchTopics = require("../models/topics.model");

const getTopics = (req, res) => {
  fetchTopics().then((topics) => {
    res.send(topics);
  });
};

module.exports = getTopics;
