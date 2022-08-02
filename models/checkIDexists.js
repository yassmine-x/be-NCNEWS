const db = require("../db/connection");
const checkIDexists = (id) => {
  return db.query("SELECT article_id FROM articles WHERE article_id=$1", [id]);
};

module.exports = checkIDexists;
