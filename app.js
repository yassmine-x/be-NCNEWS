const express = require("express");
const getTopics = require("./controllers/topics.controller");
const getArticle = require("./controllers/article_id.controller");
const {
  errorNotFound,
  errorBadRequest,
  customError,
  devError,
} = require("./errors");
const app = express();

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle);

/////////////////////////////////////////////////////////////////////////

app.all("/*", errorNotFound);

app.use(errorBadRequest);

app.use(customError);

app.use(devError);

module.exports = app;
