const { Joi } = require('celebrate');
const urlRegex = require('../constants/regexWeburl');
const BadRequestError = require('../helpers/errors/BadRequestError');
const { INVALID_LINK_URL, INVALID_IMAGE_URL, INVALID_EMAIL, INVALID_CREDENTIALS, 
  INVALID_PASSWORD, INVALID_NAME, INVALID_DATE, INVALID_SOURCE, INVALID_KEYWORDS,
INVALID_ARTICLE_ID, INVALID_TITLE, INVALID_TEXT } = require('../constants/errors');

const loginSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email().error(new BadRequestError(INVALID_CREDENTIALS)),
    password: Joi.string().required().min(8).max(32).error(new BadRequestError(INVALID_CREDENTIALS)),
  }),
};

const signUpSchema = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).error(new BadRequestError(INVALID_NAME)),
    email: Joi.string().required().email().error(new BadRequestError(INVALID_EMAIL)),
    password: Joi.string().required().min(8).max(32).error(new BadRequestError(INVALID_PASSWORD)),
  }),
};

const createArticleSchema = {
  body: Joi.object().keys({
    keyword: Joi.string().required().max(30).error(new BadRequestError(INVALID_KEYWORDS)),
    title: Joi.string().required().max(150).error(new BadRequestError(INVALID_TITLE)),
    text: Joi.string().required().error(new BadRequestError(INVALID_TEXT)),
    date: Joi.number().integer().min(0).required().error(new BadRequestError(INVALID_DATE)),
    source: Joi.string().required().max(30).error(new BadRequestError(INVALID_SOURCE)),
    link: Joi.string().required().regex(urlRegex).error(new BadRequestError(INVALID_LINK_URL)),
    image: Joi.string().required().regex(urlRegex).error(new BadRequestError(INVALID_IMAGE_URL)),
  }),
};

const deleteArticleSchema = {
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24).error(new BadRequestError(INVALID_ARTICLE_ID)),
  }),
};

module.exports = { loginSchema, signUpSchema, createArticleSchema, deleteArticleSchema };
