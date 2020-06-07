const mongoose = require('mongoose');
const BadRequestError = require('../helpers/errors/BadRequestError');
const Article = require('../models/article');
const NotFoundError = require('../helpers/errors/NotFoundError');
const ForbiddenError = require('../helpers/errors/ForbiddenError');
const { OBJECT_NOT_FOUND, INVALID_ARTICLE_ID } = require('../constants/errors');
const { SUCCESSFULLY_DELETED } = require('../constants/messages');

const getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => {
      const userArticles = articles.filter((article) => article.owner.toString() === req.user._id);
      res.send({ data: userArticles });
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image, owner = req.user._id } = req.body;
  Article.create({ keyword, title, text, date, source, link, image, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    throw new BadRequestError(INVALID_ARTICLE_ID);
  }
  Article.findById(articleId)
    .orFail(() => new NotFoundError(OBJECT_NOT_FOUND))
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        return Promise.reject(new ForbiddenError());
      }
      return Article.deleteOne(article);
    })
    .then(() => res.send({ message: SUCCESSFULLY_DELETED }))
    .catch(next);
};

module.exports = { getArticles, createArticle, deleteArticle };
