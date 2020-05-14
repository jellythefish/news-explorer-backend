const { RESOURCE_NOT_FOUND } = require('../../constants/errors');

class NotFoundError extends Error {
  constructor(message) {
    super();
    this.status = 404;
    this.message = message || RESOURCE_NOT_FOUND;
  }
}

module.exports = NotFoundError;
