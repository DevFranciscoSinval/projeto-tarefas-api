const User = require('../models/User');

const createUser = (userData) => {
    return User.create(userData);
};

const findUserByEmail = (email) => {
    return User.findOne({ email });
};

const findUserById = (id) => {
    return User.findById(id);
};

module.exports = { createUser, findUserByEmail, findUserById}; 