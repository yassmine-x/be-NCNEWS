const db = require("../db/connection");
const fetchArticles = () => {
  return db
    .query(
      "SELECT articles.*, COUNT(comments.article_id) ::INT AS comment_count FROM articles LEFT JOIN comments ON comments.article_id=articles.article_id  LEFT JOIN users ON articles.author=users.username GROUP BY articles.article_id ORDER BY articles.created_at DESC;"
    )
    .then(({ rows }) => {
      return rows;
    });
};

module.exports = fetchArticles;

