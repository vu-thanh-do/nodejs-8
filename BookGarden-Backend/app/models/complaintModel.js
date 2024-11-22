
const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const complaintModel = mongoose.model('complaintModel', complaintSchema);

module.exports = complaintModel;
