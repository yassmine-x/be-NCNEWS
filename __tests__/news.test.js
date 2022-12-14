const app = require("../app");
const request = require("supertest");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const object = require("../endpoints.json");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});
describe("GET/api/topics", () => {
  test("status:200 responds with all the topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(Array.isArray(topics)).toBe(true);
        expect(topics).toHaveLength(3);
        expect(
          topics.every((topic) => {
            topic.hasOwnProperty("slug") && topic.hasOwnProperty("description");
          })
        );
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("status:200, responds with a single matching article", () => {
    const ARTICLE_ID = 2;
    return request(app)
      .get(`/api/articles/${ARTICLE_ID}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual(
          expect.objectContaining({
            title: "Sony Vaio; or, The Laptop",
            topic: "mitch",
            author: "icellusedkars",
            body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
            created_at: expect.any(String),
            votes: 0,
            article_id: 2,
            comment_count: 0,
          })
        );
      });
  });
});

describe("ERRORS FOR /api/articles/:article_id", () => {
  test("responds with 400 if invalid id type is passed", () => {
    return request(app)
      .get("/api/articles/blorp")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request!");
      });
  });
  test("responds with 404 if valid type passed but not present in database", () => {
    return request(app)
      .get("/api/articles/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("status:200, responds with the article", () => {
    const votesChange = { inc_votes: 100 };
    return request(app)
      .patch("/api/articles/1")
      .send(votesChange)
      .expect(200)
      .then(({ body: singleArticle }) => {
        expect(singleArticle).toEqual(
          expect.objectContaining({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: expect.any(String),
            votes: 200,
          })
        );
      });
  });
});

describe("ERRORS FOR PATCH/api/articles/:article_id", () => {
  test("responds with 400 if invalid id type is passed", () => {
    const votesChange = { inc_votes: 100 };
    return request(app)
      .patch("/api/articles/blorp")
      .send(votesChange)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request!");
      });
  });
  test("responds with 404 if passed with valid iD but not present in database", () => {
    const votesChange = { inc_votes: 100 };
    return request(app)
      .patch("/api/articles/10000")
      .send(votesChange)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });
  test("responds with 400 if invalid patch type is passed with incorrect type", () => {
    const votesChange = { inc_votes: "hello" };
    return request(app)
      .patch("/api/articles/1")
      .send(votesChange)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request!");
      });
  });
  test("responds with 407 if invalid patch type is passed, missing required fields", () => {
    const votesChange = {};
    return request(app)
      .patch("/api/articles/1")
      .send(votesChange)
      .expect(407)
      .then(({ body }) => {
        expect(body.msg).toBe("Please enter valid type in required fields");
      });
  });
});

describe("GET/api/users", () => {
  test("status:200 responds with all the users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(Array.isArray(users)).toBe(true);
        expect(users).toHaveLength(4);
        expect(
          users.every((user) => {
            user.hasOwnProperty("username") &&
              user.hasOwnProperty("name") &&
              user.hasOwnProperty("avatar_url");
          })
        );
      });
  });
});

describe("GET /api/articles/:article_id with Comment Count", () => {
  test("status:200, responds with a single matching article, with a commentCount key", () => {
    const ARTICLE_ID = 1;
    return request(app)
      .get(`/api/articles/${ARTICLE_ID}`)
      .expect(200)
      .then(({ body }) => {
        expect(body.article).toEqual({
          article_id: 1,
          title: "Living in the shadow of a great man",
          topic: "mitch",
          author: "butter_bridge",
          body: "I find this existence challenging",
          created_at: expect.any(String),
          votes: 100,
          comment_count: 11,
        });
      });
  });
});

describe("GET/api/articles", () => {
  test("status:200 responds with all the articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(Array.isArray(articles)).toBe(true);
        expect(articles).toHaveLength(12);
        expect(
          articles.every((article) => {
            article.hasOwnProperty("author") &&
              article.hasOwnProperty("title") &&
              article.hasOwnProperty("article_id") &&
              article.hasOwnProperty("created_at") &&
              article.hasOwnProperty("votes") &&
              article.hasOwnProperty("comment_count");
          })
        );
        expect(data.articleData).toBeSorted("created_at", {
          descending: true,
        });
      });
  });
});

describe("GET/api/articles/:article_id/comments", () => {
  test("status:200 responds with all the comments", () => {
    return request(app)
      .get("/api/articles/9/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(Array.isArray(comments)).toBe(true);
        expect(comments).toHaveLength(2);
        expect(
          comments.every((comment) => {
            comment.hasOwnProperty("comment_id") &&
              comment.hasOwnProperty("votes") &&
              comment.hasOwnProperty("created_at") &&
              comment.hasOwnProperty("author") &&
              comment.hasOwnProperty("body");
          })
        );
      });
  });
  test("status:200 responds with all the comments when no comments exist for that article", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(Array.isArray(comments)).toBe(true);
        expect(comments).toHaveLength(0);
      });
  });
});

describe("ERRORS FOR GET/api/articles/:article_id/comments", () => {
  test("responds with 400 if invalid id type is passed", () => {
    return request(app)
      .get("/api/articles/blorp")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request!");
      });
  });
  test("responds with 404 if passed with valid iD but not present in database", () => {
    return request(app)
      .get("/api/articles/10000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("status:200, responds with the comment", () => {
    const postComment = {
      user: "butter_bridge",
      body: "What a fantastic Article <3",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(postComment)
      .expect(200)
      .then(({ body }) => {
        expect(body.newComment).toEqual(
          expect.objectContaining({
            body: "What a fantastic Article <3",
            article_id: 1,
            author: "butter_bridge",
            votes: 0,
            created_at: expect.any(String),
          })
        );
      });
  });
});

describe("ERRORS FOR POST/api/articles/comments", () => {
  test("responds with 400 if invalid id type is passed", () => {
    const postComment = { user: "butter_bridge", body: "fantastic!" };
    return request(app)
      .post("/api/articles/blorp/comments")
      .send(postComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request!");
      });
  });
  test("responds with 404 if passed with valid iD but not present in database", () => {
    const postComment = { user: "icellusedkars", body: "fantastic!" };
    return request(app)
      .post("/api/articles/10000/comments")
      .send(postComment)
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });
  test("responds with 400 if invalid post type is passed, with incorrect username", () => {
    const postComment = { user: "butter_bridgeS", body: "fantastic!" };
    return request(app)
      .post("/api/articles/1/comments")
      .send(postComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("User not found");
      });
  });
  test("responds with 400 if invalid post type is passed, missing required fields", () => {
    const postComment = {};
    return request(app)
      .post("/api/articles/1/comments")
      .send(postComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Please enter valid type in required fields");
      });
  });
});

describe("GET /api/articles (queries)", () => {
  test("handles sort by query,  which sorts the articles by any valid column (defaults to date)", () => {
    return request(app)
      .get("/api/articles?sort_by=title")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(Array.isArray(articles)).toBe(true);
        expect(articles).toHaveLength(12);

        expect(
          articles.every((article) => {
            article.hasOwnProperty("author") &&
              article.hasOwnProperty("title") &&
              article.hasOwnProperty("article_id") &&
              article.hasOwnProperty("created_at") &&
              article.hasOwnProperty("votes") &&
              article.hasOwnProperty("comment_count");
          })
        );
        expect(articles).toBeSortedBy("title", {
          descending: true,
        });
      });
  });
  test("handles order query, which can be set to asc or desc for ascending or descending (defaults to descending)", () => {
    return request(app)
      .get("/api/articles?order=ASC")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(Array.isArray(articles)).toBe(true);
        expect(articles).toHaveLength(12);

        expect(
          articles.every((article) => {
            article.hasOwnProperty("author") &&
              article.hasOwnProperty("title") &&
              article.hasOwnProperty("article_id") &&
              article.hasOwnProperty("created_at") &&
              article.hasOwnProperty("votes") &&
              article.hasOwnProperty("comment_count");
          })
        );
        expect(articles).toBeSortedBy("created_at", {
          descending: false,
        });
      });
  });
  test("handles topic query, which filters the articles by the topic value specified in the query", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body }) => {
        const { articles } = body;
        expect(Array.isArray(articles)).toBe(true);
        expect(articles).toHaveLength(11);

        expect(
          articles.every((article) => {
            article.hasOwnProperty("author") &&
              article.hasOwnProperty("title") &&
              article.hasOwnProperty("article_id") &&
              article.hasOwnProperty("created_at") &&
              article.hasOwnProperty("votes") &&
              article.hasOwnProperty("comment_count") &&
              article.hasOwnProperty("topic") &&
              article.topic === "mitch";
          })
        );
      });
  });
});

describe("ERRORS FOR GET/api/articles (queries)", () => {
  test("responds with 400 if passed with invalid sort by request or a column that doesnt exist", () => {
    return request(app)
      .get("/api/articles?sort_by=age")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Please enter a valid column");
      });
  });
  test("responds with 400 if passed with invalid ORDER BY", () => {
    return request(app)
      .get("/api/articles?order=ascending")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Please order by ASC or DESC");
      });
  });
  // test("responds with 404 if topic doesn't exist", () => {
  //   return request(app)
  //     .get("/api/articles?topic=dogs")
  //     .expect(400)
  //     .then(({ body }) => {
  //       expect(body.msg).toBe("Topic doesn't exist");
  //     });
  // });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("Deletes the comment when end point is a valid ID number", () => {
    return request(app).delete("/api/comments/2").expect(204);
  });
});

describe("ERRORS for DELETE /api/comments/:comment_id", () => {
  test("responds with 400 if invalid id type is passed", () => {
    return request(app)
      .delete("/api/comments/blorp")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request!");
      });
  });
  test("responds with 404 if valid type passed but not present in database", () => {
    return request(app)
      .delete("/api/comments/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Comment not found");
      });
  });
});
describe("GET /api", () => {
  test("Responds with endpoints.json object", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((object) => {
        expect(object).toEqual(object);
      });
  });
});
