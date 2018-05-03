const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  country: {
    type: String,
  },
  stateOrCounty: {
    type: String,
  },
  townOrCity: {
    type: String,
  },
  postcodeOrZIP: {
    type: String,
  },
  fullHomeAddress: {
    type: String,
  },
  orderNotes: {
    type: String,
  },
  orderedProducts: {
    type: Array,
  },
  currentStatus: {
    type: String,
    default: 'ORDERED',
  },
  estimatedArrival: {
    type: String,
  },
  orderedById: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  totalCost: {
    type: String,
  },
});

module.exports = mongoose.model('Orders', OrdersSchema);
