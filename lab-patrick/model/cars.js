'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carItem = new Schema({
  name: {type:String, required:true},
  model: {type: String, required: true},
  horsepower:{type: Number, required: true},
});

module.exports = mongoose.model('car', carItem);
