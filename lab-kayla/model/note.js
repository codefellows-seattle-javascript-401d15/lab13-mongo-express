'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteItem = Schema({
  name: {type: String, required: true},
  details: {type: String, max:1040, required: true},
  date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('note', noteItem);
