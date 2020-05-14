require('dotenv').config();

const { NODE_ENV, PORT_ENV, JWT_SECRET_ENV, DATABASE_URI_ENV } = process.env;
const DEV_PORT = 3000;
const DEV_DATABASE_URI = 'mongodb://localhost:27017/news-explorer';
const DEV_JWT_SECRET = 'dev-secret';
const SERVER_PORT = NODE_ENV === 'production' && PORT_ENV ? PORT_ENV : DEV_PORT;
const DATABASE_URI = NODE_ENV === 'production' && DATABASE_URI_ENV ? DATABASE_URI_ENV : DEV_DATABASE_URI;
const JWT_SECRET = NODE_ENV === 'production' && JWT_SECRET_ENV ? JWT_SECRET_ENV : DEV_JWT_SECRET;
const RATE_LIMITER = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 queries from 1 ip
};
const TOKEN_EXPIRATION = '7d';

module.exports = { SERVER_PORT, DATABASE_URI, JWT_SECRET, RATE_LIMITER, TOKEN_EXPIRATION };
