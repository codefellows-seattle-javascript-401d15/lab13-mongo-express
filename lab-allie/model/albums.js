'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const albumEntry = Schema({
  artist: {type: String, required: true},
  title: {type: String, required: true},
  year: {type: String, required: true},
  dateCreated: {type: Date, default: Date.now},
});

module.exports = mongoose.model('album', albumEntry);