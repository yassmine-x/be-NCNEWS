const db = require("../db/connection.js");

const fetchTopics = () => {
  return db.query("SELECT * FROM topics").then(({ rows: topics }) => {
    return { topics };
  });
};

module.exports = fetchTopics;
