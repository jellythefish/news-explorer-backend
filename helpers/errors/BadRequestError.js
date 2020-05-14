const { BAD_REQUEST } = require('../../constants/errors');

class BadRequestError extends Error {
  constructor(message) {
    super();
    this.status = 400;
    this.message = message || BAD_REQUEST;
  }
}

module.exports = BadRequestError;
