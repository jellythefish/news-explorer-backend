const { FORBIDDEN_ERROR } = require('../../constants/errors');

class ForbiddenError extends Error {
  constructor(message) {
    super();
    this.status = 403;
    this.message = message || FORBIDDEN_ERROR;
  }
}

module.exports = ForbiddenError;
