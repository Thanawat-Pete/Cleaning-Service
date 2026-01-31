const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const typeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = model('Type', typeSchema);
