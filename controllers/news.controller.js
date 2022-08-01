const fetchTopics = require("../models/news.model");

const getTopics = (req, res) => {
  console.log("hellp!");
  fetchTopics().then((response) => {
    console.log(response, "hey!!");
    res.send(response);
  });
};

module.exports = { getTopics };
