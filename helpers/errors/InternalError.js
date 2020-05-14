const { INTERNAL_ERROR } = require('../../constants/errors');

class InternalError extends Error {
  constructor(message) {
    super();
    this.status = 500;
    this.message = message || INTERNAL_ERROR;
  }
}

module.exports = InternalError;
