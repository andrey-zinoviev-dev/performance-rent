const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
  floor: {
    type: Number
  },
  type: {
    type: String,
  },
  price: {
    type: Number,
  },
  space: {
    type: Number,
  },
  additions: {
    type: Object,
  }
});

module.exports = mongoose.model('space', spaceSchema);