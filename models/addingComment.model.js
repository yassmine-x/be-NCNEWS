const db = require("../db/connection");
const addComment = (id, comment, username) => {
  return db
    .query(
      "INSERT INTO comments (body, author, article_id)  VALUES ($2, $3, $1) RETURNING *",
      [id, comment, username]
    )
    .then(({ rows: [userComment] }) => {
      console.log(userComment);
      return userComment;
    });
};
module.exports = addComment;
