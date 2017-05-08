'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carItem = Schema({
  make: {type: String, max: 200, required: true},
  model: {type: String, max: 200, required: true},
});

module.exports = mongoose.model('car', carItem);
