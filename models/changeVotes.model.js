const db = require("../db/connection");

const updateVotes = (id, patchRequestInc) => {
  return db
    .query(
      "UPDATE articles SET votes=votes+$2 WHERE article_id=$1 RETURNING *",
      [id, patchRequestInc]
    )
    .then(({ rows: article }) => {
      if (article.length === 0) {
        return Promise.reject({ status: 404, msg: "Article not found" });
      }

      return article[0];
    });
};

module.exports = updateVotes;
