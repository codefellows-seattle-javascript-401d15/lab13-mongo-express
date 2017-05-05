'use strict';

// const debug = require('debug')('http:candy');
// const uuid = require('uuid/v4');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// module.exports = function(name, type, texture) {
//   if(!name || !type) throw new Error('Invalid arguments');
//   this.name = name;
//   this.type = type;
//   this.texture = texture;
//   this.id = uuid();
// };

const candyItem = Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  texture: {type: String, required: true},
});

module.exports = mongoose.model('note', candyItem);
