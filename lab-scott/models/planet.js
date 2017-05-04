'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planetItem = Schema({
  name: {type: String, required: true},
  universe: {type: String, max: 25},
});

module.exports = mongoose.model('planet', planetItem);
