const mongoose = require('mongoose');

const optionsSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  options: {
    type: Array,
  }
});

module.exports = mongoose.model('option', optionsSchema);