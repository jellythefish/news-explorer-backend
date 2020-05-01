const Article = require('../models/article');
const NotFoundError = require('../helpers/errors/NotFoundError');
const ForbiddenError = require('../helpers/errors/ForbiddenError');
const { OBJECT_NOT_FOUND } = require('../constants/errors');

const getArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send({ data: articles }))
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
  Article.findById(articleId).select('+owner')
    .orFail(() => new NotFoundError(OBJECT_NOT_FOUND))
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        return Promise.reject(new ForbiddenError());
      }
      return Article.remove(article);
    })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

module.exports = { getArticles, createArticle, deleteArticle };
