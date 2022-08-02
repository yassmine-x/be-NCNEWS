const fetchArticle = require("../models/article_id.model");
const getArticle = (req, res, next) => {
  const id = req.params.article_id;
  fetchArticle(id)
    .then(([article]) => {
      res.send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = getArticle;
