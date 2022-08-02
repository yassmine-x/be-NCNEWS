const app = require("../app");
const request = require("supertest");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");

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
        expect(body.article).toEqual({
          title: "Sony Vaio; or, The Laptop",
          topic: "mitch",
          author: "icellusedkars",
          body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
          created_at: expect.any(String),
          votes: 0,
          article_id: 2,
        });
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
        body;
        expect(body.msg).toBe("Article not found");
      });
  });
});
