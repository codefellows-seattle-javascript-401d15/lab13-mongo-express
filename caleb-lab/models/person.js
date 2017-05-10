'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personItem = Schema({ //a schema instance takes an object literal
  name: {type: String, required: true},
  details: {type: String, max: 1048, required: true},
  date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('person', personItem);
//with mongoose.model, we're defining a new model inside our instance of mongo
