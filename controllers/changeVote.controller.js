const updateVotes = require("../models/changeVotes.model");

const patchVotes = (req, res, next) => {
  const patchRequest = req.body.inc_votes;
  const id = req.params.article_id;

  updateVotes(id, patchRequest)
    .then((article) => {
      if (
        typeof patchRequest !== "number" ||
        !req.body.hasOwnProperty("inc_votes")
      ) {
        return Promise.reject({ status: 400, msg: "Bad Request!" });
      }

      res.send(article);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

module.exports = patchVotes;
