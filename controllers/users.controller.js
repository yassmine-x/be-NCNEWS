const fetchUsers = require("../models/users.model");

const getUsers = (req, res) => {
  fetchUsers().then((Users) => {
    res.send(Users);
  });
};

module.exports = getUsers;
