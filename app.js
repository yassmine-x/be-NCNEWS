const express = require("express");
const getTopics = require("./controllers/topics.controller");
const getArticle = require("./controllers/article_id.controller");
const getUsers = require("./controllers/users.controller");
const patchVotes = require("./controllers/changeVote.controller");
const getArticles = require("./controllers/all_articles.controller");
const getComments = require("./controllers/gettingComments.controller");
const postComment = require("./controllers/addingComment.controller");

const {
  errorNotFound,
  errorBadRequest,
  customError,
  devError,
  errorCantBeNull,
} = require("./errors");
const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticle);

app.get("/api/users", getUsers);

app.patch("/api/articles/:article_id", patchVotes);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getComments);

app.get("/api/articles/:article_id/comments", postComment);

/////////////////////////////////////////////////////////////////////////

app.all("/*", errorNotFound);

app.use(errorNotFound);

app.use(errorBadRequest);

app.use(errorCantBeNull);

app.use(customError);

app.use(devError);

module.exports = app;
