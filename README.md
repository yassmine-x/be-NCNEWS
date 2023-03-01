# What is be-NCNEWS?

This is an api which fetches articles from a database, with various endpoints, given in the `endpoints.json` file.

This app uses NodeJS (version 18) and has an MVC architecture. The models and controllers are part of the back-end. Some of the tech used: JavaScript, Axios, Jest and Husky.

### Setting Up

Use npm install to install the required dependencies.

#### Environment Set-Up
In order to connect to the two databases successfully please add a .env.test file and a .env.development file with the contents being `PGDATABASE= <name of the test OR dev database>` in both. The database names can be found in the setup.sql file. These files will be a pathway to establishing the process.env global variable depending on the required environment.

#### Database creating and seeding

Use `npm run setup-dbs` to create the databases followed by `npm run seed` in order to populate the databases with the available data.

Use `npm test news.test` to run the test suite containing the tests associated with processing endpoint requests to the databases.

### Available endpoints

A list of available endpoints can be found in the `endpoints.json` file, or alternatively by use the endpoint `/api` within the app itself.

## Final words

This repo was designed to be used in conjunction with `fe-NCNEWS`. Feel free to also have a look at this repo (instructions and details in the README) and have yourself an enjoyable NC NEWS experience!
