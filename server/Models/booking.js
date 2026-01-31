const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const bookingSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    appointmentDateTime: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending'
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model('Booking', bookingSchema);