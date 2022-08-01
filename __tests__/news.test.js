const app = require("../app");
const request = require("supertest");
const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");

beforeEach(() => {
  return seed(data);
});
describe("GET/api/topics", () => {
  test("status:200 responds with all the topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body; // deconstructing key of topics from body
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
