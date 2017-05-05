'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicItem = Schema({
  model: {type: String, required: true},
  make: {type: String, required: true},
  detail: {type: String, max: 1048, required: true},
  date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('vehicle', vehicItem);
