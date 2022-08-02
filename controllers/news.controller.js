const { fetchTopics, fetchArticle } = require("../models/news.model");
const checkIDexists = require("../models/checkIDexists");

const getTopics = (req, res) => {
  fetchTopics().then((topics) => {
    res.send(topics);
  });
};

const getArticle = (req, res, next) => {
  const id = req.params.article_id;
  Promise.all([fetchArticle(id), checkIDexists(id)])
    .then(([article]) => {
      res.send({ article });
    })
    .catch(next);
};

module.exports = { getTopics, getArticle };
