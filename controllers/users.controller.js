const fetchUsers = require("../models/users.model");

const getUsers = (req, res) => {
  fetchUsers().then((users) => {
    res.send(users);
  });
};

module.exports = getUsers;
