const addComment = require("../models/addingComment.model");

const postComment = (req, res, next) => {
  const id = req.params.article_id;
  const bodyComment = req.body.body;
  const userComment = req.body.username;

  addComment(id, bodyComment, userComment)
    .then((userComment) => {
      res.send({ userComment: userComment });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = postComment;
