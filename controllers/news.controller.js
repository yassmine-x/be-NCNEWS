const { fetchTopics, fetchArticle } = require("../models/news.model");

const getTopics = (req, res) => {
  fetchTopics().then((topics) => {
    res.send(topics);
  });
};

const getArticle = (req, res) => {
  const id = req.params.article_id;
  fetchArticle(id).then((response) => {
    res.send({ response });
  });
};

module.exports = { getTopics, getArticle };
