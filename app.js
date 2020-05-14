const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { SERVER_PORT, DATABASE_URI, RATE_LIMITER } = require('./config');
const { errorMiddleware } = require('./middlewares');
const router = require('./routes');

// launching web-server
const app = express();
app.listen(SERVER_PORT, () => {
  console.log(`App listening on port ${SERVER_PORT}`);
});

// connecting to database
mongoose.connect(DATABASE_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// adding middlewares
app.use(helmet());
app.use(rateLimit(RATE_LIMITER));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// adding main router
app.use(router);
app.use(errorMiddleware);
