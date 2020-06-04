const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { SERVER_PORT, DATABASE_URI, RATE_LIMITER, ALLOWED_ORIGINS } = require('./config');
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

// configuring CORS
app.use('*', function(req, res, next) {
  const { origin } = req.headers;
  if (ALLOWED_ORIGINS.includes(origin)) res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') res.status(204).send('OK');
  else next();
})

// adding main router
app.use(router);
app.use(errorMiddleware);
