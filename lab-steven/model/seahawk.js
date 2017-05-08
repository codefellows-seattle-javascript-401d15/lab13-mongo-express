'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Seahawk = Schema({
  name: {type: 'string'},
  pos: {type: 'string'},
  round: {type: 'number'},
});

module.exports = mongoose.model('hawk', Seahawk);
