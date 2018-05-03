const Orders = require('mongoose').model('Orders');
const User = require('mongoose').model('User');
const Product = require('mongoose').model('Product');
const jwt = require('jsonwebtoken');
const dbConfig = require('../../db-config');
const express = require('express');
const nodemailer = require('nodemailer');
const React = require('react');

const router = new express.Router();

const RateLimit = require('express-rate-limit');

let createGroupLimiter = new RateLimit({
  windowMs: 10 * 60 * 1000, // max 10 orders per 10 minutes
  delayAfter: 3,
  delayMs: 3 * 1000,
  max: 10,
  message: 'Too many orders in a short period of time',
});

const addOrderFormValidation = require(
    '../middleware/orders-form-validation.js');

const authValidation = require(
    '../middleware/auth-validation.js',
);

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'valentinfiicode2018@gmail.com',
    pass: 'Fiicode@2018PleaseDoNotAbuse',
  },
});

router.post('/make-order', createGroupLimiter, addOrderFormValidation,
    (req, res) => {
      if (!req.body.success)
        return res.status(400).json({
          errorMessage: req.body.message,
          errors: req.body.errors,
          success: false,
        });

      if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];

        return jwt.verify(token, dbConfig.jwtSecret, (err, decoded) => {
          if (err || !decoded) {
            return res.status(401).json({
              tokenExpired: true,
            });
          }

          const query = {
            _id: decoded.id,
          };

          return User.findOne(query, (err, user) => {
            if (err || !user) {
              return res.status(401).end();
            } else {

              let totalCost = 0;

              for (let i = 0; i <
              JSON.parse(req.body.orderedProducts).length; i++) {
                let item = JSON.parse(req.body.orderedProducts)[i];
                if (item.product.salePrice)
                  totalCost += item.qty * item.product.salePrice;
                else
                  totalCost += item.qty * item.product.productPrice;
              }

              totalCost = Math.round(totalCost * 100) / 100;

              const orderData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: user.email,
                phoneNumber: req.body.phoneNumber,
                country: req.body.country,
                stateOrCounty: req.body.stateOrCounty,
                townOrCity: req.body.townOrCity,
                fullHomeAddress: req.body.fullHomeAddress,
                postcodeOrZIP: req.body.postcodeOrZIP,
                orderNotes: req.body.orderNotes,
                totalCost: totalCost,
                orderedProducts: JSON.parse(req.body.orderedProducts),
              };

              const newOrder = new Orders(orderData);
              newOrder.save((err, order) => {
                if (err ||
                    (err && err.name === 'MongoError' && err.code === 11000)) {
                  return res.status(400).json({
                    success: false,
                  });
                } else {

                  const mailOptions = {
                    from: 'Bloo\'s Shop',
                    to: user.email,
                    subject: 'Bloo\'s Shop - Order Confirmation',
                    html: `<div style="font-family: Roboto;"><h1>Hello ${req.body.firstName +
                    ' ' +
                    req.body.lastName},</h1><p>You have successfully placed an order on <a href="localhost">Bloo's Shop</a>.</p><p>Your order is being processed. You will receive a confirmation upon delivery by our courier.</p><p>To be able to view your order click <a href=${'localhost/order-details/' +
                    order._id}>here</a>.</p><div style="display: flex; margin-top: 20px;"><a href="localhost"><img src="https://i.imgur.com/pDebTe6.png" alt="Bloo's Shop"></a></div></div>`,
                  };

                  transporter.sendMail(mailOptions, function (err, info) {
                    if (err)
                      console.log(err);
                    else {
                      console.log(info);
                    }
                  });

                  return res.json({
                    success: true,
                    orderId: order._id,
                  });
                }
              });
            }
          });
        });
      } else {

        let totalCost = 0;

        for (let i = 0; i < JSON.parse(req.body.orderedProducts).length; i++) {
          let item = JSON.parse(req.body.orderedProducts)[i];
          if (item.product.salePrice)
            totalCost += item.qty * item.product.salePrice;
          else
            totalCost += item.qty * item.product.productPrice;
        }

        const orderData = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          country: req.body.country,
          stateOrCounty: req.body.stateOrCounty,
          townOrCity: req.body.townOrCity,
          postcodeOrZIP: req.body.postcodeOrZIP,
          fullHomeAddress: req.body.fullHomeAddress,
          orderNotes: req.body.orderNotes,
          totalCost: totalCost,
          orderedProducts: JSON.parse(req.body.orderedProducts),
        };

        const newOrder = new Orders(orderData);
        newOrder.save((err, order) => {
          if (err || (err && err.name === 'MongoError' && err.code === 11000)) {
            return res.status(400).json({
              success: false,
            });
          } else {

            const mailOptions = {
              from: 'Bloo\'s Shop',
              to: req.body.email,
              subject: 'Bloo\'s Shop - Order Confirmation',
              html: `<div style="font-family: Roboto;"><h1>Hello ${req.body.firstName +
              ' ' +
              req.body.lastName},</h1><p>You have successfully placed an order on <a href="localhost">Bloo's Shop</a>.</p><p>Your order is being processed. You will receive a confirmation upon delivery by our courier.</p><p>To be able to view your order click <a href=${'localhost/order-details/' +
              order._id}>here</a>.</p><div style="display: flex; margin-top: 20px;"><a href="localhost"><img src="https://i.imgur.com/pDebTe6.png" alt="Bloo's Shop"></a></div></div>`,
            };

            transporter.sendMail(mailOptions, function (err, info) {
              if (err)
                console.log(err);
              else {
                console.log(info);
              }
            });

            return res.json({
              success: true,
              orderId: order._id,
            });
          }
        });
      }
    });

router.post('/get-order-public', authValidation, (req, res) => {
  if (typeof req.body.orderId !== 'string') {
    return res.status(401).end();
  }

  if (req.body.tokenEmail !== req.body.reducerEmail &&
      req.body.isAdmin === false) {
    return res.status(401).end();
  }

  Orders.findOne({ _id: req.body.orderId }, (err, order) => {
    if (err) {
      return res.status(400).json({
        message: 'An error has occurred.',
      });
    } else if (!order) {
      return res.status(404).json({
        message: 'No records found.',
      });
    } else return res.json({
      order: order,
    });
  });
});

router.get('/get-user-orders', authValidation, (req, res) => {

  Orders.find({ email: req.body.tokenEmail }, (err, orders) => {
    if (err) {
      return res.status(400).json({
        message: 'Internal error',
      });
    }

    if (!orders) {
      return res.json({
        orders: [],
      });
    }

    return res.json({
      orders: orders,
    });
  }).sort({ createdAt: -1 });

});

router.get('/get-order-admin', authValidation, (req, res) => {

  if (req.body.isAdmin === false) {
    return res.status(401).end();
  }

  Orders.find({}, (err, orders) => {
    if (err) {
      return res.status(400).json({
        message: 'Internal error',
      });
    }

    if (orders.length === 0) {
      return res.json({
        orders: [],
      });
    }

    return res.json({
      orders: orders,
    });
  }).sort({ createdAt: -1 });
});

router.post('/complete-order', authValidation, (req, res) => {

  if (req.body.isAdmin === false) {
    return res.status(401).end();
  }

  Orders.updateOne({ _id: { $eq: req.body.orderId } }, {
    $set: {
      currentStatus: 'Delivered',
    },
  }, (err) => {
    if (err) {
      return res.status(400);
    }

    Orders.find({ _id: req.body.orderId }, (err, order) => {
      if (err) {
        return res.status(400).json({
          message: 'Internal error',
        });
      }

      if (order.length === 0) {
        return res.status(404).json({
          message: 'Order not found',
        });
      }

      const mailOptions = {
        from: 'Bloo\'s Shop',
        to: order[0].email,
        subject: 'Bloo\'s Shop - Order Delivered',
        html: `<div style="font-family: Roboto;"><h1>Hello ${order[0].firstName +
        ' ' +
        order[0].lastName},</h1><p>This is a confirmation that your order has been marked as completed.</p><p>If you consider this to be false, please do not hesitate to contact us.</p><p>To be able to view your order click <a href=${'localhost/order-details/' +
        order[0]._id}>here</a>.</p><div style="display: flex; margin-top: 20px;"><a href="localhost"><img src="https://i.imgur.com/pDebTe6.png" alt="Bloo's Shop"></a></div></div>`,
      };

      transporter.sendMail(mailOptions, function (err, info) {
        if (err)
          console.log(err);
        else {
          console.log(info);
        }
      });

      return res.json({
        success: true,
      });

    });
  });
});

router.post('/get-order-details-admin', authValidation, (req, res) => {

  if (req.body.isAdmin === false) {
    return res.status(401).end();
  }

  Orders.find({ _id: req.body.orderId }, (err, orders) => {
    if (err) {
      return res.status(400).json({
        message: 'Internal error',
      });
    }

    if (orders.length === 0) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    return res.json({
      order: orders[0],
    });
  });

});

module.exports = router;