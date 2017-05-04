'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Seahawk = Schema({
  name: {type: 'string', uppercase: true},
  pos: {type: 'string', uppercase: true},
  round: 'number',
});

module.exports = mongoose.model('hawk', Seahawk);
