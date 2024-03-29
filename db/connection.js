const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}
// if (!process.env.PGDATABASE) {
//   throw new Error("PGDATABASE not set");
// }
// const config = {};
// if (ENV === "production") {
//   config.connectionString = process.env.DATABASE_URL;
//   config.ssl = {
//     rejectUnauthorized: false,
//   };
// }
// module.exports = new Pool(config);
const config =
  ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        max: 2,
      }
    : {};

module.exports = new Pool(config);
