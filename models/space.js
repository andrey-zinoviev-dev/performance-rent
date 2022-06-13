const mongoose = require('mongoose');
const option = require('./option');

const spaceSchema = new mongoose.Schema({
  floor: {
    type: Number
  },
  type: {
    type: String,
  },
  description: {
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
  },
  occupied: {
    type: Array,
    // default: [],
  },
  options:
    {
      type: mongoose.Schema.Types.ObjectId, ref: 'option',
    }
});

module.exports = mongoose.model('space', spaceSchema);
