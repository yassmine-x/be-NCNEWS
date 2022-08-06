const { checkIDexists } = require("../db/seeds/utils");
const removeComment = require("../models/deletingAComment.model");

const deleteComment = (req, res, next) => {
  const id = req.params.comment_id;
  removeComment(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
module.exports = deleteComment;
