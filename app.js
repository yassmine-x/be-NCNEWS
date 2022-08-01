const express = require("express");
const { getTopics } = require("./controllers/news.controller");
const app = express();

app.get("/api/topics", getTopics);

app.use((err, req, res, next) => {
  console.log(err);
  res.sendStatus(500);
});

module.exports = app;
