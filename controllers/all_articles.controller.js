const fetchArticles = require("../models/all_articles.model");
const getArticles = (req, res) => {
  fetchArticles().then((articles) => {
    res.send({ articles });
  });
};
module.exports = getArticles;
