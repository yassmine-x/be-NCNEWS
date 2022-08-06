const db = require("../db/connection");
const { checkIDexists } = require("../db/seeds/utils");
const removeComment = (id) => {
  return checkIDexists(id)
    .then((Array) => {
      console.log(Array);
      if (Array.length === 0) {
        return Promise.reject({ status: 404, msg: "Comment not found" });
      }
    })
    .then(() => {
      return db.query("DELETE FROM comments WHERE comment_id=$1", [id]);
    });
};
module.exports = removeComment;
