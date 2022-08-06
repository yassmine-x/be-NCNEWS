const db = require("../db/connection");
const fetchArticles = (
  sortby = "created_at",
  ascOrDesc = "DESC",
  whatTopic
) => {
  const allowedColumns = [
    "title",
    "topic",
    "author",
    "body",
    "created_at",
    "votes",
  ];

  const allowedTopics = ["mitch", "cats"];
  if (!allowedColumns.includes(sortby)) {
    return Promise.reject({ status: 400, msg: "Please enter a valid column" });
  }

  if (!allowedTopics.includes(whatTopic) && whatTopic !== undefined) {
    return Promise.reject({ status: 400, msg: "Topic doesn't exist" });
  }

  if (ascOrDesc !== "ASC" && ascOrDesc !== "DESC") {
    return Promise.reject({ status: 400, msg: "Please order by ASC or DESC" });
  }

  let whereClause = "";
  if (whatTopic !== undefined && allowedTopics.includes(whatTopic)) {
    whereClause = `WHERE articles.topic LIKE $1 `;
  }
  let queryStr =
    `SELECT articles.*, COUNT(comments.article_id) ::INT AS comment_count FROM articles LEFT JOIN comments ON comments.article_id=articles.article_id  LEFT JOIN users ON articles.author=users.username ` +
    whereClause +
    `GROUP BY articles.article_id ORDER BY articles.${sortby} ${ascOrDesc} ;`;

  if (whatTopic === undefined) {
    return db.query(queryStr).then(({ rows }) => {
      return rows;
    });
  }
  return db.query(queryStr, [whatTopic]).then(({ rows }) => {
    return rows;
  });
};

module.exports = fetchArticles;
