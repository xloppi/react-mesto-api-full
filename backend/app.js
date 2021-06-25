const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { errors, celebrate, Joi } = require('celebrate');
const { isURL, isEmail } = require('validator');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const {
  createUser,
  login,
} = require('./controllers/users');

const CORS_WHITELIST = [
  'http://localhost:8080',
  'https://hlopkov.students.nomoredomains.club',
  'http://hlopkov.students.nomoredomains.club',
];
const corsOption = {
  credentials: true,
  origin: function checkCorsList(origin, callback) {
    if (CORS_WHITELIST.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
const auth = require('./middlewares/auth');

const { PORT = 3000, MONGO_URL, NODE_ENV } = process.env;

const app = express();

app.use(helmet());

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(cors(corsOption));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .min(2)
      .max(30)
      .required()
      .custom((value, helpers) => {
        if (isEmail(value)) {
          return value;
        }
        return helpers.error('any.invalid');
      }),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    // я добавил pattern(/https?/) потому что иначе isURL пропускает без 'https' или 'http'
    avatar: Joi.string().required().pattern(/https?/).custom((value, helpers) => {
      if (isURL(value)) {
        return value;
      }
      return helpers.error('any.invalid');
    }),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT);
