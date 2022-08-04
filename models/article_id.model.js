const db = require("../db/connection");

const fetchArticle = (id) => {
  return db
    .query(
      "SELECT articles.*, COUNT(comments.article_id) ::INT AS comment_count FROM comments RIGHT JOIN articles ON articles.article_id=comments.article_id GROUP BY articles.article_id HAVING articles.article_id = $1",
      [id]
    )
    .then(({ rows: article }) => {
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }

      return article[0];
    });
};

module.exports = fetchArticle;
