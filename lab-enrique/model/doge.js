'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema; //optional alias for mongoose Schema

const dogeItem = Schema({
  name: {type: String, required: true},
  type: {type: String, max: 1048},
  color: {type: String}
})

module.exports = mongoose.model('doge', dogeItem)
