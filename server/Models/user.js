const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    telephone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    address: {
      type: String,
      required: true
    },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Type',
      required: true
    }
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
