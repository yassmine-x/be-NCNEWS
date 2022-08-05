const db = require("../connection");
exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createRef = (arr, key, value) => {
  return arr.reduce((ref, element) => {
    ref[element[key]] = element[value];
    return ref;
  }, {});
};

exports.formatComments = (comments, idLookup) => {
  return comments.map(({ created_by, belongs_to, ...restOfComment }) => {
    const article_id = idLookup[belongs_to];
    return {
      article_id,
      author: created_by,
      ...this.convertTimestampToDate(restOfComment),
    };
  });
};

exports.checkUserExists = (id) => {
  return db
    .query("SELECT username FROM users WHERE username=$1", [id])
    .then(({ rows: username }) => {
      return username;
    });
};

exports.checkIDExists = (id) => {
  return db
    .query("SELECT article_id FROM articles WHERE article_id=$1", [id])
    .then(({ rows: iD }) => {
      return iD;
    });
};
