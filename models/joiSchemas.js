const { Joi } = require('celebrate');
const urlRegex = require('../constants/regexWeburl');
const BadRequestError = require('../helpers/errors/BadRequestError');
const { INVALID_LINK_URL, INVALID_IMAGE_URL, INVALID_EMAIL } = require('../constants/errors');

const loginSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(32),
  }),
};

const signUpSchema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email().error(new BadRequestError(INVALID_EMAIL)),
    password: Joi.string().required().min(8).max(32),
  }),
};

const createArticleSchema = {
  body: Joi.object().keys({
    keyword: Joi.string().required().max(30),
    title: Joi.string().required().max(150),
    text: Joi.string().required(),
    date: Joi.string().required().max(30),
    source: Joi.string().required().max(30),
    link: Joi.string().required().regex(urlRegex).error(new BadRequestError(INVALID_LINK_URL)),
    image: Joi.string().required().regex(urlRegex).error(new BadRequestError(INVALID_IMAGE_URL)),
  }),
};

const deleteArticleSchema = {
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
};

module.exports = { loginSchema, signUpSchema, createArticleSchema, deleteArticleSchema };
