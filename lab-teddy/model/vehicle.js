'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicItem = Schema({
  name: {type: String, require: true},
  detail: {type: String, max: 1048, require: true},
  date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('vehicle', vehicItem);
