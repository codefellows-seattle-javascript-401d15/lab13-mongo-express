'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema ({
  title: {type: String, required: true},
  genre: { type: String},
});

module.exports = mongoose.model('game', gameSchema);
