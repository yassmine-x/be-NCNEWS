const fetchComments = require("../models/gettingComments.model");
const getComments = (req, res) => {
  const article_id = req.params.article_id;
  fetchComments(article_id).then((comments) => {
    res.send({ comments });
  });
};
module.exports = getComments;
