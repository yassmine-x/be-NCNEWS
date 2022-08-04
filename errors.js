exports.errorNotFound = (req, res) => {
  res.status(404).send({ msg: "Article not found" });
};

exports.errorBadRequest = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request!" });
  } else {
    next(err);
  }
};

exports.errorCantBeNull = (err, req, res, next) => {
  if (err.code === "23502") {
    res.status(407).send({ msg: "Please enter a vote" });
  } else {
    next(err);
  }
};
exports.customError = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.devError = (err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
};