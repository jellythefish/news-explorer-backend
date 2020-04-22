const defaultErrorStatusCode = 500;

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.status || defaultErrorStatusCode;
  const message = err.message || 'Что-то пошло не так';
  if (res.headerSent) {
    return next(err);
  }
  return res.status(statusCode).send({ message });
};

module.exports = errorMiddleware;
