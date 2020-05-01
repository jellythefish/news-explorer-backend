const { CONFLICT_ERROR } = require('../../constants/errors');

class ConflictError extends Error {
  constructor(message) {
    super();
    this.status = 409;
    this.message = message || CONFLICT_ERROR;
  }
}

module.exports = ConflictError;
