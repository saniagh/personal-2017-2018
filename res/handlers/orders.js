const Orders = require('mongoose').model('Orders');
const express = require('express');

const router = new express.Router();

const addOrderFormValidation = require(
    '../middleware/orders-form-validation.js');

router.post('/make-order', addOrderFormValidation, (req, res) => {
  if (!req.body.success)
    return res.status(400).json({
      errorMessage: req.body.message,
      errors: req.body.errors,
      success: false,
    });

  const orderData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    country: req.body.country,
    stateOrCounty: req.body.stateOrCounty,
    townOrCity: req.body.townOrCity,
    postcodeOrZIP: req.body.postcodeOrZIP,
    orderNotes: req.body.orderNotes,
    orderedProducts: JSON.parse(req.body.orderedProducts),
  };

  const newOrder = new Orders(orderData);
  newOrder.save((err, order) => {
    if (err || (err && err.name === 'MongoError' && err.code === 11000)) {
      return res.status(400).json({
        success: false,
      });
    } else return res.json({
      success: true,
      orderId: order._id,
    });
  });
});

router.post('/get-order-public', (req, res) => {
  if (typeof req.body.orderId !== 'string') {
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
    } else if (order.currentStatus !== 'ORDERED') {
      return res.status(401).end();
    } else return res.json({
      order: order,
    });
  });
});

module.exports = router;