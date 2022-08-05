const addComment = require("../models/addingComment.model");

const postComment = (req, res, next) => {
  const id = req.params.article_id;
  const bodyComment = req.body.body;
  const userComment = req.body.user;

  addComment(id, bodyComment, userComment)
    .then((newComment) => {
      res.send({ newComment: newComment });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = postComment;
