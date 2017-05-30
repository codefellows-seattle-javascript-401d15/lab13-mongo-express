'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lure = Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  targets: {type: String, required: true},
  water: {type: String, default: 'fresh', required: true},
});

module.exports = mongoose.model('lure', lure);
