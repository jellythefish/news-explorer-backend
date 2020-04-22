const jwt = require('jsonwebtoken');
const UnathorizedError = require('../helpers/errors/UnauthorizedError');

const { JWT_SECRET } = require('../config');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnathorizedError());
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return next(new UnathorizedError());
  }
  req.user = payload;
  return next();
};

module.exports = auth;
