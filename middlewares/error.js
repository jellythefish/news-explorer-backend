const defaultErrorStatusCode = 500;
const { DEFAULT_ERROR } = require('../constants/errors');

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.status || defaultErrorStatusCode;
  const message = err.message || DEFAULT_ERROR;
  if (res.headerSent) {
    return next(err);
  }
  return res.status(statusCode).send({ statusCode, message });
};

module.exports = errorMiddleware;
