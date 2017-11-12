const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const dbConfig = require('../../db-config');

module.exports = new PassportLocalStrategy({
  usernameField: 'usernameOrEmail',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, usernameOrEmail, password, done) => {
  const user = {
    usernameOrEmail: usernameOrEmail.trim(),
    password: password.trim(),
  };

  // Here we allow both email and username sign in
  let query = {};
  if (user.usernameOrEmail.indexOf('@') > -1)
    query = {
      email: user.usernameOrEmail,
    };
  else
    query = {
      username: user.usernameOrEmail,
    };

  return User.findOne(query, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      const error = new Error('This user does not exist.');
      error.name = 'LoginCredentialsError';
      return done(error);
    }

    return user.validatePassword(password.trim(),
        (passwordError, validationResult) => {
          if (passwordError) {
            return done(passwordError);
          }

          if (!validationResult) {
            const error = new Error('Incorrect login credentials.');
            error.name = 'LoginCredentialsError';
            return done(error);
          }

          const payload = {
            username: user.username,
          };

          const token = jwt.sign(payload, dbConfig.jwtSecret,
              { expiresIn: 7200 });

          return done(null, token);
        });
  });
});
