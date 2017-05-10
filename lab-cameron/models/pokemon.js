'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema; // an optional alias for "mongoose.Schema"

const pokemonSchema = Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
});

module.exports = mongoose.model('pokemon', pokemonSchema);
