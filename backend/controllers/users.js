const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const AuthError = require('../errors/auth-err');
const ValidationError = require('../errors/validation-err');
const ConflictingError = require('../errors/conflicting-request-err');

const JWT_KEY = 'superpupernikogdanepodbereshkey';

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  if (!email || !password) {
    return next(new ValidationError('Не заполненно поле email или пароль'));
  }

  return bcrypt.hash(password, 10, (error, hash) => {
    User.findOne({ email })
      .then((userEmail) => {
        if (userEmail) {
          throw new ConflictingError('Такой пользователь уже существует');
        }

        return User.create({
          name,
          about,
          avatar,
          email,
          password: hash,
        })
          .then((user) => {
            const newUser = user.toObject();
            delete newUser.password;
            res.status(201).send(newUser);
          });
      })
      .catch((err) => {
        if (err.name === 'ValidationError' || err.name === 'CastError') {
          return next(new ValidationError('Переданы некорректные данные при создании пользователя'));
        }
        return next(err);
      });
  });
};

const updateProfile = (req, res, next) => {
  if (!req.body.name || !req.body.about) {
    return next(new ValidationError('Не заполненно поле имя или о себе'));
  }
  return User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, about: req.body.about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new ValidationError('Переданы некорректные данные при обновлении профиля'));
      }
      return next(err);
    });
};

const updateAvatar = (req, res, next) => {
  if (!req.body.avatar) {
    return next(new ValidationError('Не заполненно поле аватар'));
  }

  return User.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные при обновлении аватара'));
      }
      if (err.name === 'CastError') {
        return next(new NotFoundError('Пользователь с указанным _id не найден'));
      }
      return next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ValidationError('Не заполненно поле email или пароль'));
  }

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw next(new AuthError('Не правильная почта или пароль'));
      }

      return bcrypt.compare(
        password,
        user.password,
        (error, isValid) => {
          if (!isValid) {
            throw next(new AuthError('Не правильная почта или пароль'));
          }

          const token = jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn: '7d' });
          return res
            .cookie('jwt', token, {
              maxAge: 3600000 * 24 * 7,
              httpOnly: true,
            })
            .end();
        },
      );
    })
    .catch(next);
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new ValidationError('Переданы некорректные данные при обновлении профиля'));
      }
      return next(err);
    });
};

module.exports = {
  getUsers,
  getUser,
  getMe,
  createUser,
  updateProfile,
  updateAvatar,
  login,
};
