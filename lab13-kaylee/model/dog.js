'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dogInstance = Schema({
  name: {type: String, required: true},
  breed: {type: String, required: true},
});

module.exports = mongoose.model('dog', dogInstance);
