const defaultErrorStatusCode = 500;
const { DEFAULT_ERROR_MESSAGE } = require('../constants/errors');

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.status || defaultErrorStatusCode;
  const message = err.message || DEFAULT_ERROR_MESSAGE;
  if (res.headerSent) {
    return next(err);
  }
  return res.status(statusCode).send({ message });
};

module.exports = errorMiddleware;
