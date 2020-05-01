const router = require('express').Router();
const { celebrate, errors } = require('celebrate');
const usersRouter = require('./users');
const articlesRouter = require('./articles');
const { auth, errorLogger } = require('../middlewares');
const { loginSchema, signUpSchema } = require('../middlewares/joiSchemas');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../helpers/errors/NotFoundError');

router.use(requestLogger);
router.use('/signin', celebrate(loginSchema), login);
router.use('/signup', celebrate(signUpSchema), createUser);
router.use('/users', auth, usersRouter);
router.use('/articles', auth, articlesRouter);
router.use(errorLogger);
router.use(errors()); // celebrate errors handler
router.use('*', (req, res, next) => next(new NotFoundError()));

module.exports = router;
