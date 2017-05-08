'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const noteSchema = Schema({
  owner: {type: String, required: true},
  shinigami: {type: String, required: true},
  deathCount: {type: Number, required: true},
});

module.exports = mongoose.model('note', noteSchema);
