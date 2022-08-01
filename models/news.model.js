const db = require("../db/connection.js");

const fetchTopics = () => {
  return db.query("SELECT * FROM topics").then(({ rows: topics }) => {
    return { topics };
  });
};

const fetchArticle = (id) => {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [id])
    .then(({ rows: article }) => {
      if (article.length === 0) {
        console.log("hello 404");
        return Promise.reject({ status: 404, msg: "Article not found" });
      }
      return article[0];
    });
};

module.exports = { fetchTopics, fetchArticle };
