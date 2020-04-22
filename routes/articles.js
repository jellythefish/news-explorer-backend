const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { createArticleSchema, deleteArticleSchema } = require('../models/joiSchemas');

router.get('/', getArticles);
router.post('/', celebrate(createArticleSchema), createArticle);
router.delete('/:articleId', celebrate(deleteArticleSchema), deleteArticle);

module.exports = router;
