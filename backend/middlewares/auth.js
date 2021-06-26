const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const cookie = req.cookies.jwt;

  if (!cookie) {
    return res.status(401).send({ message: 'Необходима авторизация1' });
  }

  let payload;

  try {
    payload = jwt.verify(cookie, NODE_ENV === 'production' ? JWT_SECRET : 'superpupernikogdanepodbereshkey');
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация2' });
  }

  req.user = payload;

  return next();
};
