const express = require("express");
const { getTopics, getArticle } = require("./controllers/news.controller");
const {
  errorNotFound,
  errorBadRequest,
  customError,
  devError,
} = require("./errors");
const checkIDexists = require("./models/checkIDexists");
const app = express();

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle, checkIDexists);

/////////////////////////////////////////////////////////////////////////

app.all("/*", errorNotFound);

app.use(errorBadRequest);

app.use(customError);

app.use(devError);

module.exports = app;
