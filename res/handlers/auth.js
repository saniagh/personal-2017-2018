const User = require('mongoose').model('User');
const express = require('express');
const passport = require('passport');
const validator = require('validator');
const nodemailer = require('nodemailer');
const router = new express.Router();
const jwt = require('jsonwebtoken');
const dbConfig = require('../../db-config');

const loginFormValidationMiddleware = require(
    '../middleware/login-form-validation.js');
const signupFormValidationMiddleware = require(
    '../middleware/signup-form-validation.js');
const authValidationMiddleware = require('../middleware/auth-validation.js');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'valentinfiicode2018@gmail.com',
    pass: 'Fiicode@2018PleaseDoNotAbuse',
  },
});

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
      } else return res.status(400).json({
        message: 'Could not process form.',
        success: false,
      });
    } else return res.json({
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
      } else return res.status(400).json({
        message: 'Could not process form.',
        success: false,
      });
    } else {

      jwt.verify(token, dbConfig.jwtSecret, (err, decoded) => {
        if (err || !decoded) {
          return res.status(401).json({
            tokenExpired: true,
          });
        }

        const mailOptions = {
          from: 'Bloo\'s Shop',
          to: decoded.email,
          subject: 'Bloo\'s Shop - Confirmed Registration',
          html: `<div style="font-family: Roboto;"><h1>Hello ${decoded.username},</h1><p>You have successfully registered on <a href="http://ec2-52-29-50-230.eu-central-1.compute.amazonaws.com:3000/">Bloo's Shop</a></p><p>Go right now to <a href="http://ec2-52-29-50-230.eu-central-1.compute.amazonaws.com:3000/">our page</a> to start shopping!</p><div style="display: flex; margin-top: 20px;"><a href="http://ec2-52-29-50-230.eu-central-1.compute.amazonaws.com:3000/"><img src="https://i.imgur.com/pDebTe6.png" alt="Bloo's Shop"></a></div></div>`,
        };

        transporter.sendMail(mailOptions, function (err, info) {
          if (err)
            console.log(err);
          else {
            console.log(info);
          }
        });
      });
      return res.status(200).json({
        success: true,
        token,
      });
    }
  })(req, res, next);
});

router.post('/auth-validation', authValidationMiddleware, (req, res) => {
  return res.json({
    tokenExpired: false,
  });
});

router.post('/decode-credentials', authValidationMiddleware, (req, res) => {
  return res.json({
    id: req.body.userId,
    username: req.body.username,
    email: req.body.tokenEmail,
    isAdmin: req.body.isAdmin,
  });
});

module.exports = router;
