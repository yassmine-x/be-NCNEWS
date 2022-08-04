const db = require("../db/connection");
const fetchComments = (article_id) => {
  return db
    .query(
      "SELECT * FROM comments LEFT JOIN users ON users.username=comments.author WHERE article_id=$1",
      [article_id]
    )
    .then(({ rows: comments }) => {
      return comments;
    });
};
module.exports = fetchComments;
