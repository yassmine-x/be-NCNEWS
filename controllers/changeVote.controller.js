const updateVotes = require("../models/changeVotes.model");

const patchVotes = (req, res, next) => {
  const patchRequest = req.body;
  const id = req.params.article_id;
  updateVotes(id)
    .then((article) => {
      patchRequest;
      if (
        typeof patchRequest.inc_votes !== "number" ||
        !patchRequest.hasOwnProperty("inc_votes")
      ) {
        return Promise.reject({ status: 400, msg: "Bad Request!" });
      }
      article.votes += patchRequest.inc_votes;

      res.send(article);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = patchVotes;
