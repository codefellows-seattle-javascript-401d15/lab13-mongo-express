'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catItem = Schema({
  name: {type: String, required: true},
  mood: {type: String, required: true},
});

module.exports = mongoose.model('cat', catItem);
