const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const UnauthorizedError = require('../helpers/errors/UnauthorizedError');
const TOKEN_EXPIRATION = require('../config');
const { INVALID_CREDENTIALS } = require('../constants/errors');
const { JWT_SECRET } = require('../config');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
      res.cookie('jwt', token, {
        maxAge: 1000 * 3600 * 24 * 7, // 7 days
        httpOnly: true,
        sameSite: true,
      }).end();
    })
    .catch(() => next(new UnauthorizedError(INVALID_CREDENTIALS)));
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) => res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    }))
    .catch(next);
};

module.exports = { getUser, login, createUser };
