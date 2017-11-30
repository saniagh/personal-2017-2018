const User = require('mongoose').model('User');
const jwt = require('jsonwebtoken');
const dbConfig = require('../../db-config');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (token !== null) {
    return jwt.verify(token, dbConfig.jwtSecret, (err, decode) => {
      if (err || !decode) {
        return res.status(401).end();
      }

      const query = {
        _id: decode.sub,
      };

      return User.findOne(query, (err, user) => {
        if (err || !user) {
          return res.status(401).end();
        } else return next();
      });
    });
  } else return next();
};
