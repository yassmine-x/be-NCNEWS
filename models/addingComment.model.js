const db = require("../db/connection");
const { checkUserExists } = require("../db/seeds/utils");

const addComment = (id, comment, username) => {
  if (comment === undefined || username === undefined) {
    return Promise.reject({
      status: 400,
      msg: "Please enter valid type in required fields",
    });
  }
  return checkUserExists(username)
    .then((userExistsOrNot) => {
      if (userExistsOrNot.length === 0) {
        return Promise.reject({ status: 400, msg: "User not found" });
      }
    })
    .then(() => {
      return db.query(
        "INSERT INTO comments (body, author, article_id)  VALUES ($1, $2, $3) RETURNING *",
        [comment, username, id]
      );
    })
    .then(({ rows: [userComment] }) => {
      return userComment;
    });
};

module.exports = addComment;
