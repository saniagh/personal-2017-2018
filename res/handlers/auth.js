const User = require('mongoose').model('User');
const express = require('express');
const passport = require('passport');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const dbConfig = require('../../db-config');

const router = new express.Router();

const loginFormValidationMiddleware = require(
    '../middleware/login-form-validation.js');
const signupFormValidationMiddleware = require(
    '../middleware/signup-form-validation.js');

router.post('/login', loginFormValidationMiddleware, (req, res, next) => {
  if (!req.body.success)
    return res.status(400).json({
      errors: req.body.errors,
      message: req.body.message,
      success: req.body.success,
    });

  return passport.authenticate('login', (err, token) => {
    if (err) {
      if (err.name === 'LoginCredentialsError') {
        return res.status(400).json({
          message: err.message,
          success: false,
        });
      }

      return res.status(400).json({
        message: 'Could not process form.',
        success: false,
      });
    }

    return res.json({
      success: true,
      token,
    });

  })(req, res, next);
});

router.post('/signup', signupFormValidationMiddleware, (req, res, next) => {
  if (!req.body.success)
    return res.status(400).json({
      errors: req.body.errors,
      message: req.body.message,
      success: req.body.success,
    });

  return passport.authenticate('signup', (err, token) => {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000 &&
          err.message.indexOf('@') > -1) {
        return res.status(409).json({
          message: 'E-mail is already taken.',
          success: false,
        });
      } else if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(409).json({
          message: 'Username is already taken.',
          success: false,
        });
      }

      return res.status(400).json({
        message: 'Could not process form.',
        success: false,
      });
    }

    return res.json({
      message: 'You have successfully signed up.',
      token,
      success: true,
    });
  })(req, res, next);
});

module.exports = router;
