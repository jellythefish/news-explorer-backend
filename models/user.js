const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const BadRequestError = require('../helpers/errors/BadRequestError');
const { INVALID_EMAIL, INVALID_CREDENTIALS, DUPLICATE_EMAIL } = require('../constants/errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (mail) => isEmail(mail),
      message: INVALID_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function checkCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(INVALID_CREDENTIALS));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(INVALID_CREDENTIALS));
          }
          return user;
        });
    });
};

userSchema.post('save', (error, doc, next) => {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new BadRequestError(DUPLICATE_EMAIL));
  } else {
    next(error);
  }
});

module.exports = mongoose.model('user', userSchema);
