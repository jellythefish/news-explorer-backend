const mongoose = require('mongoose');
const urlRegex = require('../constants/regexWeburl');
const { INVALID_LINK_URL, INVALID_IMAGE_URL } = require('../constants/errors');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    maxlength: 30,
  },
  title: {
    type: String,
    required: true,
    maxlength: 150,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    maxlength: 30,
  },
  source: {
    type: String,
    required: true,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => urlRegex.test(url),
      message: INVALID_LINK_URL,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (url) => urlRegex.test(url),
      message: INVALID_IMAGE_URL,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
