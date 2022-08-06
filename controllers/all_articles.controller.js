const fetchArticles = require("../models/all_articles.model");
const getArticles = (req, res, next) => {
  const sortby = req.query.sort_by;
  const ascOrDesc = req.query.order;
  const whatTopic = req.query.topic;

  fetchArticles(sortby, ascOrDesc, whatTopic)
    .then((articles) => {
      res.send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = getArticles;
