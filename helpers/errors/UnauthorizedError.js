const { UNAUTHORIZED_ERROR } = require('../../constants/errors');

class UnauthorizedError extends Error {
  constructor(message) {
    super();
    this.status = 401;
    this.message = message || UNAUTHORIZED_ERROR;
  }
}

module.exports = UnauthorizedError;
